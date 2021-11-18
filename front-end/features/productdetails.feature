Feature: Learn more details about the product

    As a user I want to be able to learn more about products
    And consider their environmental impact
    As a manufacturer I want to demonstrate competitive advantage
    through the eco-friendliness of my products

Scenario: I want to navigate to the details from the catalog page
  Given I am on the catalog page
  When I click on product image
  Then I should be on product details page

Scenario: I want to see more detailed statistics about environmental impact
  Given I am on the product details page
  Then I should see environmental details

Scenario: I want to see more detailed product description
  Given I am on the product details page
  Then I should see product description

Scenario: I want to see similar products
  Given I am on the product details page
  Then I should see similar products