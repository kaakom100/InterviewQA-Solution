import { Page, Locator } from 'playwright';

/** locator ทั้งหมดของหน้า Shop: สินค้า + ตะกร้า + ยอดรวม (Step 2) */
export const ShopLocators = (page: Page) => ({
  shoppingCartHeader: page.getByRole('heading', { name: 'SHOPPING CART' }),
  cartTotal: page.locator('.cart-total-price'),
  proceedButton: page.locator('.btn-purchase'), // ปุ่ม PROCEED TO CHECKOUT

  // locator ที่ต้องอ้างตามชื่อสินค้า -> เป็น function รับชื่อเข้ามา
  shopItemPrice: (name: string): Locator =>
    page.locator('.shop-item', { hasText: name }).locator('.shop-item-price'),
  addToCartButton: (name: string): Locator =>
    page.locator('.shop-item', { hasText: name }).getByRole('button', { name: 'ADD TO CART' }),
  quantityInput: (name: string): Locator =>
    page.locator('.cart-row', { hasText: name }).locator('.cart-quantity-input'),
});
