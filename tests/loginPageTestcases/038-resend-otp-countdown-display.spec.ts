import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL038 - Verify behavior after clicking the Resend OTP button; it should display the text "Resend OTP in...".', 
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

  await test.step('Click Resend OTP', async () => {
    await login.clickResendOTP();
  });

  await page.waitForTimeout(2000);

  await test.step('Confirm Expected Text is displayed', async () => 
  {
    const locator = page.locator('.text-center.fw-medium.f-14.mt-3');

    const actualText = await locator.textContent();
    const expectedText = messages.checkResendText;

    await testInfo.attach('Confirm Text', 
     {
       body: `Expected: ${expectedText}\nActual: ${actualText}`,
       contentType: 'text/plain'
     });

      // ✅ better assertion
    await expect(locator).toContainText(expectedText);
   });
})
