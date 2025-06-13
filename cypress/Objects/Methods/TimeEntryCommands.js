// import {commonLocators as locator} from "../Locators/commonLocators"
import {DBLocators} from "../Locators/DashBoardLocators"
import { TimeLocators } from "../../Objects/Locators/TimeTabLocators"

Cypress.Commands.add('DeletePunchInRecordsForToday',()=>{
    cy.get(TimeLocators.PunchRecordMessage).then(function($ele){
        const hasText = $ele.text().includes("No")
        if(!hasText){
            cy.get(TimeLocators.PunchRecordList).each(function(){
                cy.get(TimeLocators.PunchDeleteButton).eq(0).click();
                cy.contains(TimeLocators.DeletePopUpText).click();
                cy.contains("Success").should('be.visible')
            })
        }
    })
})

Cypress.Commands.add('AddPunchInPunchOut',(Hour,Minute,Meridiem,Punch)=>{
    cy.get(TimeLocators.ClockForPunchInorOut).click()
    cy.get(TimeLocators.PunchHourInput).clear().type(Hour)
    cy.get(TimeLocators.PunchMinuteInput).clear().type(Minute)
    cy.get('[value="'+Meridiem+'"]').click()
    cy.get(TimeLocators.SubmitButton).click()
    if(Punch=="Punch In"){
        cy.contains("Punch Out").should('be.visible')
        return
    }
    cy.contains("Punch In").should('be.visible')
})

Cypress.Commands.add('PresentWeekStartAndEndAlias',(Start,End)=>{
    cy.get(DBLocators.PresentWeek).then(function($ele){
        const text = $ele.text().split(" ")

        let outMonth,inMonth
            
        const date = new Date()
        const today = date.getDate()
        const currentMonth = date.getMonth()
        const year = date.getFullYear()

        inMonth = today>=parseInt(text[1]) ? currentMonth+1:currentMonth
        outMonth = parseInt(text[4])<parseInt(text[1]) ? inMonth+1:inMonth

        cy.wrap(year+"-"+parseInt(text[1])+"-"+inMonth).as(Start)
        cy.wrap(year+"-"+parseInt(text[4])+"-"+outMonth).as(End)
    })
})

Cypress.Commands.add('PassAliasToSendValue',function(path,Alias){
    cy.get(Alias).then((val)=>{
        if(path[0]=='/'){
            cy.xpath(path).clear()
            cy.xpath(path).type(val)
        }
        cy.get(path).clear()
        cy.get(path).type(val)
    })
})

Cypress.Commands.add('VerifyTotalTimeAndTodayTime',()=>{
    cy.get(DBLocators.TodayHour).then(($el)=>{
        var t=$el.text()
        const hour = parseInt(t.slice(0,t.length-1))
        cy.get(DBLocators.FullWeekTime).eq(1).then(($ele)=>{
            t = $ele.text()
            var text = t.split(" ")
            var Totalhour = parseInt(text[0].slice(0,text[0].length-1))
            cy.log(hour+" "+Totalhour)
            expect(hour).to.be.lessThan(Totalhour)
        })
    })
})
