import fs from 'fs/promises';
import path from 'path';
import { spawn } from "child_process";

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

export function executeTestScript(filePath: string): Promise<string>{
  return new Promise((resolve, reject) =>{
    console.log(`🚀 Spawning child process to execute: ${filePath}`);

    //Spawning a background terminal to run the Playwright Script
    const child = spawn("npx", ["playwright", "test", filePath], {
      shell:true,
    });

    let outputLog = "";

    //to listen to standard output (the normal playwright test logs)
    child.stdout.on("data", (data) => {
      const message = data.toString();
      console.log(`[Playwright]: ${message.trim()}`);
      outputLog += message;
    });

    //listen to error output (if the test fails or crashes)
    child.stderr.on("data", (data) => {
      const errorMessage = data.toString();
      console.error(`[Playwright Error]: ${errorMessage.trim()}`);
      outputLog += errorMessage;
    });

    // Resolving/rejecting the promise when the process completely finishes
    child.on("close", (code) => {
      if(code===0){
        console.log(`✅ Test executed successfully!`);
        resolve(outputLog);
      } else{
        console.log(`❌ Test failed with exit code: ${code}`);
        //still resolve because a failed test is still a successful execution of our playwright script
        resolve(outputLog);
      }
    });
  });
}