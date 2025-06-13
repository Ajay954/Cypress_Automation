// import {commonLocators as locator} from "../Locators/CommonObjects/commonLocators"
class Actions{
    
    verifyIncludedTextByGetPath(path,text){
        cy.get(path).should("include.text",text);
    }
}
export const CommonObjects = new Actions();