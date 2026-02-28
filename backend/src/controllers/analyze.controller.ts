import { Request, Response } from 'express';
import { extractSemanticDOM } from '../services/extractor.service';
import { generateTestScript } from "../services/ai.service";

export const analyzeUrl = async (req: Request, res: Response): Promise<any> => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ error: 'A valid URL is required in the request body.' });
  }

  try {
    console.log(`📥 Controller received request to analyze: ${url}`);

    //extracting semantic DOM
    const domData = await extractSemanticDOM(url);

    const payloadForAI = {
      url: url,
      title: domData.title,
      interactiveElements: domData.interactiveElements
    }

    //forwarding DOM to AI Agent
    const aiResult = await generateTestScript(payloadForAI);

    res.status(200).json({
      success: true,
      data: {
        url: url,
        pageType: aiResult.page_type,
        testPlan: aiResult.test_plan,
        code: aiResult.code
      }
    });
  } catch (error) {
    console.error("❌ Orchestration error:", error);
    res.status(500).json({ error: "Failed to analyze URL and generate test script." });
  }
};
