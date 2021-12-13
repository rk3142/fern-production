Feature: As a user I want to see Fern SaaS app
   
    As a user I want to be able to learn about my impact
    And find ways to use Fern to improve my footprint

Scenario: I want to navigate to the user profile from the catalog page
  Given I am on the catalog page
  When I go to the user profile page
  Then I should be on user profile page


Scenario: I want to see my remaining spore count
  Given I am on the user profile page
  Then I should see my spore count

Scenario: I want to plant a tree
  Given I am on the user profile page
  When I click on plant a tree button
  Then I should see 200 spores

Scenario: I want to collect trash
  Given I am on the user profile page
  When I click on collect trash button
  Then I should see 100 spores

Scenario: I want to capture carbon
  Given I am on the user profile page
  When I click on capture carbon button
  Then I should see 450 spores

Scenario: I want to upload receipt
  Given I am on the user profile page
  When I click on verify image button
  Then I should see upload