import { PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'noly-on-failure'}]],//'only-on-failure'}]],//'always'
  use: {
    headless: true,
    viewport: { width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: 'on',//'on-first-retry',
    screenshot: 'on',//'only-on-failure',
    launchOptions: {
      slowMo: 0,
    },
  },
};

export default config;
