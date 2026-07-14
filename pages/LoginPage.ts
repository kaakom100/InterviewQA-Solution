import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginLocators } from '../resources/config/LoginLocators';
import { config } from '../support/config';

/**
 * ═══ LoginPage — Keyword List (Step 1: Login) ═══
 *   Navigate : goto()
 *   Action   : login(email, password)
 *   Validate : expectLoginError(text)
 */
export class LoginPage {
  private page: Page;
  private locators: ReturnType<typeof LoginLocators>;

  constructor(page: Page) {
    this.page = page;
    this.locators = LoginLocators(page);
  }

  /**
   * เปิดหน้า Login - Shop
   *
   * @example
   * await loginPage.goto();
   */
  async goto(): Promise<void> {
    await this.page.goto(config.baseURL, { waitUntil: 'domcontentloaded' });
  }

  /**
   * login เข้าระบบ — กรอก email + password แล้วกดปุ่ม Submit
   *
   * @param email    - อีเมลที่ใช้ login (เช่น admin@admin.com)
   * @param password - รหัสผ่าน (เช่น admin123)
   *
   * @example
   * await loginPage.login('admin@admin.com', 'admin123');
   *
   * @remarks ถ้า credentials ผิด จะไม่เข้าหน้า shop — ใช้ expectLoginError() ตรวจต่อ
   */
  async login(email: string, password: string): Promise<void> {
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.submitButton.click();
  }

  /**
   * ตรวจว่ามีข้อความ error แสดงตอน login ไม่สำเร็จ
   *
   * @param text - ข้อความ (บางส่วน) ที่คาดว่าจะเจอ เช่น "Bad credentials"
   *
   * @example
   * await loginPage.expectLoginError('Bad credentials');
   */
  async expectLoginError(text: string): Promise<void> {
    await expect(this.locators.errorMessage).toBeVisible();
    await expect(this.locators.errorMessage).toContainText(text);
  }
}
