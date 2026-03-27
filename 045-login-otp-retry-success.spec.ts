import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL046 - Verify the login behavior when a user enters an invalid OTP three times and then enters a valid OTP on the fourth attempt. It should redirects to the Feed page', 
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

  await page.waitForTimeout(8000);
// Enter OTP on First Time
  await test.step('Enter OTP on first time', async () => {
  await login.enterOTP('1235');
  });

  await page.waitForTimeout(2000);

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert');
        const actualText = await locator.textContent();
  
        const expectedText = messages.invalidOtpValidation; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });

      // Enter OTP on Second Time
  await test.step('Enter OTP on second time', async () => {
  await login.clearAndEnterOTP('1236');
  });

  await page.waitForTimeout(2000);

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert');
        const actualText = await locator.textContent();
  
        const expectedText = messages.invalidOtpValidation; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });

      // Enter OTP on Third Time
  await test.step('Enter OTP on third time', async () => {
  await login.clearAndEnterOTP('1237');
  });

  await page.waitForTimeout(2000);

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert');
        const actualText = await locator.textContent();
  
        const expectedText = messages.invalidOtpValidation; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });

      // Enter OTP on fourth Time
  await test.step('Enter OTP on fourth time', async () => {
  await login.clearAndEnterOTP('1234');
  });

  await page.waitForTimeout(8000);
  await test.step('Verify Upload Product Button', async () => 
    {
      await expect(page.locator('#feeduploadproducts')).toBeVisible();
    });
})
