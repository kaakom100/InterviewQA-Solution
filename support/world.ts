import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from 'playwright';

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
  context!: BrowserContext;
  page!: Page;

  // ยอดรวมที่คำนวณเองจาก (ราคา x จำนวน) เพื่อเทียบกับ total บนหน้าเว็บ
  expectedTotal = 0;

  // ข้อมูล shipping ที่กรอก เพื่อเอาไปตรวจในหน้า confirmation
  shipping: ShippingDetails = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
