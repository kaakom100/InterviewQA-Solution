@ui @shop
Feature: Step 2 - Product Selection and Total Cost
  As a logged-in shopper
  I want to add products with specific quantities
  So that the total cost is calculated correctly

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
