import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { EmployeeApi } from '../api/EmployeeApi';
import {
  buildValidEmployee,
  invalidEmailEmployee,
} from '../resources/datavariables/EmployeeData';

When('I create an employee with valid data', async function (this: CustomWorld) {
  const api = new EmployeeApi(this.apiContext!);
  this.apiResponse = await api.create(buildValidEmployee());
});

When('I create an employee with an invalid email', async function (this: CustomWorld) {
  const api = new EmployeeApi(this.apiContext!);
  this.apiResponse = await api.create(invalidEmailEmployee);
});

When('I get the employee with id {int}', async function (this: CustomWorld, id: number) {
  const api = new EmployeeApi(this.apiContext!);
  this.apiResponse = await api.getById(id);
});

Then('the response status should be {int}', async function (this: CustomWorld, status: number) {
  expect(this.apiResponse!.status()).toBe(status);
});

Then('the response should indicate an email validation error', async function (this: CustomWorld) {
  const body = await this.apiResponse!.text();
  expect(body).toContain('well-formed email address');
});

Then('the response should contain the employee id {int}', async function (this: CustomWorld, id: number) {
  const body = await this.apiResponse!.json();
  expect(body.id).toBe(id);
});

Then('the response should contain the text {string}', async function (this: CustomWorld, text: string) {
  const body = await this.apiResponse!.text();
  expect(body).toContain(text);
});
