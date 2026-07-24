// Test data สำหรับ API - Employees (POST/GET /api/v1/employees)
export interface Employee {
  firstName: string;
  lastName: string;
  dob: string; // รูปแบบ YYYY-MM-DD
  email: string;
}

/**
 * สร้าง employee ที่ข้อมูลถูกต้อง — ใส่ timestamp ใน email ให้ unique
 * (กันชนกันเวลารันเทสต์ซ้ำหลายรอบ)
 */
export function buildValidEmployee(): Employee {
  return {
    firstName: 'Danai',
    lastName: 'Test',
    dob: '1995-05-05',
    email: `danai.test.${Date.now()}@example.com`,
  };
}

// employee ที่ email ผิดรูปแบบ (ใช้ทดสอบ negative -> คาดว่า 400)
export const invalidEmailEmployee: Employee = {
  firstName: 'Bad',
  lastName: 'Email',
  dob: '1995-05-05',
  email: 'not-an-email',
};

export const existingEmployeeId = 1; // id ที่มีอยู่จริง (seed data)
export const nonExistentEmployeeId = 99999; // id ที่ไม่มี -> คาดว่า 404
