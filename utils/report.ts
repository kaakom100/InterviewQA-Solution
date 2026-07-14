// สร้าง HTML report จากผลรัน Cucumber (ตามที่โจทย์กำหนดให้ใช้ cucumber-html-reporter)
import * as fs from 'fs';
import * as path from 'path';

// cucumber-html-reporter เป็น CommonJS module -> ใช้ require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reporter = require('cucumber-html-reporter');

const jsonFile = path.join('reports', 'cucumber-report.json');
const output = path.join('reports', 'cucumber-report.html');

if (!fs.existsSync(jsonFile)) {
  console.error(`❌ ไม่พบไฟล์ ${jsonFile} — กรุณารันเทสต์ก่อน (npm test)`);
  process.exit(1);
}

reporter.generate({
  theme: 'hierarchy',
  jsonFile,
  output,
  columnLayout: 1, // จัด feature เป็นคอลัมน์เดียว (เรียง 1→2→3→4 ลงมา อ่านง่าย)
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: !process.env.CI, // เปิดในเบราว์เซอร์อัตโนมัติ (ยกเว้นตอนรันบน CI)
  metadata: {
    App: 'QA Practice - Ecommerce',
    'Test Environment': 'Production (frontend)',
    Browser: 'Chromium',
    Platform: process.platform,
    Framework: 'Playwright + Cucumber (TypeScript)',
  },
});

// print path เต็ม + file:// URL ให้คลิกเปิดในเบราว์เซอร์ได้จาก terminal
const absolute = path.resolve(output);
console.log('\n✅ HTML report สร้างแล้ว (เปิดในเบราว์เซอร์อัตโนมัติ)');
console.log(`   Report: ${absolute}`);
console.log(`   Open:   file:///${absolute.replace(/\\/g, '/')}`);
