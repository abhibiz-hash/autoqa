import { Request, Response } from 'express';
import { extractSemanticDOM } from '../services/extractor.service';

export const analyzeUrl = async (req: Request, res: Response): Promise<any> => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ error: 'A valid URL is required in the request body.' });
  }

  try {
    console.log(`📥 Controller received request to analyze: ${url}`);

    const data = await extractSemanticDOM(url);

    res.json({ success: true, data });
  } catch (error) {
    console.error('❌ Extraction error:', error);
    res.status(500).json({ error: 'Failed to analyze the requested URL.' });
  }
};
