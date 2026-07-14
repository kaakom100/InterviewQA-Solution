@ui @checkout
Feature: Step 3 - Checkout (Shipping Details)
  As a shopper with items in the cart
  I want to submit my shipping details
  So that my order gets registered

  Background:
    Given I am logged in to the shop
    And I have the following items in my cart
      | product            | quantity |
      | Dior J'adore       | 2        |
      | Gucci Bloom Eau de | 3        |
    And I proceed to checkout

  # Positive case: กรอกครบทุกช่องที่บังคับ
  Scenario: Successful order when all mandatory fields are filled
    When I fill the shipping details
      | phone      | street              | city   | country   |
      | 0812345678 | 5876 Little Streets | London | Australia |
    And I submit the order
    Then the order should be registered successfully

  # Negative case: เว้นช่องที่บังคับว่าง (street)
  Scenario: Failed order when a mandatory field is empty
    When I fill the shipping details
      | phone      | street | city   | country   |
      | 0812345678 |        | London | Australia |
    And I submit the order
    Then the order should not be registered
    And the "street" field should be marked as required
