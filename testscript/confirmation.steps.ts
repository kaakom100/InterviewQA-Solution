import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { expectedAddress } from '../resources/datavariables/ShippingData';

// ตรวจ address ตาม string ที่ระบุใน feature
Then(
  'the confirmation should display the address as {string}',
  async function (this: CustomWorld, expectedAddressText: string) {
    const confirmationPage = new OrderConfirmationPage(this.page);
    await confirmationPage.expectAddressText(expectedAddressText);
  }
);

// ตรวจ address ตามค่าที่คาดหวังจาก resources/datavariables/ShippingData
Then('the confirmation should display the expected shipping address', async function (this: CustomWorld) {
  const confirmationPage = new OrderConfirmationPage(this.page);
  await confirmationPage.expectAddressText(expectedAddress);
});
