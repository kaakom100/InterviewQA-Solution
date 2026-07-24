import { APIRequestContext, APIResponse } from 'playwright';
import { Employee } from '../resources/datavariables/EmployeeData';

const ENDPOINT = '/api/v1/employees';

/**
 * ═══ EmployeeApi — Keyword List (API: /api/v1/employees) ═══
 *   Action : create(employee) · getById(id)
 *
 * เทียบกับ pages/ (UI): อันนั้นเป็น keyword คุยกับหน้าเว็บ
 * ส่วนอันนี้เป็น keyword คุยกับ REST API (Service Object)
 */
export class EmployeeApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /** POST — สร้าง employee ใหม่ */
  async create(employee: Employee): Promise<APIResponse> {
    return this.request.post(ENDPOINT, { data: employee });
  }

  /** GET — ดึง employee ตาม id */
  async getById(id: number | string): Promise<APIResponse> {
    return this.request.get(`${ENDPOINT}/${id}`);
  }
}
