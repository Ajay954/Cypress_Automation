import { commonLocators as login } from "../../Objects/Locators/CommonObjects/commonLocators"
import { CommonObjects as action} from "../../Objects/Methods/commmonMethods"
import {Login as loginBypass} from "../../Objects/Methods/Login"
require('cypress-xpath')

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
    // cy.getCookies().then((cookies) => {
    //   cookies.forEach((cookie) => {
    //     cy.log(`${cookie.name}: ${cookie.value}`);
    //   });
    // });
  })
  after(function(){
    // cy.getCookies().then((cookies) => {
    //   cookies.forEach((cookie) => {
    //     cy.log(`${cookie.name}: ${cookie.value}`);
    //   });
    // });
  })
  it('Enter Valid Credentials for Login and Verify Login Success', function() {
    cy.viewport(1000,600);
    action.sendValueByGetPath(login.usernameGetPath,Cypress.env("USERNAME"))
    action.sendValueByGetPath(login.passwordGetPath,Cypress.env("PASSWORD"))
    action.clickObjectByGetPath(login.loginButtonGetPath)
    action.verifyTextByGetPath(login.header6 , loginCredentials.headerAfterLogin)
  })
  it('Enter Wrong Credentials for Login and Verify Message', function() {
    cy.get(login.usernameGetPath).debug()
    action.sendValueByGetPath(login.usernameGetPath,Cypress.env("USERNAME"))
    action.sendValueByGetPath(login.passwordGetPath,Cypress.env("USERNAME"))
    action.clickObjectByGetPath(login.loginButtonGetPath)
    action.verifyTextByGetPath(login.LoginFailureAlert , loginCredentials.Invalid_Message)
  })
  it('Verify Error Message When Empty Login Credentials',function(){
    action.clickObjectByGetPath(login.loginButtonGetPath)
    action.verifyTextByXPath(login.usernameEmptyXpath,loginCredentials.Required)
    action.verifyTextByXPath(login.passwordEmptyXpath,loginCredentials.Required)
  })
  it('Perform Forgot Password and Cancel', function() {
    action.clickObjectByGetPath(login.ForgotPasswordGetPath)
    action.verifyTextByGetPath(login.header6 , Reset.Reset_Password)
    action.clickObjectByGetPath(login.ForgotPasswordCancelGetPath)
    cy.get(".oxd-text--h5").should('have.text',loginCredentials.Login)
  })
  it('Reset Password with Empty Field, Verify Error Message', function(){
    //Click on forget password
    cy.get(".orangehrm-login-forgot").click();
    //Clicks on reset Password
    cy.get(".oxd-button--secondary").click();
    //Verify error message displayed
    cy.get('[name="username"]').parent().next().should('have.text','Required').and('be.visible')
    //Click on cancel button
    cy.get(".oxd-button--ghost").click()
  })

  it('Perform Reset Password',function(){
    //Click on forget password
    cy.get(".orangehrm-login-forgot").click()
    //Enter Username to Reset Password
    cy.get(".oxd-input").clear().type("Abcdefghij123456789")
    //Clicks on reset Password
    cy.get(".oxd-button--secondary").click()
    //Verify Displayed message
    cy.get("h6").should("include.text",Reset.Text1)
    cy.get("p").should("include.text",Reset.Text2)
    cy.get("p").should("include.text",Reset.Text3)
    cy.get("p").should("include.text",Reset.Note)
    cy.get("p").should("include.text",Reset.NoteText)
    cy.go(-2)
  })
  
  it.only('Checking', function(){

    cy.get('.oxd-text--h5').then(($el) =>{
      // let myText = $el.text();
      cy.log('Capture Text : '+$el.text())
    });
    // console.log(cy.title())

    loginBypass.LoginToThePage()
    // cy.get("li").eq(1).as('parent');
    // cy.get("@parent").should('contain','PIM')
    cy.get('ul.oxd-main-menu > li').then(($el) => {
      let allTexts = [...$el].map(el => el.innerText);
      cy.log('All LI texts:', allTexts[0]);
      allTexts.forEach((value, text) => {
        cy.log("Item "+ (value) + " : " + text);
      });
    })
    // //Click on forget password
    // cy.get(".orangehrm-login-forgot").click();
    // //Clicks on reset Password
    // cy.get(".oxd-button--secondary").click();
    // //Verify error message displayed
    // cy.xpath('//*[@name="username"]/parent::div/following-sibling::span').should('have.text','Required').and('be.visible')
    //Click on cancel button
    // cy.get(".oxd-button--ghost").click()
  })

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