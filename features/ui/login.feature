@ui @login
Feature: Step 1 - Login (Shop Page)
  As a shopper
  I want to log in with my credentials
  So that I can access the shop

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
