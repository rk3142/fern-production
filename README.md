# FERN - FEELING BLUE? GO GREEN

# DEPLOYMENT

This README would normally document whatever steps are necessary to get the
application up and running.



* Application URL(Heroku): http://fern-environment-2.herokuapp.com/
* Code Repo URL(GitHub): https://github.com/rk3142/fern-production/tree/iteration_2
## Installation Instructions
### Clone this repo
```commandline
git clone -b iteration_2 git@github.com:rk3142/fern-production.git

```

* Versions of Package
  - Ruby: Allowed versions 2.6.6 to 2.7.0 
  - Rails: 4.2.10
  - Database: SQLite3 for development and test environment, PostgreSQL(Heroku version) for production.

# Frontend Deployment
Download .env file through our README on CourseWorks and place it under `/frontend`

### Install dependencies
Make sure you have npm installed. Then run
```commandline
cd ./fern-production/frontend
npm install
```
This downloads and sets up all the packages. Without this step the app cannot work since dependencies will not have been created correctly.

## Start the app
### `npm start`
Launches the app using localhost:3000 in a web browser

### `npm test`
Runs the unit tests. The coverage will be outputted to `/coverage` in the root of the frontend

### `npm run bdd`
Runs cucumber for BDD. Note: BDD will not function as expected due to firebase authentication. The results have been displayed below and more detailed instructions will follow later.

# Backend Deployment
Pre-requisite: Ruby v2.6.6 or v2.6.8  and SQLLite should be installed in the system

### Setting up your DEVELOPMENT environment
1. Install Bundle
`gem install bundle`
2. Checkout the code from the git repo and follow the below steps

`cd fern-production/backend/`\
`bundle install --without production --path vendor/` \
`bundle exec rake db:migrate RAILS_ENV=development`\
`bundle exec rake db:seed RAILS_ENV=development`

3. Run the rails server
`bundle exec rails s -b 0.0.0.0 -p 3000`  
  
  <br/>
  <br/>

### Setting up your TEST environment

1. Install Bundle
`gem install bundle`
2. Checkout the code from the git repo and follow the below steps

`cd fern-production/backend/` \
`bundle install --without production --path vendor/` \
`bundle exec rake db:migrate RAILS_ENV=test`\
`bundle exec rake db:seed RAILS_ENV=test`


# Runing rails RSPEC cases
1. Follow the steps in the section SETTING UP YOUR TEST ENVIRONMENT to create the test environment.
2. Run the below command to run the test suite.
		`bundle exec rake spec SPEC_OPTS="--format documentation"`

3. The above command should return the result of the test suit and generate the code coverage report.
4. The code coverage report should be available at `{path_to_application_directory}/coverage/index.html`


# Testing the frontend
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
      20 scenarios (20 passed)
      55 steps (55 passed)
    ```
    To run the tests, some code must be hacked to bypass firebase auth (cucumber doesn't support mocking so bypassing is the best option.) Here are the steps:
    - Start the server `npm start`
    - Login using the google authentication using your email and wait to be on the catalog screen
    - Inspect the page (inspect elements for windows) and click on the `<<` to see more optionss. Within the dropdown click on application
    - On the left of the sidebar click on the option below localStorage to see current storage state. Copy the value stored with the key `auth_token`
    - In stepdefs.js delete the existing token in auth_token and replace it with the copied value.
    - Save the file
    - Create a new console window and cd into the frontend directory again. Do `npm run bdd` and the cucumber tests will run.
    - Note for the TA: The creation of the auth_token constant is to ensure that the bdd can bypass the auth. Cucumber doesn’t encourage mocking so to prevent us from sharing email passwords we decided to add this shortcut for testing.

2. **TDD**:
- We used *jest* for unit testing 
- Each <name>.js file is accompanied by the corresponding <name>.test.js file
- After runinng `npm test` in the frontend directory, the coverage will be available at `frontend/coverage/lcov-report/index.html`
	
3. **Coverage Reports**
- Frontend
  - ![alt text](https://github.com/rk3142/fern-production/blob/iteration_2/BDD.png)
  - ![alt text](https://github.com/rk3142/fern-production/blob/iteration_2/frontend_coverage.png)
- Backend
  - ![alt text](https://github.com/rk3142/fern-production/blob/iteration_2/backend_coverage.png)
