import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { HolidayService } from './holiday.service';
import HolidayType from './holidaytype.model';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  displayBasic: boolean = false;
  header: any;
  showBasicDialog() {
    this.header = "New Holiday";
    this.displayBasic = true;

    this.resetForm();
  }
 
  Holidays: any[];
  selectedHolidays: any;
  holidayForm: any;
  holidayTypes: HolidayType[];
  selectedHoliday: HolidayType;
  rowData: any;
  nodeSelected: boolean = false;
  isHolidayEdit: boolean = false;
  // for delete data modal
  display: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }
  months: any;
  days: any;

  constructor(private formbulider: FormBuilder, private notifyService: NotificationService,private HolidayService: HolidayService) { }

  ngOnInit() {
    this.holidayForm = this.formbulider.group({
      holiday_name: [null, [Validators.required]],
      type_of_holiday_id_enum: [null, [Validators.required]],
      selectedday: [null],
      selectedmonth: [null],
      days_of_month: new FormControl(''),
      name_in_local_language: [null, [Validators.required]],
      remarks: [null, [Validators.required]],
    });
   
    this.loadMonthList();
    this.loadDayNumberList();
    this.loadAllHolidayTypes()
    this.loadAllHoliDays();
  }
  onRowSelect(event) {

    this.nodeSelected = true;
    this.rowData = event.data;
  
  }
  onRowUnselect(event) {

    this.nodeSelected = false;
    this.rowData = null;

  }

  loadHolidayToEdit() {
    this.resetForm();
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
   
    let holidayId = this.rowData.holiday_id;
    this.HolidayService.getHolidayById(holidayId).subscribe(data => {
      if (data != null) {
        this.isHolidayEdit = true;
      }
      if (data.days_of_month != null) {

        this.holidayForm.controls['selectedday'].setValue(+data.days_of_month.split('-')[0]);
        this.holidayForm.controls['selectedmonth'].setValue(data.days_of_month.split('-')[1]);
      }
    this.holidayForm.controls['holiday_name'].setValue(data.holiday_name);
    this.holidayForm.controls['type_of_holiday_id_enum'].setValue(data.type_of_holiday_id_enum);
      this.holidayForm.controls['days_of_month'].setValue(data.days_of_month);
      this.holidayForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.holidayForm.controls['remarks'].setValue(data.remarks);

    });
    this.header = "Edit Holiday";
    this.displayBasic = true;
  }

  deleteHoliday() {
    this.showDialog();
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    
    let holidayId = this.rowData.holiday_id;
    this.HolidayService.deleteHoliday(holidayId).subscribe(data => {

      this.loadAllHoliDays();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllHoliDays() {
    this.HolidayService.getAllHoliday().subscribe(data => {
    
      this.Holidays = data;


    });
  }
  loadMonthList() {
    this.HolidayService.getmonthlistJSON().subscribe(data => {
      
      this.months = data;

    });
  }
  loadDayNumberList() {
    this.HolidayService.getdayNumberListJSON().subscribe(data => {

      this.days = data;

    });
  }
  loadAllHolidayTypes() {
    this.HolidayService.getHolidayTypeList().subscribe(data => {
      this.holidayTypes = data;


    });
  }

  resetForm() {
    this.holidayForm.reset();
    this.isHolidayEdit = false;
  }
  closeModal() {
    this.displayBasic = false;
  }
  SaveHoliday() {
    const data = this.holidayForm.value;

    if (data.selectedday != null && data.selectedmonth != null) {
      data.days_of_month = data.selectedday + "-" + data.selectedmonth
    }

    if (this.isHolidayEdit) {
      let holidayId = this.rowData.holiday_id;
      data.holiday_id = holidayId;
      this.HolidayService.updateHoliday(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllHoliDays();
        this.isHolidayEdit = false;
      });
    }
    else {
      if (!data.holiday_name) {
        return this.notifyService.ShowNotification(2, "Holiday Name required");
      }
      if (!data.type_of_holiday_id_enum) {
        return this.notifyService.ShowNotification(2, "Holiday Type required");
      }
      this.HolidayService.createHoliday(data).subscribe(
        result => {
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.loadAllHoliDays();
        }
      );
    }
  
    this.displayBasic = false;
    this.resetForm();
  }



}
