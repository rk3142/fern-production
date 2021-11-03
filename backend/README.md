# DEPLOYMENT

This README would normally document whatever steps are necessary to get the
application up and running.

* Application URL(Heroku): https://fern-development.herokuapp.com/

* Versions of Package
  - Ruby: Allowed versions 2.6.6 to 2.7.0 
  - Rails: 4.2.10
  - Database: SQLite3 for development and test environment, PostgreSQL(Heroku version) for production.

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


