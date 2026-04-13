import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TC029 - Verify login with entering an unregistered email; it should display validation toast message.', 
    async ({ page }, testInfo) => {

  const login = new LoginPage(page);

  await test.step('Navigate to login page', async () => {
    await login.navigate();
  });

  await test.step('Enter EmailorMobile', async () => {
    await login.enterEmailorMobile(testData.unregisteredEmail);//✅ use from testData
  });

  await test.step('Click Get OTP', async () => {
    await login.clickGetOTP();
  });

  await test.step('Validate error message', async () => {
  
        const locator = page.getByRole('alert'); // After Dev team Fix, Verify Locator & Update.
        const actualText = await locator.textContent();
  
        const expectedText = messages.invalidEmailwithUnregistered; //✅ use from testData
  
        // Attach to report
        await testInfo.attach('Validation Message', {
          body: `Expected: ${expectedText}\nActual: ${actualText}`,
          contentType: 'text/plain'
        });
  
        // Assertion
        await expect(locator).toHaveText(expectedText);
  
      });
})
