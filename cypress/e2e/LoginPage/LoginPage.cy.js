
import { commonLocators as loginLocator } from "../../Objects/Locators/commonLocators"
// import { CommonObjects as action} from "../../Objects/Methods/commmonMethods"
// import {Login as loginBypass} from "../../Objects/Methods/Login"

describe('Login Verification and Validation', () => {
  let loginCredentials
  let Reset
  before(function(){
    cy.fixture('LoginPage/Login').then((data) => {
      loginCredentials = data;
    })
    cy.fixture('LoginPage/Reset').then((data) => {
      Reset = data;
    })
  })
  beforeEach(function(){
    cy.visit("/")
  })
  after(function(){
    cy.clearAllCookies();
  })
  it('Enter Valid Credentials for Login and Verify Login Success', function() {
    cy.viewport(1000,600);
    cy.TypeValue(loginLocator.loginUsername,Cypress.env("USERNAME"))
    cy.TypeValue(loginLocator.loginPassword,Cypress.env("PASSWORD"))
    cy.Click(loginLocator.loginButton)
    cy.VerifyHaveText(loginLocator.header6 , loginCredentials.headerAfterLogin)
  })
  it('Enter Wrong Credentials for Login and Verify Message', function() {
    // cy.get(loginLocator.username).debug()
    cy.TypeValue(loginLocator.loginUsername,Cypress.env("USERNAME"))
    cy.TypeValue(loginLocator.loginPassword,Cypress.env("USERNAME"))
    cy.Click(loginLocator.loginButton)
    cy.VerifyContainsText(loginLocator.LoginFailureAlert , loginCredentials.Invalid_Message)
  })
  it('Verify Error Message When Empty Login Credentials',function(){
    cy.Click(loginLocator.loginButton)
    cy.VerifyHaveText(loginLocator.usernameRequired,loginCredentials.Required)
    cy.VerifyHaveText(loginLocator.passwordRequired,loginCredentials.Required)
  })
  it('Perform Forgot Password and Cancel', function() {
    cy.Click(loginLocator.ForgotPassword)
    cy.VerifyHaveText(loginLocator.header6 , Reset.Reset_Password)
    cy.Click(loginLocator.ForgotPasswordCancel)
    cy.VerifyHaveText(loginLocator.ForgotPasswordPageHeader,loginCredentials.Login);
  })
  it('Reset Password with Empty Field, Verify Error Message', function(){
    //Click on forget password
    cy.Click(loginLocator.ForgotPassword)
    //Clicks on reset Password
    cy.Click(loginLocator.ResetPassword)
    //Verify error message for dynamic locator when displayed
    cy.get(loginLocator.loginUsername).parent().next().should('have.text',loginCredentials.Required).and('be.visible')
    //Click on cancel button
    cy.Click(loginLocator.ForgotPasswordCancel);
  })

  it('Perform Reset Password',function(){
    //Click on forget password
    cy.Click(loginLocator.ForgotPassword)
    //Enter Username to Reset Password
    cy.TypeValue(loginLocator.EmailOnForgotPassword,Reset.Email)
    //Clicks on reset Password
    cy.Click(loginLocator.ResetPassword)
    //Verify Displayed message
    cy.VerifyHaveText(loginLocator.header6, Reset.Text1)
    cy.VerifyContainsText(loginLocator.Text, Reset.Text2)
    cy.VerifyContainsText(loginLocator.Text, Reset.Text3)
    cy.VerifyContainsText(loginLocator.Text, Reset.Note)
    cy.VerifyContainsText(loginLocator.Text, Reset.NoteText)
    cy.go(-2)
    // cy.Login()
  })

})
