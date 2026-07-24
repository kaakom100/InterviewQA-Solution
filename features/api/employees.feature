@api @employees
Feature: API - Employees (POST & GET /api/v1/employees)
  ทดสอบ REST API ของ Employee
  - POST Positive: ข้อมูลถูกต้อง -> 201
  - POST Negative: email ผิดรูปแบบ -> 400
  - GET Positive: employee ที่มีอยู่ -> 200
  - GET Negative: employee ที่ไม่มี -> 404 + ข้อความ error

  # ===== POST /api/v1/employees =====
  Scenario: POST สร้าง employee ด้วยข้อมูลที่ถูกต้อง ต้องได้ 201
    When I create an employee with valid data
    Then the response status should be 201

  Scenario: POST ด้วย email ผิดรูปแบบ ต้องได้ 400
    When I create an employee with an invalid email
    Then the response status should be 400
    And the response should indicate an email validation error

  # ===== GET /api/v1/employees/{id} =====
  Scenario: GET employee ที่มีอยู่ (id 1) ต้องได้ 200
    When I get the employee with id 1
    Then the response status should be 200
    And the response should contain the employee id 1

  Scenario: GET employee ที่ไม่มี (id 99999) ต้องได้ 404
    When I get the employee with id 99999
    Then the response status should be 404
    And the response should contain the text "Employee not found with ID 99999"
