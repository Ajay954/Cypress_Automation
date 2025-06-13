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
        specPattern: 'cypress/e2e/spec.cy.js',
        // screenshotOnRunFailure: true,
        video: true,
        // screenshotsFolder: 'cypress/screenshots',
        videoCompression: 32,
        // viewportWidth: 1000,
        // viewportHeight: 540,
    },

    env: {
        USERNAME: 'Admin',
        PASSWORD: 'admin123',
    },
});
