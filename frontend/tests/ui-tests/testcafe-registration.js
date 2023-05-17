import {ClientFunction} from 'testcafe';

fixture('User Registration')
  .page('localhost:8100/register');

test('RegisterIncorrectly_Wrong_Email_Format', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .takeScreenshot()
    .expect(getLocation()).contains('register')
})

test('RegisterIncorrectly_Wrong_Email_Format', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#register-name', 'John Doe')
    .typeText('#register-email', '@examplecom')
    .typeText('#register-password', 'pw12345')
    .typeText('#register-confirmPassword', 'pw12345')
    .takeScreenshot()
    .click('#register-registerBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('register')
})
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
