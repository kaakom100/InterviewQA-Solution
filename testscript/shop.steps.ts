import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';
import { validUser } from '../resources/datavariables/LoginData';
import { assignmentOrder, expectedOrderTotal } from '../resources/datavariables/ProductData';

// login สำเร็จ + อยู่หน้า shop (ใช้เป็น background ของหลาย feature)
Given('I am logged in to the shop', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login(validUser.email, validUser.password); // <- ใช้ data จาก DataVariables
  const shopPage = new ShopPage(this.page);
  await shopPage.expectLoaded();
  this.expectedTotal = 0;
});

// เลือกสินค้าตามโจทย์ (Dior 2 + Gucci 3) จาก resources/datavariables/ProductData
When('I select the assignment products', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  this.expectedTotal = 0;
  for (const item of assignmentOrder) {
    const price = await shopPage.getProductPrice(item.name);
    await shopPage.addToCart(item.name);
    await shopPage.setQuantity(item.name, item.quantity);
    this.expectedTotal += price * item.quantity;
  }
});

Then('the cart total should match the expected total', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  const actual = await shopPage.getCartTotal();
  expect(actual).toBeCloseTo(expectedOrderTotal, 2); // 419.95 จาก ProductData
});

When(
  'I add {string} to the cart with quantity {int}',
  async function (this: CustomWorld, product: string, quantity: number) {
    const shopPage = new ShopPage(this.page);
    const price = await shopPage.getProductPrice(product);
    await shopPage.addToCart(product);
    await shopPage.setQuantity(product, quantity);
    this.expectedTotal += price * quantity;
  }
);

// เพิ่มสินค้าหลายชิ้นทีเดียวจากตาราง (ใช้เป็น background ของ checkout/confirmation)
Given('I have the following items in my cart', async function (this: CustomWorld, table: DataTable) {
  const shopPage = new ShopPage(this.page);
  this.expectedTotal = 0;
  for (const row of table.hashes()) {
    const product = row.product;
    const quantity = Number(row.quantity);
    const price = await shopPage.getProductPrice(product);
    await shopPage.addToCart(product);
    await shopPage.setQuantity(product, quantity);
    this.expectedTotal += price * quantity;
  }
});

Then('the cart total should equal the sum of price times quantity', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  const actual = await shopPage.getCartTotal();
  expect(actual).toBeCloseTo(this.expectedTotal, 2);
});

Then('the cart total should not equal {float}', async function (this: CustomWorld, value: number) {
  const shopPage = new ShopPage(this.page);
  const actual = await shopPage.getCartTotal();
  expect(actual).not.toBeCloseTo(value, 2);
});

Then('the {string} button should be enabled', async function (this: CustomWorld, _label: string) {
  const shopPage = new ShopPage(this.page);
  await expect(shopPage.proceedButton).toBeEnabled();
});
