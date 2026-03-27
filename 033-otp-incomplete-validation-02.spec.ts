import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL033 - Verify login behavior when clicking Verify OTP button after entering only 2 digits; it should display validation toast message.', 
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

  await page.waitForTimeout(8000);

  // Enter OTP
  await test.step('Enter OTP', async () => {
  await login.enterOTP('12');
  });

   await test.step('Click Verify OTP', async () => {
    await login.clickVerifyOTP();
  });

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert');
        const actualText = await locator.textContent();
  
        const expectedText = messages.otpValidationWithoutEnterOtpAndIncompleteOtp; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });
})
