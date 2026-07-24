import {
  AfterAll,
  Before,
  After,
  Status,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { chromium, request, Browser } from 'playwright';
import { CustomWorld } from './world';
import { config } from './config';

// เผื่อเวลาให้แต่ละ step (โหลดเว็บจริง/ยิง API อาจช้า)
setDefaultTimeout(60 * 1000);

let browser: Browser | undefined;

// เปิดเบราว์เซอร์แบบ lazy — เปิดครั้งแรกที่มี scenario UI เท่านั้น
// (รัน API อย่างเดียวจะไม่เปิดเบราว์เซอร์เลย เร็วกว่า)
async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({ headless: config.headless });
  }
  return browser;
}

// ปิดเบราว์เซอร์หลังรันครบทุก scenario (ถ้าเคยเปิด)
AfterAll(async function () {
  await browser?.close();
});

// ---- UI scenario (ไม่ใช่ @api): เปิด browser context ใหม่ต่อ scenario ----
Before({ tags: 'not @api' }, async function (this: CustomWorld) {
  const b = await getBrowser();
  this.context = await b.newContext();
  this.page = await this.context.newPage();
});

// ---- API scenario (@api): สร้าง API request context (ไม่ต้องใช้เบราว์เซอร์) ----
Before({ tags: '@api' }, async function (this: CustomWorld) {
  this.apiContext = await request.newContext({ baseURL: config.apiURL });
});

// หลังจบ scenario: ถ้า UI fail แนบ screenshot แล้วปิดทุก context
After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
  await this.apiContext?.dispose();
});
