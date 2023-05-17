import {ClientFunction} from 'testcafe';

fixture('User Registration')
  .page('http://localhost:8100');


test('RegisterIncorrectly_Wrong_Email_Format', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .click('body > app-root > mat-toolbar > button.mat-mdc-menu-trigger.mdc-button.mat-mdc-button.mat-unthemed.mat-mdc-button-base.ng-star-inserted')
    .click('#mat-menu-panel-2 > div > button:nth-child(2)')
    .typeText('#mat-input-0', 'John Doe')
    .typeText('#mat-input-1', '@examplecom')
    .typeText('#mat-input-2', 'pw12345')
    .typeText('#mat-input-1', 'pw12345')
    .takeScreenshot()
    .click('body > mat-card > mat-card-actions > button')
    .takeScreenshot()
    .expect(getLocation()).contains('register')
})
/*
test('RegisterIncorrectly_Wrong_Password_Confirmation', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#register-name', 'John Doe')
    .typeText('#register-email', 'John@example.com')
    .typeText('#register-password', 'pw12345')
    .typeText('#register-confirmPassword', '54321wp')
    .takeScreenshot()
    .click('#register-registerBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('register')
})

test('RegisterCorrectly', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#register-name', 'John Doe')
    .typeText('#register-email', 'John@example.com')
    .typeText('#register-password', 'pw12345')
    .typeText('#register-confirmPassword', 'pw12345')
    .takeScreenshot()
    .click('#register-registerBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('user-dashboard/browse-books')
})

 */
