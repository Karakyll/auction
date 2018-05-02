import { SignUpPage } from './signup.po';
import {element, by, protractor} from 'protractor';

describe('Sign up page: ', () => {
  let page: SignUpPage;

  beforeEach(() => {
    page = new SignUpPage();
  });

  it('Sign up form must be appeared after load page', () => {
    page.navigateTo();
    expect(element(by.id("signDiv")).isDisplayed).toBeTruthy("Form enabled");
  });

  it('Success message must be hidden after load page', () => {
    expect(element(by.id("successMess")).isPresent()).toBeFalsy("Success message hidden");
  });

  it('Button should be disabled before valid data input', () => {
    expect(element(by.id("buttonSignUp")).isEnabled()).toBeFalsy("Button disabled");
  });

  it('Warning messages must be hidden after page loaded', () => {
    expect(element(by.id("usernameWarning")).isDisplayed()).toBeFalsy("Username warning hidden");
    expect(element(by.id("usernameFailed")).isDisplayed()).toBeFalsy("User exist warning hidden");
    expect(element(by.id("passwordWarning")).isDisplayed()).toBeFalsy("Password warning hidden");
    expect(element(by.id("confirmWarning")).isDisplayed()).toBeFalsy("Confirm password warning hidden");
  });

  it('Username warning messages must appear after invalid input', () => {
    expect(element(by.id("usernameWarning")).isDisplayed()).toBeFalsy("Username warning hidden before actions");
    element(by.id("username")).sendKeys("q");
    element(by.id("username")).sendKeys(protractor.Key.BACK_SPACE);
    expect(element(by.id("usernameWarning")).isDisplayed()).toBeTruthy("Username warning appear after actions");
  });

  it('Password warning messages must appear after invalid input', () => {
    expect(element(by.id("passwordWarning")).isDisplayed()).toBeFalsy("Password warning hidden before actions");
    element(by.id("password")).sendKeys("q");
    element(by.id("password")).sendKeys(protractor.Key.BACK_SPACE);
    expect(element(by.id("passwordWarning")).isDisplayed()).toBeTruthy("Password warning appear after actions");
  });

  it('Confirm warning message must appear when passwords differ', () => {
    expect(element(by.id("confirmWarning")).isDisplayed()).toBeFalsy("Confirm password warning hidden before actions");
    element(by.id("password")).sendKeys("q");
    element(by.id("confirm")).sendKeys("w");
    expect(element(by.id("confirmWarning")).isDisplayed()).toBeTruthy("Confirm password warning appear when passwords differ");
  });

  it('User exist message', () => {
    element(by.id("username")).clear();
    element(by.id("password")).clear();
    element(by.id("confirm")).clear();
    element(by.id("username")).sendKeys("user");
    element(by.id("password")).sendKeys("q");
    element(by.id("confirm")).sendKeys("q");
    element(by.id("buttonSignUp")).click();
    expect(element(by.id("usernameFailed")).isDisplayed()).toBeTruthy("User exist warning appear");
  });

});
