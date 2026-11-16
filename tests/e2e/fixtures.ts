import { test as base, expect, type Page } from '@playwright/test';

const expectedDocumentErrors = new WeakMap<Page, Map<string, number>>();

export const test = base.extend<{ browserIssues: string[] }>({
  browserIssues: [
    async ({ page, context, baseURL }, use, testInfo) => {
      const issues: string[] = [];
      page.on('pageerror', (error) => issues.push(error.message));
      page.on('console', (message) => {
        if (message.type() !== 'error') return;
        const expectedStatus = expectedDocumentErrors
          .get(page)
          ?.get(message.location().url);
        // A deliberate 404 navigation logs a browser-generated resource error.
        // Only allow the exact document URL/status requested by visit().
        if (
          expectedStatus &&
          message.text() ===
            `Failed to load resource: the server responded with a status of ${expectedStatus} (Not Found)`
        )
          return;
        issues.push(message.text());
      });
      expectedDocumentErrors.set(page, new Map());

      // Test our UI, not YouTube/Instagram availability or Vercel telemetry.
      // Context routing also covers the first request in a newly opened tab.
      await context.route('**/*', async (route) => {
        const url = new URL(route.request().url());
        if (
          url.origin !== new URL(baseURL!).origin ||
          url.pathname.startsWith('/_vercel/')
        ) {
          await route.fulfill({
            status: 200,
            contentType:
              route.request().resourceType() === 'document'
                ? 'text/html'
                : 'text/plain',
            body: '',
          });
        } else {
          await route.continue();
        }
      });

      await use(issues);

      if (!page.isClosed()) {
        const screenshot = testInfo.outputPath('page.png');
        await page.screenshot({
          path: screenshot,
          fullPage: true,
          animations: 'disabled',
        });
        await testInfo.attach('page', {
          path: screenshot,
          contentType: 'image/png',
        });
      }
      expect(issues, 'Browser console/runtime errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export async function visit(page: Page, path: string, status = 200) {
  if (status === 404) {
    const baseURL = test.info().project.use.baseURL;
    expectedDocumentErrors.get(page)?.set(new URL(path, baseURL).href, status);
  }
  const response = await page.goto(path);
  expect(response?.status()).toBe(status);
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
}

export async function expectNoHorizontalOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
    'The page should fit the viewport without horizontal scrolling',
  ).toBe(true);
}
