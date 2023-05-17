import {ClientFunction} from 'testcafe';

fixture('Navigation')
  .page('localhost:8100');

test('Browse->Login', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .takeScreenshot()

  await test
    .takeScreenshot()
    .click('#navBtn-anon')
    .takeScreenshot()
    .click('#navBtn-signIn')
    .takeScreenshot()
    .expect(getLocation()).contains('login')
})
test('Browse->Register', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .takeScreenshot()
    .click('#navBtn-anon')
    .takeScreenshot()
    .click('#navBtn-register')
    .takeScreenshot()
    .expect(getLocation()).contains('register')
})
test('Browse->Checkout_CHECKOUT_DENIED_LOGIN_REQUIRED', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .takeScreenshot()
    .click('#shoppingCartBtn')
    .takeScreenshot()
    .click('#shoppingCartBtn-goToCheckout')
    .takeScreenshot()
    .expect(getLocation()).contains('login')
})
test('Browse->Checkout', async test => {
  const getLocation = ClientFunction(() => document.location.href)

  await test
    .takeScreenshot()
    .click('#shoppingCartBtn')
    .takeScreenshot()
    .click('#shoppingCartBtn-goToCheckout')
    .takeScreenshot()
    .typeText('#login-email', 'john@example.com')
    .typeText('#login-password', 'pw12345')
    .takeScreenshot()
    .click('#login-loginBtn')
    .takeScreenshot()
    .click('#shoppingCartBtn')
    .takeScreenshot()
    .click('#shoppingCartBtn-goToCheckout')
    .takeScreenshot()
    .expect(getLocation()).contains('checkout')
})
