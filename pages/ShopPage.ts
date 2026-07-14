import { Page, Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ShopLocators } from '../resources/config/ShopLocators';

/**
 * ═══ ShopPage — Keyword List (Step 2: Product Selection) ═══
 *   Action   : addToCart(name) · setQuantity(name, quantity) · proceedToCheckout()
 *   Get      : getProductPrice(name) · getCartTotal() · proceedButton (getter)
 *   Validate : expectLoaded()
 */
export class ShopPage {
  private page: Page;
  private locators: ReturnType<typeof ShopLocators>;

  constructor(page: Page) {
    this.page = page;
    this.locators = ShopLocators(page);
  }

  /**
   * (getter) locator ของปุ่ม PROCEED TO CHECKOUT
   * เปิด public ให้ step เอาไปตรวจสถานะ enabled ได้
   */
  get proceedButton(): Locator {
    return this.locators.proceedButton;
  }

  /**
   * ยืนยันว่า login สำเร็จและอยู่หน้า shop (เห็นหัวข้อ SHOPPING CART)
   *
   * @example
   * await shopPage.expectLoaded();
   */
  async expectLoaded(): Promise<void> {
    await expect(this.locators.shoppingCartHeader).toBeVisible();
  }

  /**
   * อ่านราคาสินค้าตามชื่อ แล้วแปลงเป็นตัวเลข ("$89.99" -> 89.99)
   *
   * @param name - ชื่อสินค้า (เช่น "Dior J'adore")
   * @returns ราคาสินค้าเป็น number
   *
   * @example
   * const price = await shopPage.getProductPrice("Dior J'adore");
   */
  async getProductPrice(name: string): Promise<number> {
    const text = await this.locators.shopItemPrice(name).innerText();
    return this.parsePrice(text);
  }

  /**
   * กดปุ่ม ADD TO CART ของสินค้าที่ระบุ
   *
   * @param name - ชื่อสินค้า (เช่น "Gucci Bloom Eau de")
   *
   * @example
   * await shopPage.addToCart("Gucci Bloom Eau de");
   */
  async addToCart(name: string): Promise<void> {
    await this.locators.addToCartButton(name).click();
  }

  /**
   * ปรับจำนวนสินค้าในตะกร้า แล้ว trigger ให้เว็บคำนวณ total ใหม่
   *
   * @param name     - ชื่อสินค้าในตะกร้า
   * @param quantity - จำนวนที่ต้องการ
   *
   * @example
   * await shopPage.setQuantity("Dior J'adore", 2);
   *
   * @remarks กด Tab หลังกรอก เพื่อให้ event change ทำงาน (total ถึงจะอัปเดต)
   */
  async setQuantity(name: string, quantity: number): Promise<void> {
    const input = this.locators.quantityInput(name);
    await input.fill(String(quantity));
    await input.press('Tab');
  }

  /**
   * อ่านยอดรวมในตะกร้า แล้วแปลงเป็นตัวเลข
   *
   * @returns ยอดรวมเป็น number
   *
   * @example
   * const total = await shopPage.getCartTotal();
   */
  async getCartTotal(): Promise<number> {
    return this.parsePrice(await this.locators.cartTotal.innerText());
  }

  /**
   * กดปุ่ม PROCEED TO CHECKOUT (ไปหน้ากรอก shipping)
   *
   * @example
   * await shopPage.proceedToCheckout();
   */
  async proceedToCheckout(): Promise<void> {
    await this.locators.proceedButton.click();
  }

  /** (private) แปลงข้อความราคา "$89.99" -> 89.99 */
  private parsePrice(text: string): number {
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }
}
