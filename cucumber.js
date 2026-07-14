// Cucumber configuration — ใช้ ts-node รันไฟล์ .ts โดยตรง
const common = {
  requireModule: ['ts-node/register'],
  require: ['support/**/*.ts', 'testscript/**/*.ts'],
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

module.exports = {
  // profile เริ่มต้น: รันทุก feature
  default: {
    ...common,
    paths: ['features/**/*.feature'],
  },
  // รันเฉพาะ UI test (ไม่ต้องใช้ Docker)
  ui: {
    ...common,
    paths: ['features/ui/**/*.feature'],
  },
  // รันเฉพาะ API test (ต้องรัน Docker container ก่อน)
  api: {
    ...common,
    paths: ['features/api/**/*.feature'],
  },
};
