import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL043, #TCL044 - Verify that clicking on the Sign Up link redirects to the Sign Up page.', 
    async ({ page }, testInfo) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

await page.waitForTimeout(2000);
//Click on signout option
   await test.step('Click on signup link', async () => {
    await login.clickOnSignupLink();
  });

  await page.waitForTimeout(3000);
//Check Page URL
  await test.step('Verify redirected to signup page', async () => {
  const actualUrl = page.url();
  const expectedUrl = messages.containSignupUrl;
// Attach to report
    await testInfo.attach('Expected URL', {
        body: `Expected: ${expectedUrl}\nActual: ${actualUrl}`,
        contentType: 'text/plain'
    });
// Assertion
    expect(actualUrl).toContain(expectedUrl);
});
    
})