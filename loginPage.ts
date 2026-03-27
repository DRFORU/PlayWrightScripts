import { Page } from '@playwright/test';

export class LoginPage {

  constructor(private page: Page) {}
//Redirects To Our React Login Page (Beta)
  async navigate() 
  {
    await this.page.goto('https://testbot.ideazmeet.com/login');
  }
//Enter Email or Phonenumber
  async enterEmailorMobile(value: string) 
  {
    await this.page.locator('input.form-control[type="text"]').fill(value);
  }

//Enter Email or Phonenumber (You want to Clear existing value & Update new value in email)
  async enterEmailorMobileFirst(value: string) 
  {
    await this.page.locator('input.form-control[type="text"]').first().fill(value);
  }

//Click on 'GET OTP' button
  async clickGetOTP() 
  {
    await this.page.getByRole('button', { name: 'Get OTP' }).click();
  }
//Click on 'Verify OTP' button
  async clickVerifyOTP() 
  {
    await this.page.getByRole('button', { name: 'Verify OTP' }).click();
  }
// OTP Logic to Enter OTP
  async enterOTP(otp: string) 
  {
    const inputs = this.page.locator('.otp-input');
    const count = await inputs.count();

    for (let i = 0; i < Math.min(otp.length, count); i++) 
     {
       await inputs.nth(i).fill(otp[i]);
     }
  }

// OTP Logic to clear existing otp and Enter new OTP
  async clearAndEnterOTP(otp: string) 
  {
    const inputs = this.page.locator('.otp-input');
    const count = await inputs.count();

    // Clear all boxes first
     for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill('');
    }

    for (let i = 0; i < Math.min(otp.length, count); i++) 
     {
       await inputs.nth(i).fill(otp[i]);
     }
  }

//Click on 'Resend OTP' button
  async clickResendOTP() 
  {
    await this.page.getByRole('button', { name: 'Resend OTP' }).click();
  }  

//Click on profile button
  async clickProfileIcon() 
  {
    await this.page.locator('img[alt="profile pic"][width="95"]').click();
  }

//Click on 'Signout' button
  async clickSignoutOption() 
  {
    await this.page.locator('.pro-menu a[onclick="logout();"]').click();
  }

//Click 'Signup' Link on login page
  async clickOnSignupLink()
  {
    await this.page.locator('.text-primary.text-decoration-none').click();
  }
}