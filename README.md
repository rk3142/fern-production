# FERN - FEELING BLUE? GO GREEN

# DEPLOYMENT

This README would normally document whatever steps are necessary to get the
application up and running.



* Application URL(Heroku): https://fern-development.herokuapp.com/

## Installation Instructions
### Clone this repo
```commandline
git clone https://github.com/rk3142/fern-production.git
```

* Versions of Package
  - Ruby: Allowed versions 2.6.6 to 2.7.0 
  - Rails: 4.2.10
  - Database: SQLite3 for development and test environment, PostgreSQL(Heroku version) for production.

# Frontend Deployment

### Install dependencies
Make sure you have npm installed. Then run
```commandline
cd ./fern-frontend
npm install
```
This downloads and sets up all the packages. Without this step the app cannot work since dependencies will not have been created correctly.

## Start the app
### `npm start`
Launches the app using localhost:3000 in a web browser

### `npm test`
Runs the unit tests. The coverage will be outputted to `/coverage` in the root 

### `npm run bdd`
Runs cucumber for BDD. Note: BDD will not function as expected due to firebase authentication. The results have been displayed below.

# Backend Deployment
Pre-requisite: Ruby v2.6.6 or v2.6.8 should be installed in the system
* Setting up your DEVELOPMENT environment
1. Install Bundle
`gem install bundle`
2. Checkout the code from the git repo and follow the below steps

`cd fern`\
`bundle install --without production --path vendor/` \
`bundle exec rake db:migrate RAILS_ENV=development`\
`bundle exec rake db:seed RAILS_ENV=development`

3. Run the rails server
`rails s -b 0.0.0.0 -p 3000`  
  
  <br/>
  <br/>

* Setting up your TEST environment

1. Install Bundle
`gem install bundle`
2. Checkout the code from the git repo and follow the below steps

`cd fern` \
`bundle install --without production --path vendor/` \
`bundle exec rake db:migrate RAILS_ENV=test`\
`bundle exec rake db:seed RAILS_ENV=test`


# Runing rails RSPEC cases
1. Follow the steps in the section SETTING UP YOUR TEST ENVIRONMENT to create the test environment.
2. Run the below command to run the test suite.
		`bundle exec rake spec SPEC_OPTS="--format documentation"`

3. The above command should return the result of the test suit and generate the code coverage report.
4. The code coverage report should be available at `{path_to_application_directory}/coverage/index.html`


## Testing

1. **BDD**:
- We used *Cucumber-js*, a js-based testing package, to incorporate Cucumber tests and implement BDD.
- Following the installation instructions above should ensure it is all set up
    - MacOS:
    ```
    brew install chromedriver
    ```
    - Windows:
    ```
    choco install chromedriver
    ```
    - **Note for TAs** BDD will not function as expected because of authentication. To prevent the leaking of personal information any automation regarding personal passwords was removed. All tests succeed as show in this output:
    ```
      11 scenarios (11 passed)
      30 steps (30 passed)
    ```

2. **TDD**:


## Testing results
+ Cucumber

    
+ Unit tests


## Project code:
+ A link to our github repo can be found here:

## Hosting:


