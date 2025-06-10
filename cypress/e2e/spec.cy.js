describe('template spec', () => {
  beforeEach(function(){
    cy.fixture('example').then((data) => {
      this.data = data
    })
  })
  it('First Test', function() {


    cy.visit('https://testautomationpractice.blogspot.com/').then(()=>{
      return cy.get('h1')
    })
    cy.get('[name="BookTable"] tr td').each(($ele,index)=>{
      const t = $ele.text()
      cy.log(index)
      cy.log($ele)
      // expect(t).to.contains(2000)
      // cy.log($list)
      if(t==2000)
          return;
      cy.log(t)
    })
    // cy.visit("https://www.tutorialspoint.com/selenium/practice/radio-button.php")
    // cy.visit("https://the-internet.herokuapp.com/javascript_alerts")
    // cy.get('#c_io_2').should('not.be.checked').check({force:true}).should('be.checked');
    // cy.get('[onclick="show2();"]').check()
    // cy.get('[onclick="show2();"]').uncheck()
    // cy.get('.plus').eq(1).click();
    // cy.get('#c_io_2',{timeout:6000}).check()
    // cy.get('#c_bf_1').check('Last level 1');


  })
})