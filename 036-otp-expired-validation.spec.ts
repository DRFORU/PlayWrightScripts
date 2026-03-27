import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL036 - Verify login behavior when clicking Verify OTP button with an expired OTP; it should display validation toast message.', 
    async ({ page }, testInfo) => {

  test.setTimeout(150000); //we have to add 'setTimeout', you wnat stop the execution more than 30sec
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

  await page.waitForTimeout(122000);

// Enter logic
  await test.step('Enter OTP', async () => {
  await login.enterOTP('1234');
  });

  await page.waitForTimeout(2000);

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert');
        const actualText = await locator.textContent();
  
        const expectedText = messages.otpEnteredafterExpired; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);  
      });
})
