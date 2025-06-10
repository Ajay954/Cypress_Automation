const { defineConfig } = require("cypress");

module.exports = defineConfig({
    defaultCommandTimeout:12000,
    // numTestsKeptInMemory: 1,
    retries: {
 
        runMode: 0,
        openMode: 0
    },
    
    e2e: {
        baseUrl: 'https://opensource-demo.orangehrmlive.com/',
        specPattern: 'cypress/e2e',
        // screenshotOnRunFailure: true,
        video: false,
        // screenshotsFolder: 'cypress/screenshots',
        // videoCompression: false,
        // viewportWidth: 1000,
        // viewportHeight: 540,
        // experimentalModifyObstructiveThirdPartyCode: true,
        // experimentalRunAllSpecs: true,
        // setupNodeEvents(on, config) {
        //     allureWriter(on, config);
        //     return config;
        // }
    },

    env: {
        USERNAME: 'Admin',
        PASSWORD: 'admin123',
    },
});
