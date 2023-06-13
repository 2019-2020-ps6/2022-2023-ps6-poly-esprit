import { PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', { open: 'always'}]],
  use: {
    headless: false,

    viewport: { width: 1280, height: 720},
    ignoreHTTPSErrors: true,
    video: 'on',//'on-first-retry',
    screenshot: 'on',//'only-on-failure',

    launchOptions: {
      slowMo: 1000,
    }
  },
};

export default config;
