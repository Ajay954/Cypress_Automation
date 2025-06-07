
import { commonLocators as loginLocater } from "../../Objects/Locators/CommonObjects/commonLocators"
// import { CommonObjects as action} from "../../Objects/Methods/commmonMethods"
// import {Login as loginBypass} from "../../Objects/Methods/Login"

describe('Login Verification and Validation', () => {
  let loginCredentials
  let Reset
  before(function(){
    // cy.clearAllCookies()
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
    cy.getCookies().then((cookies) => {
      cookies.forEach((cookie) => {
        cy.log(`${cookie.name}: ${cookie.value}`);
      });
    });
    cy.clearAllCookies();
    cy.getCookies().then((cookies) => {
      cookies.forEach((cookie) => {
        cy.log(`${cookie.name}: ${cookie.value}`);
      });
    });
  })
  it('Enter Valid Credentials for Login and Verify Login Success', function() {
    cy.viewport(1000,600);
    Cypress.Actions.sendValueByGetPath(loginLocater.usernameGetPath,Cypress.env("USERNAME"))
    Cypress.Actions.sendValueByGetPath(loginLocater.passwordGetPath,Cypress.env("PASSWORD"))
    Cypress.Actions.clickObjectByGetPath(loginLocater.loginButtonGetPath)
    Cypress.Actions.verifyTextByGetPath(loginLocater.header6 , loginCredentials.headerAfterLogin)
  })
  it('Enter Wrong Credentials for Login and Verify Message', function() {
    cy.get(loginLocater.usernameGetPath).debug()
    Cypress.Actions.sendValueByGetPath(loginLocater.usernameGetPath,Cypress.env("USERNAME"))
    Cypress.Actions.sendValueByGetPath(loginLocater.passwordGetPath,Cypress.env("USERNAME"))
    Cypress.Actions.clickObjectByGetPath(loginLocater.loginButtonGetPath)
    Cypress.Actions.verifyTextByGetPath(loginLocater.LoginFailureAlert , loginCredentials.Invalid_Message)
  })
  it('Verify Error Message When Empty Login Credentials',function(){
    Cypress.Actions.clickObjectByGetPath(loginLocater.loginButtonGetPath)
    Cypress.Actions.verifyTextByXPath(loginLocater.usernameEmptyXpath,loginCredentials.Required)
    Cypress.Actions.verifyTextByXPath(loginLocater.passwordEmptyXpath,loginCredentials.Required)
  })
  it('Perform Forgot Password and Cancel', function() {
    Cypress.Actions.clickObjectByGetPath(loginLocater.ForgotPasswordGetPath)
    Cypress.Actions.verifyTextByGetPath(loginLocater.header6 , Reset.Reset_Password)
    Cypress.Actions.clickObjectByGetPath(loginLocater.ForgotPasswordCancelGetPath)
    Cypress.Actions.verifyTextByGetPath(loginLocater.ForgotPasswordPageHeaderGetPath,loginCredentials.Login);
  })
  it('Reset Password with Empty Field, Verify Error Message', function(){
    //Click on forget password
    Cypress.Actions.clickObjectByGetPath(loginLocater.ForgotPasswordGetPath)
    //Clicks on reset Password
    Cypress.Actions.clickObjectByGetPath(loginLocater.ResetPasswordGetPath)
    //Verify error message for dynamic locator when displayed
    cy.get(loginLocater.usernameGetPath).parent().next().should('have.text','Required').and('be.visible')
    //Click on cancel button
    Cypress.Actions.clickObjectByGetPath(loginLocater.ForgotPasswordCancelGetPath);
  })

  it('Perform Reset Password',function(){
    //Click on forget password
    Cypress.Actions.clickObjectByGetPath(loginLocater.ForgotPasswordGetPath)
    //Enter Username to Reset Password
    Cypress.Actions.sendValueByGetPath(loginLocater.EmailOnForgotPasswordGetPath,Reset.Email)
    //Clicks on reset Password
    Cypress.Actions.clickObjectByGetPath(loginLocater.ResetPasswordGetPath)
    //Verify Displayed message
    Cypress.Actions.verifyTextByGetPath(loginLocater.header6, Reset.Text1)
    Cypress.Actions.verifyIncludedTextByGetPath(loginLocater.Text, Reset.Text2)
    Cypress.Actions.verifyIncludedTextByGetPath(loginLocater.Text, Reset.Text3)
    Cypress.Actions.verifyIncludedTextByGetPath(loginLocater.Text, Reset.Note)
    Cypress.Actions.verifyIncludedTextByGetPath(loginLocater.Text, Reset.NoteText)
    cy.go(-2)
  })
  
  // it.only('Checking', function(){

  //   cy.get('.oxd-text--h5').then(($el) =>{
  //     // let myText = $el.text();
  //     cy.log('Capture Text : '+$el.text())
  //   });

  //   Cypress.login.LoginToThePage()
  //   cy.get('ul.oxd-main-menu > li').then(($el) => {
  //     let allTexts = [...$el].map(el => el.innerText);
  //     cy.log('All LI texts:', allTexts[0]);
  //     allTexts.forEach((value, text) => {
  //       cy.log("Item "+ (value) + " : " + text);
  //     });
  //   })
  // })

})

//              Verification	                                        Validation
// Definition	  Are we building the product right?	                  Are we building the right product?
// Purpose	    Ensures the product meets the design/specs	          Ensures the product meets the user needs
// Focus	      Internal consistency, completeness, and correctness	  Real-world functionality and usability
// When	        During development (before execution)	                After development (during/after execution)
// Type	        Static testing	                                      Dynamic testing
// Examples	    - Reviews                                             - Functional Testing
//              - Inspections                                         - User Acceptance Testing
//              - Walkthroughs	                                              
// Who performs	Developers, QA	                                      QA, testers, end-users