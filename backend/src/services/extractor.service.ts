import { chromium } from 'playwright';

export async function extractSemanticDOM(url: string) {
  console.log(`🌐 Launching browser to analyze: ${url}`);
  const browser = await chromium.launch({ headless: true });

  //Context to spoof a real desktop browser
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
  });

  // Create the page from the spoofed Context, not the browser
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  console.log(`🔍 Extracting semantic elements from: ${url}...`);

  const domData = await page.evaluate(() => {
    // Select all potentially interactive elements
    const elements = document.querySelectorAll(
      'button, a, input, select, textarea'
    );
    const extracted: any[] = [];

    elements.forEach((el) => {
      //Filter out invisible elements
      const style = window.getComputedStyle(el);
      if (
        style.display == 'none' ||
        style.visibility == 'hidden' ||
        style.opacity == '0'
      ) {
        return;
      }

      // Safely extract standard HTML attributes
      const tagName = el.tagName.toLowerCase();
      const text =
        (el as HTMLElement).innerText?.trim() ||
        (el as HTMLInputElement).value?.trim() ||
        '';
      const ariaLabel = el.getAttribute('aria-label') || '';
      const type = el.getAttribute('type') || '';
      const placeholder = el.getAttribute('placeholder') || '';
      const name = el.getAttribute('name') || '';
      const id = el.getAttribute('id') || '';

      if (text || ariaLabel || placeholder || name || id) {
        extracted.push({
          tag: tagName,
          ...(type && { type }),
          ...(text && { text }),
          ...(ariaLabel && { ariaLabel }),
          ...(placeholder && { placeholder }),
          ...(name && { name }),
          ...(id && { id }),
        });
      }
    });
    return {
      title: document.title,
      interactiveElements: extracted,
    };
  });
  await browser.close();
  return domData;
}
