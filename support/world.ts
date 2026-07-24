import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page, APIRequestContext, APIResponse } from 'playwright';

export interface ShippingDetails {
  phone?: string;
  street?: string;
  city?: string;
  country?: string;
}

/**
 * Custom World — object ที่ Cucumber สร้างใหม่ให้ทุก scenario
 * ใช้เก็บ browser context / page และข้อมูลที่ต้องส่งต่อระหว่าง step
 */
export class CustomWorld extends World {
  // ---- UI (browser) ----
  context!: BrowserContext;
  page!: Page;

  // ---- API ----
  apiContext?: APIRequestContext; // ตัวยิง HTTP request (สร้างเฉพาะ scenario @api)
  apiResponse?: APIResponse; // response ล่าสุด เก็บไว้ให้ step ตรวจ

  // ยอดรวมที่คำนวณเองจาก (ราคา x จำนวน) เพื่อเทียบกับ total บนหน้าเว็บ
  expectedTotal = 0;

  // ข้อมูล shipping ที่กรอก เพื่อเอาไปตรวจในหน้า confirmation
  shipping: ShippingDetails = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
