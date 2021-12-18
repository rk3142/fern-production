Feature: Save products to your bookmarks for viewing later

    As a user I want to be able to save products I don't want right now
    And be able to see more information about them when I want to buy them
    As a manufacturer I want customers to buy my products multiple times

Scenario: I want to navigate to the bookmarks from the catalog page
  Given I am on the catalog page
  When I click on bookmarks
  Then I should be on the bookmarks page

Scenario: I want to navigate to the catalog from the bookmark page
  Given I am on the bookmark page
  When I click on logo
  Then I should be on the catalog page