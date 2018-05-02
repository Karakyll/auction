import { browser, by, element } from 'protractor';

export class SignUpPage {
  navigateTo() {
    return browser.get('/signup');
  }

}
