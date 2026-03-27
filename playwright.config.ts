import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 25000,

  reporter: [['html', { open: 'always' }]],

  use: {
    baseURL: 'http://192.168.100.183:9323', // 👈 ADD THIS (your WiFi IP)
    headless: false,

    screenshot: 'on',   // takes screenshot
    video: 'on',        // records video
    trace: 'on',        // shows steps (very useful)

  },

  projects: [

    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },

    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'Edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
      },
    }

  ]

});