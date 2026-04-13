import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL030 - Verify entering a valid email and clicking the Get OTP button; it should display success toast message.', 
    async ({ page }, testInfo) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobile(testData.validServerEmail);//✅ use from testData
  });

  await test.step('Click Get OTP', async () => {
    await login.clickGetOTP();
  });

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert'); // After Dev team Fix, Verify Locator & Update.
        const actualText = await locator.textContent();
  
        const expectedText = messages.receivedOtp; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });
})
