import { defineConfig, devices } from '@playwright/test';

if (!process.versions.bun) {
  throw new Error('Run Playwright with Bun: bun run test:e2e');
}

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Use the running Bun binary, not a PATH shim or Astro's Node shebang.
    command: `${JSON.stringify(process.execPath)} --bun astro dev --host 127.0.0.1 --port 4321`,
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
