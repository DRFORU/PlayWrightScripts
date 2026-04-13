import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL028 - Verify login without entering an email; it should display validation message.', 
    async ({ page }, testInfo) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobile(testData.emptyEmail);//✅ use from testData
  });

  await test.step('Click Get OTP', async () => {
    await login.clickGetOTP();
  });

  await test.step('Validate error message', async () => {
  
        const locator = page.locator('.text-danger.f-12.fw-medium'); // After Dev team Fix, Verify Locator & Update.
        const actualText = await locator.textContent();
  
        const expectedText = messages.withoutEmailValue; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });
});