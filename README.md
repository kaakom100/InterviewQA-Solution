# InterviewQA-Solution

Test automation สำหรับโจทย์ [silakob/InterviewQA.Test](https://github.com/silakob/InterviewQA.Test)
เขียนด้วย **Playwright + Cucumber (BDD) + TypeScript** ตามแพทเทิร์น **Page Object Model**

## Tech Stack

| เครื่องมือ | หน้าที่ |
|---|---|
| Playwright | ควบคุมเบราว์เซอร์ (UI automation) |
| Cucumber.js | ตัวรันเทสต์แบบ BDD (`.feature`) |
| TypeScript | ภาษาที่ใช้เขียน |
| cucumber-html-reporter | สร้าง HTML report |

## Prerequisite

- Node.js 18+ และ npm
- (เฉพาะ API testing) Docker Desktop

## การติดตั้ง

```bash
npm install
npx playwright install
```

## การรันเทสต์ (UI - Step 1 ถึง 4)

```bash
npm run test:ui        # รันเฉพาะ UI test (headless)
npm run test:headed    # รันแบบเห็นเบราว์เซอร์จริง
npm test               # รันทุก feature
```

### สร้าง HTML report

```bash
npm run test:report    # รันเทสต์ + สร้าง report ในครั้งเดียว
# เปิดไฟล์ reports/cucumber-report.html
```

## โครงสร้างโปรเจค (แยก 3 ชั้น: resources / pages / testscript)

```
resources/
  config/          # locator เท่านั้น — แยกตามหน้า (LoginLocators, ShopLocators, ...)
  datavariables/   # test data — LoginData, ProductData, ShippingData
pages/             # keyword (action) ของแต่ละหน้า — ดึง locator จาก resources/config
testscript/        # โค้ดทดสอบ (step definitions) — เรียก keyword จาก pages + data จาก datavariables
features/ui/       # ไฟล์ .feature (Gherkin) ของ Step 1-4
support/           # world.ts (state ต่อ scenario), hooks.ts (เปิด-ปิด browser), config.ts (env)
utils/             # report.ts — ตัวสร้าง HTML report
reports/           # ผลรัน + report (gitignore)
screenshots/       # ภาพตอนเทสต์ fail (gitignore)
```

### การไหลของข้อมูล
```
features/*.feature  →  testscript/*.steps.ts  →  pages/*.ts  →  resources/config/*.ts  →  เว็บจริง
   (ภาษาคน)              (โค้ดทดสอบ)   ↑            (keyword)        (locator)
                                       └── ดึง test data จาก resources/datavariables/*.ts
```

### อธิบายแต่ละโฟลเดอร์ (+ เทียบ Robot Framework)

| โฟลเดอร์ | คืออะไร | เทียบ Robot Framework |
|---|---|---|
| **`resources/config/`** | เก็บ **locator เท่านั้น** (ที่อยู่ของ element เช่น `#email`) 1 ไฟล์ = 1 หน้า | ตัวแปร locator |
| **`resources/datavariables/`** | เก็บ **test data** — `LoginData` (บัญชี), `ProductData` (สินค้า+ราคา+ยอดรวม), `ShippingData` (ที่อยู่) | Variables file |
| **`pages/`** | **keyword (action)** ของแต่ละหน้า เช่น `login()`, `addToCart()` — ดึง locator จาก `config/` | **Custom Library** |
| **`testscript/`** | **โค้ดทดสอบ (step definitions)** — ตัวแปลประโยคใน `.feature` → เรียก keyword ใน `pages/` | *(RF ไม่มีชั้นนี้ เพราะเรียก keyword ตรงๆ)* |
| **`features/ui/`** | **เคสภาษาคน** (Gherkin: Given-When-Then) ของ Step 1-4 | Test Suite (`*.robot`) |
| **`support/`** | **โครงสร้างพื้นฐานของ Cucumber** (ไม่ใช่ keyword) — `hooks.ts` เปิด/ปิดเบราว์เซอร์, `world.ts` state กลาง, `config.ts` env | Setup/Teardown + state |
| **`utils/`** | **เครื่องมือเสริม** — `report.ts` แปลงผลรันเป็น HTML report (รันแยกด้วย `npm run report`) | RF สร้าง report ให้เอง |
| **`reports/` / `screenshots/`** | **output** ที่ generate ใหม่ได้ (อยู่ใน `.gitignore`) | log.html / report.html |

> **หลักการ:** locator (config) แยกจาก keyword (pages) แยกจากโค้ดทดสอบ (testscript)
> → เว็บเปลี่ยน selector แก้ที่ `config/` · เปลี่ยน logic แก้ที่ `pages/` · เปลี่ยนเคสแก้ที่ `testscript/` + `features/`

## เทสต์ที่ครอบคลุม

| Step | Feature | Positive | Negative |
|---|---|---|---|
| 1 | Login | login สำเร็จด้วย credentials ที่ถูก | login ผิด -> ขึ้น "Bad credentials" |
| 2 | Product Selection | Dior 2 + Gucci 3 -> total = $419.95 | จำนวนผิด -> total ไม่ตรง |
| 3 | Checkout | กรอกครบ -> order สำเร็จ | เว้นช่องบังคับ -> order ไม่ผ่าน |
| 4 | Order Confirmation | address แสดง "Street, City - Country" | — |

## config (ผ่าน environment variable)

| ตัวแปร | ค่า default | ความหมาย |
|---|---|---|
| `HEADED` | `false` | ตั้ง `true` เพื่อดูเบราว์เซอร์จริง |
| `BASE_URL` | qa-practice URL | URL หน้าเว็บ frontend |
| `API_URL` | `http://localhost:8887` | URL backend API (ตอนทำ API test) |
