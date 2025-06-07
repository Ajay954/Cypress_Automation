class Actions{
    sendValueByGetPath(path, value){
        cy.get(path).clear().type(value);
    }
    clickObjectByGetPath(path){
        cy.get(path).click();
    }
    verifyTextByGetPath(path,text){
        cy.get(path).should("have.text",text);
    }
    verifyTextByXPath(path,text){
        cy.xpath(path).should("have.text",text);
    }
    verifyIncludedTextByGetPath(path,text){
        cy.get(path).should("include.text",text);
    }
}
export const CommonObjects = new Actions();