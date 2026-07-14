@ui @login
Feature: Step 1 - Login (Shop Page)
  ทดสอบการเข้าสู่ระบบของหน้า Shop
  - Positive: เข้าสู่ระบบสำเร็จด้วย email/password ที่ถูกต้อง
  - Negative: เข้าสู่ระบบด้วยข้อมูลผิด 3 กรณี ต้องขึ้น error "Bad credentials"

  Background:
    Given I am on the login page

  # Positive case
  Scenario: Successful login with valid credentials
    When I login with email "admin@admin.com" and password "admin123"
    Then I should see the shopping page

  # Negative cases
  Scenario Outline: Unsuccessful login with invalid credentials
    When I login with email "<email>" and password "<password>"
    Then I should see the login error "Bad credentials"

    Examples:
      | email             | password  |
      | wrong@admin.com   | admin123  |
      | admin@admin.com   | wrongpass |
      | invalid@email.com | invalid   |
