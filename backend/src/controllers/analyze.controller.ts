import { Request, Response } from 'express';
import { extractSemanticDOM } from '../services/extractor.service';
import { generateTestScript } from '../services/ai.service';
import { saveTestScript } from '../services/runner.service';

export const analyzeUrl = async (req: Request, res: Response): Promise<any> => {
  const { url, intent } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ error: 'A valid URL is required in the request body.' });
  }

  try {
    console.log(`📥 Controller received request to analyze: ${url}`);

    if (intent) console.log(`🎯 User Intent: "${intent}"`);

    //extracting semantic DOM
    const domData = await extractSemanticDOM(url);

    const payloadForAI = {
      url: url,
      title: domData.title,
      interactiveElements: domData.interactiveElements,
      prompt: intent
    };

    //forwarding DOM to AI Agent
    const aiResult = await generateTestScript(payloadForAI);

    //Save the generated code to the file system
    const savedFilePath = await saveTestScript(url, aiResult.code);

    res.status(200).json({
      success: true,
      data: {
        url: url,
        intent: intent || "Default Happy Path",
        pageType: aiResult.page_type,
        testPlan: aiResult.test_plan,
        code: aiResult.code,
        filePath: savedFilePath,
      },
    });
  } catch (error) {
    console.error('❌ Orchestration error:', error);
    res
      .status(500)
      .json({ error: 'Failed to analyze URL and generate test script.' });
  }
};
