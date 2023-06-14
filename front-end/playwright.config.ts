import { PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'only-on-failure'}]],//'always'
  use: {
    headless: false,
    viewport: { width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: 'on',//'on-first-retry',
    screenshot: 'on',//'only-on-failure',
    launchOptions: {
      slowMo: 400,
    },
  },
};

export default config;
