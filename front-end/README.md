# Fern
## UNIs
- Rishav Kumar: 	rk3142
- Eurey Noguchi: 	yn2377
- Aum Upadhay: 	adu2104
- Hao Zhou: 	hz2754

## Installation Instructions
### Clone this repo
```commandline
git clone git@github.com:eureyuri/fern-frontend.git
```

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

