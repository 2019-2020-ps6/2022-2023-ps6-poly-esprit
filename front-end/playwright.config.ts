import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'only-on-failure' }]],//'only-on-failure'}]],//'always'
  use: {
    headless: true,
    viewport: { width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: 'on',//'on-first-retry',
    screenshot: 'on',//'only-on-failure',
    launchOptions: {
      slowMo: 100,
    },
  },

  expect: { //ne pas toucher ça
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
};

export default config;
