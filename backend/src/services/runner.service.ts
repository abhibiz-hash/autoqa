import fs from 'fs/promises';
import path from 'path';

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
