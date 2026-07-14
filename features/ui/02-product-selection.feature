@ui @shop
Feature: Step 2 - Product Selection and Total Cost
  ทดสอบการเลือกสินค้าและการคำนวณยอดรวม
  - Positive: เลือก Dior 2 ชิ้น + Gucci 3 ชิ้น ยอดรวมต้องเท่ากับ $419.95
  - Negative: จำนวนสินค้าผิด ยอดรวมต้องไม่ตรงกับที่คาดหวัง

  Background:
    Given I am logged in to the shop

  # Positive case: เลือกสินค้าตามโจทย์ (ข้อมูลมาจาก resources/datavariables/ProductData)
  Scenario: Select items correctly and validate the total cost
    When I select the assignment products
    Then the cart total should match the expected total
    And the "PROCEED TO CHECKOUT" button should be enabled

  # Negative case: จำนวนสินค้าผิด -> ยอดรวมต้องไม่ตรงกับค่าที่คาดหวังของโจทย์
  Scenario: Wrong quantity produces a different total
    When I add "Dior J'adore" to the cart with quantity 1
    And I add "Gucci Bloom Eau de" to the cart with quantity 1
    Then the cart total should not equal 419.95
