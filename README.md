
# Library Companion

This project is for local libraries that wants a smart way to reach out online.

The website helps users to browse through the libraries books, to see what is available and then to lease them - although they will have to physically go there and pick them up.


The instructions assumes that the reader has a fundamental knowledge about:

Node Package Manager (NPM). To learn more, read: https://www.npmjs.com/

Angular Framework. To learn more, read: https://angular.io/
## Authors

- [Mikkel T.](https://github.com/Theut94)
- [Tobias R.](https://github.com/TobiasEASV)
- [Simon N.](https://github.com/Tadiaki)
- [Jan W.](https://github.com/JanWohlgehagen)


# Deployment

This program is deployed here:

https://library-companion-1049c.web.app/user-dashboard/browse-books

## Local deployment

These instructions will help you to run the program locally using emulators for database, authentication and backend API.

First install the firebase CLI:

```bash
  npm install -g firebase-tools
```
Doc. reference: https://firebase.google.com/docs/cli#windows-npm

Install dependencies in path "/frontend"

```bash
  npm install
```

Install dependencies in path "/functions"

```bash
  npm install
```

Next generate environment files in path "/frontend/src":

```bash
  ng g environment
```

### Environment Variables

You will need to edit the newly generated environment files.

environment.development.ts

```ts
export const environment = {
  maps_key: "",
  api_baseURL: "http://127.0.0.1:5001/library-companion-1049c/us-central1/api/"
};
```

environment.ts

```ts
export const environment = {
  maps_key: "",
  api_baseURL: ""
};
```

Next download the emulators and initialize them from the root folder:

```bash
  firebase init emulators
```
Doc. reference: https://firebase.google.com/docs/emulator-suite/install_and_configure

To start the emulators, navigate to the root folder and run

```bash
  firebase emulators:start
```
Doc. reference: https://firebase.google.com/docs/functions/local-emulator

Then navigate to the "/frontend" folder and run

```bash
  ng serve
```

This runs the program locally using a development environment which uses firebase emulators rather than the cloud.

Finally navigate to http://localhost:4200/ to see the program.

# Running Tests
## UI tests
To run tests, navigate to "frontend/tests/ui-tests"

Open the test you want to run and change line 4 to

```bash
.page('localhost:8100');
```

Next install TestCafe globally:

```bash
npm i -g testcafe
```
Doc. reference: https://testcafe.io/documentation/402834/guides/basic-guides/install-testcafe

To run the tests:

```bash
testcafe chrome frontend/tests/ui-tests/testcafe-registration.js
testcafe chrome frontend/tests/ui-tests/testcafe-login.js
testcafe chrome frontend/tests/ui-tests/testcafe-navigation.js
```
*The TestCafe command needs to be run in a browser installed on the computer, in our case Chrome.*

Doc. Reference: https://testcafe.io/documentation/402830/guides/basic-guides/run-tests

## API tests

To run tests

First install K6 globally

```bash
npm i -g k6
```
Doc. reference: https://www.npmjs.com/package/k6

To run the tests:

```bash
k6 run -v frontend/tests/K6-tests/loadTest.js
k6 run -v frontend/tests/K6-tests/stressTest.js
k6 run -v frontend/tests/K6-tests/soakTest.js
k6 run -v frontend/tests/K6-tests/spikeTest.js
```

Doc. Reference: https://testcafe.io/documentation/402830/guides/basic-guides/run-tests
## Depricated Libraries

The application uses authguards which implements the interface CanActivate. This Library is depricates as of Angular 15, to learn more read here: https://angular.io/api/router/CanActivate
## Known Bugs *(aka features)*

There are no known bugs

## Feedback

If you have any feedback, please reach out to us at fake@fake.com

