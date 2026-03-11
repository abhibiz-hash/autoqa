import { Request, Response } from 'express';
import { executeTestScript } from '../services/runner.service';

export const runTest = async (req: Request, res: Response): Promise<any> => {
  const { filePath } = req.body;
  if (!filePath) {
    return res
      .status(400)
      .json({ error: "A 'filePath' is required in the request body." });
  }

  try {
    console.log(`▶️ Controller received request to execute: ${filePath}`);

    const executionResult = await executeTestScript(filePath);
    res.status(200).json({ 
      success: true, 
      message: "Test execution completed.",
      data: executionResult // holds { terminalLogs, report }
    });
  } catch (error) {
    console.error('Orchestration error during execution:', error);
    res.status(500).json({ error: 'Failed to execute the test script.' });
  }
};
