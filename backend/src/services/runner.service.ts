import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

export async function saveTestScript(
  url: string,
  code: string
): Promise<string> {
  console.log(`💾 Preparing to save generated test script...`);

  //Create a safe filename by stripping "https://" and replacing special characters
  const cleanUrl = url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '_');

  const fileName = `ai_${cleanUrl}_${Date.now()}.spec.ts`;

  //Define the exact folder path (we will store them in backend/tests/generated) and file path
  const dirPath = path.join(__dirname, '../../tests/generated');
  const filePath = path.join(dirPath, fileName);

  try {
    await fs.mkdir(dirPath, { recursive: true });

    await fs.writeFile(filePath, code, 'utf-8');

    console.log(`✅ Test script saved successfully at: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Failed to save test script to file system:', error);
    throw error;
  }
}

export function executeTestScript(filePath: string): Promise<{ terminalLogs: string; report: any }> {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Spawning child process to execute: ${filePath}`);

    const reportPath = path.join(__dirname, '../../tests/generated/test-report.json');

    //Spawning a background terminal to run the Playwright Script
    const child = spawn("npx", ["playwright", "test", filePath, "--reporter=json"], {
      shell: true,
      env: { 
        ...process.env, 
        PLAYWRIGHT_JSON_OUTPUT_NAME: reportPath // Tells Playwright where to save the JSON
      }
    });

    let terminalLogs = "";

    //to listen to standard output (the normal playwright test logs)
    child.stdout.on("data", (data) => {
      const message = data.toString();
      console.log(`[Playwright]: ${message.trim()}`);
      terminalLogs += message;
    });

    //listen to error output (if the test fails or crashes)
    child.stderr.on("data", (data) => {
      const errorMessage = data.toString();
      console.error(`[Playwright Error]: ${errorMessage.trim()}`);
      terminalLogs += errorMessage;
    });

    // Resolving/rejecting the promise when the process completely finishes
    child.on("close", async (code) => {
      console.log(`🏁 Process exited with code: ${code}`);
      
      try {
        // Read the JSON report file that Playwright just created
        const reportContent = await fs.readFile(reportPath, 'utf-8');
        const jsonReport = JSON.parse(reportContent);
        
        // Resolve with BOTH the raw logs (for debugging) and the structured JSON (for the UI)
        resolve({
          terminalLogs: terminalLogs,
          report: jsonReport
        });
      } catch (error) {
        console.error("❌ Failed to read or parse Playwright JSON report:", error);
        // Fallback just in case the report generation fails
        resolve({ terminalLogs: terminalLogs, report: null });
      }
    });
  });
}
