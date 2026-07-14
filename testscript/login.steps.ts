import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When(
  'I login with email {string} and password {string}',
  async function (this: CustomWorld, email: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(email, password);
  }
);

Then('I should see the shopping page', async function (this: CustomWorld) {
  const shopPage = new ShopPage(this.page);
  await shopPage.expectLoaded();
});

Then('I should see the login error {string}', async function (this: CustomWorld, text: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.expectLoginError(text);
});
