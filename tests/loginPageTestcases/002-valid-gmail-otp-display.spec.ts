import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData } from '../../../utils/testData';

test('#TCL002 - Verify login with a valid gmail; it should display OTP input boxes and the "Verify OTP" button.', 
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
});