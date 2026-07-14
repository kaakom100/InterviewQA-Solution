import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { OrderConfirmationLocators } from '../resources/config/OrderConfirmationLocators';

/**
 * ═══ OrderConfirmationPage — Keyword List (Step 4: Confirmation) ═══
 *   Get      : getMessage() · message (getter)
 *   Validate : expectOrderRegistered() · expectAddressText(expected)
 *
 * หมายเหตุ: ข้อความยืนยันขึ้นที่ #message เช่น
 * "Congrats! Your order of $419.95 ... shipped to 5876 Little Streets, London - Australia."
 */
export class OrderConfirmationPage {
  private page: Page;
  private locators: ReturnType<typeof OrderConfirmationLocators>;

  constructor(page: Page) {
    this.page = page;
    this.locators = OrderConfirmationLocators(page);
  }

  /** (getter) locator ของข้อความยืนยัน (#message) */
  get message(): Locator {
    return this.locators.message;
  }

  /**
   * อ่านข้อความยืนยันเป็น string (ตัดช่องว่างหัว-ท้าย)
   *
   * @returns ข้อความใน #message
   *
   * @example
   * const msg = await confirmationPage.getMessage();
   */
  async getMessage(): Promise<string> {
    return (await this.locators.message.innerText()).trim();
  }

  /**
   * ยืนยันว่า order ถูก register สำเร็จ (ข้อความมีคำว่า "Congrats")
   *
   * @example
   * await confirmationPage.expectOrderRegistered();
   */
  async expectOrderRegistered(): Promise<void> {
    await expect(this.locators.message).toBeVisible();
    await expect(this.locators.message).toContainText('Congrats');
  }

  /**
   * ตรวจว่า address แสดงถูก format "Street, City - Country"
   *
   * @param expectedAddress - ที่อยู่ที่คาดหวัง เช่น "5876 Little Streets, London - Australia"
   *
   * @example
   * await confirmationPage.expectAddressText('5876 Little Streets, London - Australia');
   */
  async expectAddressText(expectedAddress: string): Promise<void> {
    await expect(this.locators.message).toContainText(expectedAddress);
  }
}
