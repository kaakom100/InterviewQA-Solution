// Test data สำหรับ Step 1 - Login
export interface Credentials {
  email: string;
  password: string;
}

// บัญชีที่ถูกต้อง (ใช้ login ในทุก background)
export const validUser: Credentials = {
  email: 'admin@admin.com',
  password: 'admin123',
};

// ชุดบัญชีที่ผิด (ใช้ทดสอบ negative)
export const invalidUsers: Credentials[] = [
  { email: 'wrong@admin.com', password: 'admin123' },
  { email: 'admin@admin.com', password: 'wrongpass' },
  { email: 'invalid@email.com', password: 'invalid' },
];
