import { MainLayout } from "./layouts/MainLayout";
import { CommandCenter } from "./features/test-engine/components/CommandCenter";
import { ThoughtStream } from "./features/test-engine/components/ThoughtStream";
import { CodeCanvas } from "./features/test-engine/components/CodeCanvas";
import { TestReport, type TestResultData } from "./features/test-engine/components/TestReport";

const DUMMY_CODE = `import { test, expect } from '@playwright/test';

test('Test the Login functionality', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/login');
  await page.fill('input[name="acct"]', 'testuser123');
  await page.fill('input[name="pw"]', 'SecurePass!@#');
  await page.click('input[value="login"]');
  await expect(page.locator('body')).toContainText('Bad login');
});`;

// 2. Add Dummy Report Data
const DUMMY_REPORT: TestResultData = {
  success: true,
  duration: "3.6s",
  assertions: [
    { title: "Navigated to target URL (news.ycombinator.com/login)", status: "passed" },
    { title: "Located and filled input[name=\"acct\"] with 'testuser123'", status: "passed" },
    { title: "Located and filled input[name=\"pw\"] with credentials", status: "passed" },
    { title: "Clicked login button input[value=\"login\"]", status: "passed" },
    { title: "Verified 'Bad login' text is visible in the DOM", status: "passed" }
  ]
};

function App() {
  return (
    <MainLayout>
      <header className="text-center shrink-0 mb-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Neural Intelligence Online</span>
        </div>
        <h1 className="text-3xl font-light tracking-tight text-white mb-1">
          Auto<span className="font-bold text-core-amber">QA</span>
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col gap-6 pb-6 pr-2">
        
        <ThoughtStream currentStep={4} />

        <div className="w-full max-w-4xl mx-auto text-slate-300 font-light px-2 shrink-0">
          I have analyzed the DOM and synthesized the following Playwright test script based on your intent:
        </div>

        <CodeCanvas code={DUMMY_CODE} />

        <TestReport report={DUMMY_REPORT} />

      </div>

      <div className="shrink-0 pt-4">
        <CommandCenter />
      </div>
    </MainLayout>
  );
}

export default App;