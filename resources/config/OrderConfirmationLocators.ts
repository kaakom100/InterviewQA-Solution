import { Page } from 'playwright';

/** locator ของข้อความยืนยันหลัง Submit Order (Step 4) */
export const OrderConfirmationLocators = (page: Page) => ({
  message: page.locator('#message'),
});
