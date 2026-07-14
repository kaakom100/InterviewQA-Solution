import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { CheckoutLocators } from '../resources/config/CheckoutLocators';
import { ShippingDetails } from '../support/world';

type RequiredField = 'phone' | 'street' | 'city' | 'country';

/**
 * ═══ CheckoutPage — Keyword List (Step 3: Shipping Details) ═══
 *   Input    : fillShippingDetails(details)
 *   Action   : submitOrder()
 *   Validate : expectVisible() · isFieldInvalid(field)
 */
export class CheckoutPage {
  private page: Page;
  private locators: ReturnType<typeof CheckoutLocators>;

  constructor(page: Page) {
    this.page = page;
    this.locators = CheckoutLocators(page);
  }

  /**
   * ยืนยันว่าฟอร์ม shipping แสดงขึ้นมาแล้ว (หลังกด PROCEED TO CHECKOUT)
   *
   * @example
   * await checkoutPage.expectVisible();
   */
  async expectVisible(): Promise<void> {
    await expect(this.locators.form).toBeVisible();
  }

  /**
   * กรอกฟอร์ม shipping — ช่องไหนเป็น undefined จะข้าม (ใช้ทดสอบ negative ได้)
   *
   * @param details - object ข้อมูล { phone?, street?, city?, country? }
   *
   * @example
   * await checkoutPage.fillShippingDetails({
   *   phone: '0812345678', street: '5876 Little Streets', city: 'London', country: 'Australia',
   * });
   */
  async fillShippingDetails(details: ShippingDetails): Promise<void> {
    if (details.phone !== undefined) await this.locators.phone.fill(details.phone);
    if (details.street !== undefined) await this.locators.street.fill(details.street);
    if (details.city !== undefined) await this.locators.city.fill(details.city);
    if (details.country) await this.locators.country.selectOption(details.country);
  }

  /**
   * กดปุ่ม Submit Order
   *
   * @example
   * await checkoutPage.submitOrder();
   */
  async submitOrder(): Promise<void> {
    await this.locators.submitOrderButton.click();
  }

  /**
   * เช็คว่า field ถูก mark ว่า invalid ตาม HTML5 required (ใช้ตอนทดสอบ negative)
   *
   * @param field - ชื่อ field: 'phone' | 'street' | 'city' | 'country'
   * @returns true ถ้า field นั้น invalid (ว่างทั้งที่ required)
   *
   * @example
   * const invalid = await checkoutPage.isFieldInvalid('street');
   */
  async isFieldInvalid(field: RequiredField): Promise<boolean> {
    return this.locators[field].evaluate(
      (el) => !(el as HTMLInputElement | HTMLSelectElement).checkValidity()
    );
  }
}
