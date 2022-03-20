import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { AttendanceCalendarSessionService } from './attendance-calendar-session.service';
import { AttendanceCalendarService } from './attendance-calendar.service';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.css']
})
export class AttendanceCalendarComponent implements OnInit {
  inputDisabled: boolean = false;
  displayBasic: boolean = false;
  holidayModal: boolean = false;
  calendarSessionModal: boolean = false;
  sessionHeader: any;
  collapsed = true;
  collapsedSessionList = false;
  header: any = "New Calendar Session";
  showBasicDialog() {
    this.header = "New Calendar";
    this.displayBasic = true;

    this.resetForm();
  }
  showAttendanceSessionDialog() {
    this.calendarSessionModal = true;
    this.sessionHeader = "New Calendar Session";
    this.inputDisabled = false;
    this.resetCalendarSessionForm();
  }
  AttCalendars: any[];
  selectedAttCalendars: any;
  AttCalendarSession: any[];
  selectedAttCalendarSession: any;
  calendarDP: any[];
  selectedCalendarDP: any;
  calendarForm: any;
  calendarSessionForm: any;
  holidays: any[];
  holidayDataSources: any[] = [];
  holidayListChecked: any[] = [];
  selectedHolidayDP: any[] = [];
  rowData: any;
  nodeSelected: boolean = false;
  rowSessionData: any;
  nodeSessionSelected: boolean = false;
  isAttCalendarEdit: boolean = false;
  isAttCalendarSessionEdit: boolean = false;
  // for delete data modal
  display: boolean = false;
  displaySession: boolean = false;
  displayCopy: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }

  showDialogForSession() {
    if (this.rowSessionData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.displaySession = true;
  }
  showDialogForCopy() {
    if (this.rowSessionData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.displayCopy = true;
  }
  months: any;
  days: any;

  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private AttendanceCalendarService: AttendanceCalendarService, private AttendanceCalendarSessionService: AttendanceCalendarSessionService) { }

  ngOnInit() {
    this.calendarForm = this.formbulider.group({
      attendance_calendar_name: [null, [Validators.required]],
      remarks: [null, [Validators.required]],
    });
    this.calendarSessionForm = this.formbulider.group({
      attendance_calendar_id: [null, [Validators.required]],
      holiday: [null, [Validators.required]],
      holiday_start_date: ['', [Validators.required]],
      holiday_end_date: ['', [Validators.required]],
      session_start_date: ['', [Validators.required]],
      session_end_date: ['', [Validators.required]],
      session_name: ['', [Validators.required]],
    });

    
    this.loadAllCalendars();
    this.loadAllCalendarSession();
    this.loadAttendanceCalendarDP();
    this.loadHolidayDP();
  }
  onRowSelect(event) {

    this.nodeSelected = true;
    this.rowData = event.data;
   
  }
  onRowUnselect(event) {

    this.nodeSelected = false;
    this.rowData = null;

  }
  onDateChange(a) {
    let year = a.getFullYear();
    this.calendarSessionForm.controls['session_name'].setValue(year.toString());
  }
  onSessionRowSelect(event) {

    this.nodeSessionSelected = true;
    this.rowSessionData = event.data;
   
  }
  onSessionRowUnselect(event) {

    this.nodeSessionSelected = false;
    this.rowSessionData = null;

  }

 
  loadHolidayDP() {

    this.AttendanceCalendarSessionService.getAllHoliday().subscribe(data => {

      this.holidays = data;


    });

  }
  okButton() {
    this.holidayDataSources = this.holidayListChecked;
    this.holidayModal = false
    this.holidayListChecked = [];
  }
  onCheckboxChange(event, holiday_id, holiday_name, days_of_month) {
   
    const holidayobj = { holiday_id: holiday_id, holiday_name: holiday_name, days_of_month: days_of_month }
   
    if (event.checked) {
      if (this.dataExist(holiday_id)) {
        return this.notifyService.ShowNotification(2, "This holiday already added")
      }
     

      this.holidayListChecked.push(holidayobj);
    }
    else {
      //this.holidayListChecked.pop(holidayobj);
    }
  }

  addHolidayInfo() {
    let holiday = this.calendarSessionForm.get('holiday')?.value;
    let session_start_date = this.calendarSessionForm.get('holiday_start_date')?.value;
    let session_end_date = this.calendarSessionForm.get('holiday_end_date')?.value;
    let att_session_start_date = this.calendarSessionForm.get('session_start_date')?.value;
    let att_session_end_date = this.calendarSessionForm.get('session_end_date')?.value;
    let holiday_id = holiday.holiday_id;
    let holiday_name = holiday.holiday_name;
    if (!holiday_id) {
      return this.notifyService.ShowNotification(2, "Please select Holiday");
    }
    if (!session_start_date) {
      return this.notifyService.ShowNotification(2, "Please select holiday start date");
    }
    if (!session_end_date) {
      return this.notifyService.ShowNotification(2, "Please select holiday end date");
    }
    if (this.dateValidationCheck(session_start_date, session_end_date)) {
      return this.notifyService.ShowNotification(2, "End date must be greater than start date");
    }
    if (session_start_date < att_session_start_date || session_end_date > att_session_end_date )
    {
      return this.notifyService.ShowNotification(2, "Holiday date must be in callendar session range");
    }
    const holidayobj = {
      holiday_id: holiday_id,
      holiday_name: holiday_name,
      session_start_date_str: this.formatDate(session_start_date),
      session_end_date_str: this.formatDate(session_end_date),
      session_start_date: new Date((session_start_date)).toLocaleString(),
      session_end_date: new Date((session_end_date)).toLocaleString(),
    }

    if (this.isAttCalendarSessionEdit) {
      let acs_id = this.rowSessionData.AcsId;


      if (this.dataExist(holiday_id)) {
        return this.notifyService.ShowNotification(2, "This holiday already added")
      }

      this.AttendanceCalendarSessionService.addHolidayForSessionUpdate(acs_id, holiday_id, session_start_date, session_end_date).subscribe(data => {

        if (data.MessageType == 1) {
          this.AttendanceCalendarSessionService.getCalendarHolidaySessionById(acs_id).subscribe(data => {

            this.holidayDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {


     

      this.holidayDataSources.push(holidayobj);
    }
  }
  formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
  }
  dataExist(holiday_id) {

    return this.holidayDataSources.some(function (el) {
      return el.holiday_id === holiday_id;
    });
  }
  removeEvent(a, row) {
    if (this.isAttCalendarSessionEdit) {
      let acs_id = this.rowSessionData.AcsId;
      let holiday_id = row.holiday_id;


      this.AttendanceCalendarSessionService.removeHolidayForSessionUpdate(acs_id, holiday_id).subscribe(data => {

        if (data.MessageType == 1) {
          this.AttendanceCalendarSessionService.getCalendarHolidaySessionById(acs_id).subscribe(data => {

            this.holidayDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {
      this.holidayDataSources = this.holidayDataSources.slice(0, a).concat(this.holidayDataSources.slice(a + 1));
    }
  

  }
  loadAttendanceCalendarDP() {

    this.AttendanceCalendarSessionService.getAllActiveCalendar().subscribe(data => {

      this.calendarDP = data;


    });

  }
  loadCalendarToEdit() {
   
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let attendanceCalendarId = this.rowData.AttendanceCalendarId;

     
      this.isAttCalendarEdit = true;
      this.calendarForm.controls['attendance_calendar_name'].setValue(this.rowData.AttendanceCalendarName);
      this.calendarForm.controls['remarks'].setValue(this.rowData.Remarks);

    this.header = "Edit Calendar";
    this.displayBasic = true;
  }

  deleteCalendar() {
    this.showDialog();
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let attendanceCalendarId = this.rowData.AttendanceCalendarId;
    this.AttendanceCalendarService.deleteCalendar(attendanceCalendarId).subscribe(data => {

      if (data.MessageType == 1) {
        this.AttCalendars.splice(this.AttCalendars.findIndex(item => item.AttendanceCalendarId === attendanceCalendarId), 1);

      }
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllCalendars() {
    this.AttendanceCalendarService.getAllCalendar().subscribe(data => {
    
      this.AttCalendars = data;


    });
  }
  dateValidationCheck(startDate, endDate) {


    if (startDate > endDate) {
      return true;
    } else {
      return false;
    }
  }
  btnNew() {
    this.resetCalendarSessionForm();
    this.toggle();
  }
  loadCalendarSessionToEdit() {

    if (this.rowSessionData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    this.resetCalendarSessionForm();
    let acs_id = this.rowSessionData.AcsId;

    this.AttendanceCalendarSessionService.getCalendarHolidaySessionById(acs_id).subscribe(res => {
  
     this.holidayDataSources = res;

   
    });

    this.isAttCalendarSessionEdit = true;
    this.inputDisabled = true;
    this.calendarSessionForm.controls['attendance_calendar_id'].setValue(this.rowSessionData.AttendanceCalendarId);
    this.calendarSessionForm.controls['session_name'].setValue(this.rowSessionData.SessionName);
   this.calendarSessionForm.controls['session_start_date'].setValue(new Date(this.rowSessionData.SessionStartDate));
    this.calendarSessionForm.controls['session_end_date'].setValue(new Date(this.rowSessionData.SessionEndDate));
 
    this.header = "Edit Calendar Session";
    this.toggle();

  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
      this.collapsedSessionList = true;
    }
    else {
      this.collapsed = true;
      this.collapsedSessionList = false;
    }

  }
  deleteCalendarSession() {

    if (this.rowSessionData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let acs_id = this.rowSessionData.AcsId;
    this.AttendanceCalendarSessionService.DeleteCalendarSession(acs_id).subscribe(data => {
      if (data.MessageType == 1) {
        this.AttCalendarSession.splice(this.AttCalendarSession.findIndex(item => item.AcsId === acs_id), 1);
      }
    
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.displaySession = false;
  }

  copyCalendarSession() {

    if (this.rowSessionData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let acs_id = this.rowSessionData.AcsId;
    this.AttendanceCalendarSessionService.CopyCalendarSession(acs_id).subscribe(result => {
      if (result.MessageType == 1) {
        this.AttCalendarSession.unshift(result.Data);
        this.selectedAttCalendarSession = result.Data;
        this.nodeSessionSelected = true;
        this.rowSessionData = result.Data;

      }

      this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
    });
    this.displayCopy = false;

  }
  loadAllCalendarSession() {
    this.AttendanceCalendarSessionService.getAllCalendarSessions().subscribe(data => {

      this.AttCalendarSession = data;


    });
  }


  resetForm() {
    this.calendarForm.reset();
    this.isAttCalendarEdit = false;
    
  }
  resetCalendarSessionForm() {
    this.calendarSessionForm.reset();
    this.isAttCalendarSessionEdit = false;
    this.holidayDataSources = [];
    this.header = "New Calendar Session";
    this.inputDisabled = false;
  }
  clear() {
    this.resetCalendarSessionForm();

    this.toggle();

  }
  SaveAttCalendars() {
    const data = this.calendarForm.value;
    if (!(data.attendance_calendar_name)) {
      return this.notifyService.ShowNotification(2, "Please calendar name")
    }
    if (this.isAttCalendarEdit) {
      data.attendance_calendar_id = this.rowData.AttendanceCalendarId;
      this.AttendanceCalendarService.updateCalendar(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.AttCalendars.splice(this.AttCalendars.findIndex(item => item.AttendanceCalendarId === data.attendance_calendar_id), 1);
          this.AttCalendars.unshift(result.Data);
          this.selectedAttCalendars = result.Data;
          this.nodeSelected = true;
          this.rowData = result.Data;
          this.displayBasic = false;
        }
        this.isAttCalendarEdit = false;
      });
    }
    else {
      if (data.attendance_calendar_name == null) {
        return this.notifyService.ShowNotification(2, "Calendar Name required");
      }
    
      this.AttendanceCalendarService.createCalendar(data).subscribe(
        result => {
        
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          if (result.MessageType == 1) {
            this.AttCalendars.unshift(result.Data);
            this.displayBasic = false;
            this.selectedAttCalendars = result.Data;
            this.nodeSelected = true;
            this.rowData = result.Data;
          }
        }
      );
    }



  }

  SaveAttCalendarSession() {
    const data = this.calendarSessionForm.value;

    if (!(data.attendance_calendar_id)) {
      return this.notifyService.ShowNotification(2, "Please select calendar")
    }
    if (!(data.session_name)) {
      return this.notifyService.ShowNotification(2, "Please write session name")
    }
    if (!(data.session_start_date)) {
      return this.notifyService.ShowNotification(2, "Please session start date")
    }
    if (!(data.session_end_date)) {
      return this.notifyService.ShowNotification(2, "Please select session end date")
    }
    if (this.dateValidationCheck(data.session_start_date, data.session_end_date)) {
      return this.notifyService.ShowNotification(2, "Session End date must be greater than session start date");
    }
    if (this.isAttCalendarSessionEdit) {
      data.acs_id = this.rowSessionData.AcsId;
      this.AttendanceCalendarSessionService.updateAttendanceCalendarSession(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
       
        if (result.MessageType == 1) {
          this.clear();
          this.AttCalendarSession.splice(this.AttCalendarSession.findIndex(item => item.AcsId === data.acs_id), 1);
          this.AttCalendarSession.unshift(result.Data);
          this.selectedAttCalendarSession = result.Data;
          this.nodeSessionSelected = true;
          this.rowSessionData = result.Data;
          this.calendarSessionModal = false;
          this.isAttCalendarSessionEdit = false;
          this.inputDisabled = false;
        }
     
  
      });
    }
    else {
    
      data.attendanceCalendarSessions_holiday = this.holidayDataSources;
      data.session_start_date = new Date((data.session_start_date)).toLocaleString();
      data.session_end_date = new Date((data.session_end_date)).toLocaleString();
      this.AttendanceCalendarSessionService.CreateAttendanceCalendarSession(data).subscribe(
        result => {
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          if (result.MessageType==1) {
            this.clear();
            this.AttCalendarSession.unshift(result.Data);
            this.selectedAttCalendarSession = result.Data;
            this.nodeSessionSelected = true;
            this.rowSessionData = result.Data;
            this.calendarSessionModal = false;
          }
        }
      );
    }



  }

}
