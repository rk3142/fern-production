Feature: user login in, logout, 

  As a customer
  So that I can register an account for the first time I come to the website
  I want login with my credentials after that I can begin my shopping
  I also want to logout after I am done
  I can also change password when needed
  I can delete my account is also somehting I expect
  I can logout
  
Background: users in database

  Given the following users exist:
  | email           | password          |
  | bob@fern.com    | Bob@123456        |
  | alice@fern.com  | Alice@123456      |

Scenario: existing user login
    Given I am on the Fern homepage
    When I follow "login"
    Then I should be on the login page
    When I fill in "Email" with "bob@fern.com"
    And I fill in "Password" with "Bob@123456"
    And I press "Sign in"
    Then I should be on the Fern homepage
    And I should see "bob@fern.com"
    And I should not see "login"
    
Scenario: Wrong email login
    Given I am on the login page
    When I fill in email with "bobbbb@fern.com"
    And I fill in "Password" with "Bob@123456"
    And I press "Sign in"
    Then I should see "Invalid email or password"
    

Scenario: Wrong password login
    Given I am on the login page
    When I fill in email with "bob@fern.com"
    And I fill in "Password" with "Bob@123456789"
    And I press "Sign in"
    Then I should see "Invalid email or password"
    
Scenario: change password
    Given I am on the login page
    When I fill in "Email" with "bob@fern.com"
    And I fill in "Password" with "Bob@123456"
    And I press "Sign in"
    Then I should be on the Fern homepage
    When I follow "bob@fern.com"
    Then I should be on the profile page
    When I click "Update Password"
    I should be on the password update page
    When I fill in "Old password" with "Bob@123456"
    And I fill in "new password" with "Bob@newpassword"
    And I press "Update"
    Then my password should be changed to "Bob@newpassword"
    
Scenario: delete existing user
    Given I am on the login page
    When I fill in email with "bob@fern.com"
    And I fill in "Password" with "Bob@123456"
    And I press "Sign in"
    Then I should be on the Fern homepage
    When I follow "bob@fern.com"
    Then I should be on the profile page
    When I press "delete user"
    Then I should see "user is deleted successfully"
    And I should be on the Fern homepage
    And I should see "Login"

Scenario: logout
    Given I am on the login page
    When I fill in email with "bob@fern.com"
    And I fill in "Password" with "Bob@123456"
    And I press "Sign in"
    Then I should be on the Fern homepage
    When I follow "Logout"
    Then I should be on the Fern homepage
    And I should see "Login"
