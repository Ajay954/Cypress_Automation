describe('template spec', () => {
  beforeEach(function(){
    cy.fixture('example').then((data) => {
      this.data = data
    })
  })
  it('First Test', function() {
    // cy.visit('https://example.cypress.io')
      // this.data=data
    // cy.visit("/")
    // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(Cypress.env('USERNAME'));
    // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(Cypress.env('PASSWORD'));
    // cy.get('.wp-block-image > a').invoke('removeAttr','target').click();
    // cy.go('back')
    // // cy.fixture('example').then(function(data){
    // cy.get('.s').type(this.data.FirstTest.email)
    // // })
    // cy.go('back')
    // cy.get('#footer').contains('a','UI Testings').click();
    // cy.fixture('example').then(function(data){
    // cy.get('.s').type(data.email)
    
    // })
  })
})