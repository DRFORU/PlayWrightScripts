import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL041 - Verify behavior when clicking the Backward button on the Verify OTP page; it should redirect to the login page.', 
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

  await test.step('Verify OTP screen', async () => {
    await expect(page.getByRole('button', { name: 'Verify OTP' })).toBeVisible();
  });

  await page.waitForTimeout(2000);
  await page.goBack();
  
  await test.step('Verify Login screen', async () => {
    await expect(page.getByRole('button', { name: 'GET OTP' })).toBeVisible();
  });
});