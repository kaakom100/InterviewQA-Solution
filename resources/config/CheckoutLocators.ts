import { Page } from 'playwright';

/** locator ทั้งหมดของฟอร์ม Shipping Details (Step 3) */
export const CheckoutLocators = (page: Page) => ({
  form: page.locator('#shipping-address'),
  phone: page.locator('#phone'),
  street: page.locator('input[name="street"]'),
  city: page.locator('input[name="city"]'),
  country: page.locator('#countries_dropdown_menu'),
  submitOrderButton: page.locator('#submitOrderBtn'),
});
