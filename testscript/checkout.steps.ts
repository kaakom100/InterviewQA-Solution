import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ShopPage } from '../pages/ShopPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { validShipping } from '../resources/datavariables/ShippingData';

type RequiredField = 'phone' | 'street' | 'city' | 'country';

When('I proceed to checkout', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  await shopPage.proceedToCheckout();
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.expectVisible();
});

When('I fill the shipping details', async function (this: CustomWorld, table: DataTable) {
  const details = table.hashes()[0];
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.fillShippingDetails(details);
  this.shipping = details; // เก็บไว้ตรวจ address ในหน้า confirmation
});

// กรอกข้อมูล shipping ที่ถูกต้องจาก resources/datavariables/ShippingData
When('I fill in the valid shipping details', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.fillShippingDetails(validShipping);
  this.shipping = validShipping;
});

When('I submit the order', async function (this: CustomWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.submitOrder();
});

Then('the order should be registered successfully', async function (this: CustomWorld) {
  const confirmationPage = new OrderConfirmationPage(this.page);
  await confirmationPage.expectOrderRegistered();
});

Then('the order should not be registered', async function (this: CustomWorld) {
  const confirmationPage = new OrderConfirmationPage(this.page);
  await expect(confirmationPage.message).not.toContainText('Congrats');
});

Then(
  'the {string} field should be marked as required',
  async function (this: CustomWorld, field: string) {
    const checkoutPage = new CheckoutPage(this.page);
    const invalid = await checkoutPage.isFieldInvalid(field as RequiredField);
    expect(invalid).toBe(true);
  }
);
