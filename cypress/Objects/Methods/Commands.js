import {commonLocators as locator} from "../Locators/commonLocators"
Cypress.Commands.add('TypeValue',(path,value)=>{
    if(path[0]=='/'){
        return cy.xpath(path).type(value)
    }
    cy.get(path).type(value)
})

Cypress.Commands.add('Click',(path)=>{
    if(path[0]=='/'){
        return cy.xpath(path).click()
    }
    cy.get(path).click()
})

Cypress.Commands.add('ForceClick',(path)=>{
    if(path[0]=='/'){
        return cy.xpath(path).click({force:true})
    }
    cy.get(path).click({force:true})
})

Cypress.Commands.add('VerifyHaveText',(path,value)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('have.text',value)
    cy.get(path).should('have.text',value)
})


Cypress.Commands.add('VerifyContainsText',(path,value)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('contain',value)
    cy.get(path).should('contain',value)
})


Cypress.Commands.add('VerifyNotHaveText',(path,value)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('not.have.text',value)
    cy.get(path).should('not.have.text',value)
})


Cypress.Commands.add('VerifyNotContainsText',(path,value)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('not.contain',value)
    cy.get(path).should('not.contain',value)
})

Cypress.Commands.add('Login', function(){
    cy.get(locator.loginUsername).type(Cypress.env("USERNAME"))
    cy.get(locator.loginPassword).type(Cypress.env("PASSWORD"))
    cy.get(locator.loginButton).click()
})

Cypress.Commands.add('ElementVisible',(path)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('be.visible')
    cy.get(path).should('be.visible')
})

Cypress.Commands.add('NoElementVisible',(path)=>{
    if(path[0]=='/')
        return cy.xpath(path).should('not.be.visible')
    cy.get(path).should('not.be.visible')
})

Cypress.Commands.add('VerifyWithRetrievedText',function(path,value){
    if(path[0]=='/'){
        cy.xpath(path).then(($ele)=>{
            const t=$ele.text()
            expect(t).to.contain(value)
        })
    }
    cy.get(path).then(function($ele){
        const t=$ele.text()
        expect(t).to.contain(value)
    })
})

Cypress.Commands.add('LocateWithPathAndContainToPerformClick',function(path,containValue){
    if(path[0]=='/')
        cy.xpath(path).contains(containValue).click()
    cy.get(path).contains(containValue).click()
})

Cypress.Commands.add('ClickAnElementFromList',function(path,item){
    if(path[0]=='/'){
        cy.xpath(path).eq(item).click()
    }
    cy.get(path).eq(item).click()
})