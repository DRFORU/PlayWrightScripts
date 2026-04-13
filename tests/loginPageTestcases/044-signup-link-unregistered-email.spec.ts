import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL045 - Verify the signup link behavior on the login page after entering an unregistered email. It should redirects to the signup page', 
    async ({ page }, testInfo) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobile(testData.unregisteredEmail);//✅ use from testData
  });

  await test.step('Click Get OTP', async () => {
    await login.clickGetOTP();
  });

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert'); // After Dev team Fix, Verify Locator & Update.
        const actualText = await locator.textContent();
  
        const expectedText = messages.invalidEmailwithUnregistered; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });
    
await page.waitForTimeout(4000);
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