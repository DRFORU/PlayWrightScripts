import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL037 - Verify that the Resend OTP button option is enabled after 2 minutes; it should display the "Resend OTP" button.', 
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

  await test.step('Verify Resend OTP enable', async () => {
    await expect(page.getByRole('button', { name: 'Resend OTP' })).toBeVisible();
  });
})
