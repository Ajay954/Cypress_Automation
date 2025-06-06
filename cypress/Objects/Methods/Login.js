import {commonLocators as locator} from "../Locators/CommonObjects/commonLocators"
class LoginMethods{
    LoginToThePage(){
        cy.get(locator.usernameGetPath).type(Cypress.env("USERNAME"))
        cy.get(locator.passwordGetPath).type(Cypress.env("PASSWORD"))
        cy.get(locator.loginButtonGetPath).click()
    }
}
export const Login = new LoginMethods