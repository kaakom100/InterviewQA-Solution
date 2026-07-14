import { Page } from 'playwright';

/** locator ทั้งหมดของหน้า Login - Shop (Step 1) */
export const LoginLocators = (page: Page) => ({
  email: page.locator('#email'),
  password: page.locator('#password'),
  submitButton: page.locator('#submitLoginBtn'),
  // หน้านี้มี id="message" ซ้ำ 2 อัน -> เจาะจงตัว alert-danger ที่แสดง error login
  errorMessage: page.locator('#message.alert-danger'),
});
