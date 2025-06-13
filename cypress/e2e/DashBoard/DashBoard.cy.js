import { DBLocators } from "../../Objects/Locators/DashBoardLocators"
import { commonLocators as Locator } from "../../Objects/Locators/commonLocators"
import { TimeLocators as Timesheet} from "../../Objects/Locators/TimeTabLocators"

describe('Dashboard Time Entry',()=>{
    let TimeEntry = 'DashBoard/TimeEntry'
    let DashBoard = 'DashBoard/DashBoardTimeTracker'
    let TimeEntryTexts
    let DashBoardTexts
    before(()=>{
        cy.fixture(TimeEntry).then((data)=>{
            TimeEntryTexts = data;  
        })
        cy.fixture(DashBoard).then((data)=>{
            DashBoardTexts = data;
        })
    })
    beforeEach(()=>{
        cy.visit("/")
        cy.Login()
    })
    it('Verify the Time Entry section',function(){
        cy.VerifyWithRetrievedText(DBLocators.SectionsHeader,DashBoardTexts.DashboardSection1)

        //verify profile missing
        cy.ElementVisible(DBLocators.ImageProfile)
        
        //verify Puched Out text
        cy.VerifyContainsText(DBLocators.PunchInorOut,DashBoardTexts.PunchedOut)
        
        //Verify text in Today Banner
        cy.VerifyContainsText(DBLocators.TodayTime,DashBoardTexts.Today)
        cy.VerifyContainsText(DBLocators.TodayTime,DashBoardTexts.HourTextH)
        cy.VerifyContainsText(DBLocators.TodayTime,DashBoardTexts.MinuteTextM)

        //clock is present in Today banner
        cy.ElementVisible(DBLocators.WatchIconInTodayDate)

        //Verify This week text
        cy.VerifyContainsText(DBLocators.WeekText,DashBoardTexts.ThisWeekText)

        //Entire week punch in and punch out time, with clock icon
        cy.ElementVisible(DBLocators.WatchIconInWeek)
        cy.VerifyContainsText(DBLocators.WeekTime,DashBoardTexts.HourTextH)
        cy.VerifyContainsText(DBLocators.WeekTime,DashBoardTexts.MinuteTextM)

        //Week Graph Image present
        cy.ElementVisible(DBLocators.WeekGraph)
    })

    it('Click WatchIcon In DashBoard, Add Punch-In Punch-Out',function(){

        
        //Click watch icon and verify the redirection
        cy.ForceClick(DBLocators.WatchIconInTodayDate)
        cy.VerifyContainsText(Locator.header6,TimeEntryTexts.AttendanceText)
        cy.VerifyContainsText(Locator.header6,TimeEntryTexts.PunchText)

        //Check any Punch In and Out record
        cy.ClickAnElementFromList(Timesheet.MenuDropdowns,TimeEntryTexts.SelectPunchInOutFromListOfOption)
        cy.ClickAnElementFromList(Timesheet.DropdownOption,TimeEntryTexts.SelectMyRecordsFromListOfOption)
        
        //Delete existing Punch In records
        cy.DeletePunchInRecordsForToday()

        //Redirect to PunchIn page
        cy.ClickAnElementFromList(Timesheet.MenuDropdowns,TimeEntryTexts.SelectPunchInOutFromListOfOption)
        cy.ClickAnElementFromList(Timesheet.DropdownOption,TimeEntryTexts.SelectPunchInOutFromListOfOption)

        // Punch In time clock click, Hour set, AM select and In button click
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.AM,TimeEntryTexts.PunchIn)
        
        // Punch Out time clock click, Hour set, AM select and In button click
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.PM,TimeEntryTexts.PunchOut)
        // cy.AddPunchInPunchOut("06","00","PM","PunchOut")

        //Navigate to Dashboard and click verify the today's time
        cy.LocateWithPathAndContainToPerformClick(Locator.LeftPanel,DashBoardTexts.Dashboard)
        cy.VerifyContainsText(DBLocators.TodayTime,TimeEntryTexts.Time.Total)

    })

    it("Verify Today's Time Less Than Total Time",function(){

        cy.PresentWeekStartAndEndAlias(TimeEntryTexts.ProvideAlias.Start,TimeEntryTexts.ProvideAlias.End)

        //Click on clock
        cy.ForceClick(DBLocators.WatchIconInTodayDate)
        
        //Check existing records of any Punch In and Out of monday and sunday
        cy.ClickAnElementFromList(Timesheet.MenuDropdowns,TimeEntryTexts.SelectPunchInOutFromListOfOption)
        cy.ClickAnElementFromList(Timesheet.DropdownOption,TimeEntryTexts.SelectMyRecordsFromListOfOption)


        //Enter the date and delete any existing records
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.Start)
        // })

        cy.Click(Timesheet.SubmitButton)


        //Delete existing Punch In records
        cy.DeletePunchInRecordsForToday()

        //Enter the dateagain and delete the records
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.End)        

        cy.Click(Timesheet.SubmitButton)

        //Delete existing Punch In records
        cy.DeletePunchInRecordsForToday()

        //Add Punch In and Out entries for monday and sunday
        cy.ClickAnElementFromList(Timesheet.MenuDropdowns,TimeEntryTexts.SelectPunchInOutFromListOfOption)
        cy.ClickAnElementFromList(Timesheet.DropdownOption,TimeEntryTexts.SelectPunchInOutFromListOfOption)

        //Enter date and Punch In and Out 
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.Start)

        //Set time and PunchIn/PunchOut
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.AM,TimeEntryTexts.PunchIn)
        
        //Enter date and Punch In and Out 
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.Start)

        // Punch Out time clock click, Hour set, AM select and In button click
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.PM,TimeEntryTexts.PunchOut)

        //Enter date and Punch In and Out 
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.End)

        //Set time and PunchIn/PunchOut
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.AM,TimeEntryTexts.PunchIn)
        
        //Enter date and Punch In and Out 
        cy.PassAliasToSendValue(Timesheet.DateLocatorForTimesheet,TimeEntryTexts.RetrieveFromAlias.End)

        // Punch Out time clock click, Hour set, AM select and In button click
        cy.AddPunchInPunchOut(TimeEntryTexts.Time.H,TimeEntryTexts.Time.M,TimeEntryTexts.Time.PM,TimeEntryTexts.PunchOut)
        
        //Navigate to Dashboard and click verify the today's time
        cy.LocateWithPathAndContainToPerformClick(Locator.LeftPanel,DashBoardTexts.Dashboard)

        //Verify Total time with Today time
        cy.VerifyTotalTimeAndTodayTime()
        
    })
})