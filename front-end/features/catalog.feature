Feature: Interact with the Fern catalog 

    As a user I want to be able to browse through products
    And consider their environmental impact
    As a manufacturer I want to drive up purchases through the
    eco-friendliness of my products

Scenario: I want to navigate to the catalog from the login page
  Given I am on the login page
  When I go to the catalog
  Then I should see the filters

Scenario: I want to see all the shirts
  Given I am on the catalog page
  Then I should see all the shirts

Scenario: I want to add to my cart
  Given I am on the catalog page
  Then I should have an empty cart
  When I add an item to the cart
  Then I should have 1 item in the cart

Scenario: I want to remove from my cart
  Given I am on the catalog page with an item in my cart
  When I remove an item from the cart
  Then I should have an empty cart

Scenario: I want to filter by price 
  Given I am on the catalog page
  When I filter by price
  Then I should have results filtered by price

Scenario: I want to filter by rating 
  Given I am on the catalog page
  When I filter by rating
  Then I should have results filtered by rating

Scenario: I want to search for a color
  Given I am on the catalog page
  When I search for the brand Generic
  Then I should see Generic shirts