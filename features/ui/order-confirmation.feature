@ui @confirmation
Feature: Step 4 - Order Confirmation (Address Format)
  As a shopper who submitted an order
  I want the shipping address displayed in the correct format
  So that I can confirm where my order will be shipped

  Background:
    Given I am logged in to the shop
    And I have the following items in my cart
      | product      | quantity |
      | Dior J'adore | 2        |
    And I proceed to checkout

  # ตรวจว่า address ต่อกันถูก format: "Street, City - Country"
  # (ข้อมูล shipping + address ที่คาดหวัง มาจาก resources/datavariables/ShippingData)
  Scenario: Address is displayed in "Street, City - Country" format
    When I fill in the valid shipping details
    And I submit the order
    Then the order should be registered successfully
    And the confirmation should display the expected shipping address
