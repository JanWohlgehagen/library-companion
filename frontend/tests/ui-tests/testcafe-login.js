import {ClientFunction} from 'testcafe';

fixture('User Registration')
  .page('localhost:4200/login');

test('LoginIncorrectly_Wrong_Email', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#login-email', 'joh@example.com')
    .typeText('#login-password', 'pw12345')
    .takeScreenshot()
    .click('#login-loginBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('login')
})
test('LoginIncorrectly_Wrong_Password', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#login-email', 'john@example.com')
    .typeText('#login-password', 'p12345')
    .takeScreenshot()
    .click('#login-loginBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('login')
})
test('LoginCorrectly', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .typeText('#login-email', 'john@example.com')
    .typeText('#login-password', 'pw12345')
    .takeScreenshot()
    .click('#login-loginBtn')
    .takeScreenshot()
    .expect(getLocation()).contains('user-dashboard/browse-books')
})
