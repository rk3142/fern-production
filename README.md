## UNIs
Rishav Kumar: 	rk3142
Eurey Noguchi: 	yn2377
Aum Upadhay: 	adu2104
Hao Zhou: 	hz2754

## Installation Instructions

Firstly, clone the repo and ensure that you have the prerequisites for ReactJS installed. Please follow this link if you do not: https://www.freecodecamp.org/news/install-react-with-create-react-app/. Also make sure you have yarn and npm installed.

### `cd ./fern-frontend` and `yarn`

This downloads and sets up all the packages. Without this step the app cannot work since dependencies will not have been created correctly.

### `yarn start`

Launches the app using localhost:3000 in a web browser

### `npm test -- --coverage` or `npm run bdd`

These commands run the tests. Note: BDD will not function as expected due to firebase authentication. The results have been displayed below.

## Testing

1. **BDD**:
- We used *Cucumber-js*, a js-based testing package, to incorporate Cucumber tests and implement BDD.
- Following the installaiton instructions above should ensure it is all set up
    
    ```
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

