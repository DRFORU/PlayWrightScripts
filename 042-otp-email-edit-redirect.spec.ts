import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL042 - Verify behavior when changing the email value on the Verify OTP page; it should automatically redirect to the login page.', 
  async ({ page }) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobile(testData.validGmail);//✅ use from testData
  });

  await test.step('Click Get OTP', async () => {
    await login.clickGetOTP();
  });
  
  await page.waitForTimeout(2000);

  await test.step('Verify OTP screen', async () => {
    await expect(page.getByRole('button', { name: 'Verify OTP' })).toBeVisible();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobileFirst(testData.validServerEmail);//✅ use from testData
  });
  
  await test.step('Verify Login screen', async () => {
    await expect(page.getByRole('button', { name: 'GET OTP' })).toBeVisible();
  });
});