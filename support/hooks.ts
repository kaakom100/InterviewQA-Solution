import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import { CustomWorld } from './world';
import { config } from './config';

// เผื่อเวลาให้แต่ละ step (โหลดเว็บจริงอาจช้า)
setDefaultTimeout(60 * 1000);

let browser: Browser;

// เปิดเบราว์เซอร์ครั้งเดียวก่อนรันทุก scenario (เร็วกว่าเปิด-ปิดทุกครั้ง)
BeforeAll(async function () {
  browser = await chromium.launch({ headless: config.headless });
});

// ปิดเบราว์เซอร์หลังรันครบทุก scenario
AfterAll(async function () {
  await browser?.close();
});

// แต่ละ scenario ใช้ context ใหม่ (แยก cookie/session ออกจากกัน — เทสต์ไม่กวนกัน)
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

// หลังจบ scenario: ถ้า fail ให้แนบ screenshot เข้า report แล้วปิด context
After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
});
