import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/loginPage';
import { testData, messages } from '../../../utils/testData';

test('#TCL040 - Verify logout functionality after login.', 
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

  await page.waitForTimeout(2000);
// Enter OTP
  await test.step('Enter OTP', async () => {
  await login.enterOTP('1234');
  });

  await page.waitForTimeout(8000);
//Click on pofile icon
   await test.step('Click on profile icon', async () => {
    await login.clickProfileIcon();
  });

  await page.waitForTimeout(2000);
//Click on signout option
   await test.step('Click on signout option', async () => {
    await login.clickSignoutOption();
  });

  await page.waitForTimeout(3000);
//Check Page URL
  await test.step('Verify redirected to login page', async () => {
  const actualUrl = page.url();
  const expectedUrl = messages.containLoginUrl;
// Attach to report
    await testInfo.attach('Expected URL', {
        body: `Expected: ${expectedUrl}\nActual: ${actualUrl}`,
        contentType: 'text/plain'
    });
// Assertion
    expect(actualUrl).toContain(expectedUrl);
});

})
