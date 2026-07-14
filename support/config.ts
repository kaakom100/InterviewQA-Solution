// ค่า config กลางของโปรเจค — override ได้ผ่าน environment variable
export const config = {
  // URL หน้าเว็บ frontend (Step 1-4)
  baseURL: process.env.BASE_URL ?? 'https://qa-practice.razvanvancea.ro/auth_ecommerce.html',

  // URL ของ backend API (ใช้ตอนทำ API testing — ต้องรัน Docker container ก่อน)
  apiURL: process.env.API_URL ?? 'http://localhost:8887',

  // headless = true โดย default (เหมาะกับ CI) — ตั้ง HEADED=true เพื่อดูเบราว์เซอร์จริง
  headless: process.env.HEADED !== 'true',
};

// หมายเหตุ: credentials / test data ย้ายไปอยู่ที่ resources/datavariables/ แล้ว
// ไฟล์นี้เก็บเฉพาะ "environment config" (URL, headless) เท่านั้น
