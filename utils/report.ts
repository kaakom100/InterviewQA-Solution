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
  theme: 'bootstrap',
  jsonFile,
  output,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    App: 'QA Practice - Ecommerce',
    'Test Environment': 'Production (frontend)',
    Browser: 'Chromium',
    Platform: process.platform,
    Framework: 'Playwright + Cucumber (TypeScript)',
  },
});

console.log(`✅ สร้าง HTML report แล้วที่ ${output}`);
