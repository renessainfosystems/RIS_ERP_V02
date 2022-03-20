import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { LeaveheadService } from '../leavehead/leavehead.service';
import { ShiftbreakService } from '../shiftbreak/shiftbreak.service';
import { ShiftinformationService } from './shiftinformation.service';

@Component({
  selector: 'app-shiftinformation',
  templateUrl: './shiftinformation.component.html',
  styleUrls: ['./shiftinformation.component.css']
})
export class ShiftinformationComponent implements OnInit {
  displayBasic: boolean = false;
  value: Time;
  shiftForm: any;
  advSearchForm: any;
  OTDetailsForm: any;
  shiftSearchForm: any;
  otslabDataSources: any[] = [];
  shifts: any[];
  selectedShift: any;
  shiftTypes: any[];
  selectedShiftType: any;
  attendanceCounts: any[];
  selectedAttendanceCount: any;
  timeZones: any[];
  selectedTimeZone: any;
  breakList: any[];
  selectedBreak: any;
  otPolicies: any[];
  selectedOTPolicy: any;
  benifitPolicies: any[];
  selectedBenifitPolicy: any;
  isShiftEdit: boolean = false;
  breakDataSources: any[] = [];
  OTDetailsModal: boolean = false;
  rowData: any;
  // for delete data modal
  display: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
  isShiftStartEnabled = false;
  isShiftEndEnabled = false;

  isHalfStartEnabled = false;
  isHalfEndEnabled = false;
  isWorkingHourEnabled ;
  isHalfWorkingHourEnabled = true;
   
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    }
    else
      this.display = true;
  }
  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private ShiftinformationService: ShiftinformationService) { }

  ngOnInit() {
    this.isWorkingHourEnabled = true;
    this.formInit()

    
    this.loadAllshift();
    this.loadShiftTypes();
    this.loadAttendanceCount();
    this.loadBreakDP();
    this.loadOTPolicy();
    this.loadTimeZone();
    
  }

  formInit() {

    this.shiftForm = this.formbulider.group({
      shift_name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      shift_type_id_enum: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      time_zone_id: ['', [Validators.required]],
      is_day_crossing: [false, [Validators.required]],
      attendance_count: [1, [Validators.required]],
      day_start: ["00:00", [Validators.required]],
      day_end: ["00:00", [Validators.required]],
      shift_start: [null, [Validators.required]],
      shift_end: [null, [Validators.required]],
      is_allow_half_day: [false, [Validators.required]],
      half_shift_start: [null, [Validators.required]],
      half_shift_end: [null, [Validators.required]],
      report_time: [null, [Validators.required]],
      late_tolerance_min: [0, [Validators.required]],
      extended_time_min: [0, [Validators.required]],
      early_tolerance_min: [0, [Validators.required]],
      working_hour_min: [0, [Validators.required]],
      half_working_hour_min: [0, [Validators.required]],
      OT_policy_id: [0, [Validators.required]],
      is_OT_before_shift: [false, [Validators.required]],
      is_OT_after_shift: [false, [Validators.required]],
      attendance_benefit_policy_id: [0, [Validators.required]],
      shift_break_head_id: [0, [Validators.required]],
      break_duration_min: [0, [Validators.required]]
    });
    this.advSearchForm = this.formbulider.group({

      shift_type_id_enum: ['', [Validators.required]],

      time_zone_id: ['', [Validators.required]],

      attendance_count: [0, [Validators.required]],

      shift_start: ['', [Validators.required]],
      shift_end: ['', [Validators.required]],
      is_allow_half_day: [false, [Validators.required]],
      is_inactive: [false, [Validators.required]],
      is_allow_OT: [false, [Validators.required]],
      is_allow_benifit: [false, [Validators.required]],

    });
    this.OTDetailsForm = this.formbulider.group({

      minimum_OT_min: ['', [Validators.required]],
      maximum_OT_min: ['', [Validators.required]],
      OT_reduce_time_min: ['', [Validators.required]],

    });
    this.shiftSearchForm = this.formbulider.group({

      shift_name: ['', [Validators.required]],
      is_night_shift: [false, [Validators.required]],


    });
    this.shiftForm.controls['working_hour_min'].disable();
    this.shiftForm.controls['half_working_hour_min'].disable();
    this.shiftForm.controls['half_shift_start'].disable();
    this.shiftForm.controls['half_shift_end'].disable();
    this.shiftForm.controls['late_tolerance_min'].enable();
    this.shiftForm.controls['extended_time_min'].enable();
    this.shiftForm.controls['report_time'].enable();
  }
  onRowSelect(event) {
    this.rowSelected = true;
    this.rowData = event.data;
    

  }
  onRowUnselect(event) {
    this.rowSelected = false;
    this.rowData = null;


  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  onHalfShiftEndChange() {
  
  
    const data = this.shiftForm.value;
    if (data.half_shift_start && data.half_shift_end) {
      let totalHour = this.getTotalHour(data.half_shift_start, data.half_shift_end, false);
      this.shiftForm.controls['half_working_hour_min'].setValue(Math.round(totalHour));
    }
  }
  onShiftEndChange() {

    this.shiftForm.controls['working_hour_min'].setValue(0);
    const data = this.shiftForm.value;
    if (data.shift_start && data.shift_end) {

      let totalHour = this.getTotalHour(data.shift_start, data.shift_end, data.is_day_crossing);
      this.shiftForm.controls['working_hour_min'].setValue(Math.round(totalHour));
    }
  }
  getTotalHour(startTime, endTime,is_day_crossing)
  {
    if (is_day_crossing) {
      let initalTime = "00:00";
      let lastTime = "23:59";
      let startDateTime = new Date("01/01/2000 " + startTime);
      let initalDateTime = new Date("01/01/2000 " + initalTime);
      let lastDateTime = new Date("01/01/2000 " + lastTime);
      let endDateTime = new Date("01/01/2000 " + endTime+1);
      let fisthalfDifference = (lastDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
      let secondhalfDifference = (endDateTime.getTime() - initalDateTime.getTime()) / (1000 * 3600);
      return (fisthalfDifference + secondhalfDifference) 
    }
    else {
      let startDateTime = new Date("01/01/2000 " + startTime);
      let endDateTime = new Date("01/01/2000 " + endTime);
      return  (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
    }
   

  }

  onShiftChange(event) {
   
    let shift_type_id_enum = event.value;
    this.disableFieldForFlexibleShift();
  }

  halfWorkingStartEnd() {
    this.shiftForm.controls['half_shift_start'].setValue(null);
    this.shiftForm.controls['half_shift_end'].setValue(null);
    const data = this.shiftForm.value;

    if (data.shift_type_id_enum == 1 && data.is_allow_half_day) {
      this.shiftForm.controls['half_shift_start'].enable();
      this.shiftForm.controls['half_shift_end'].enable();
    }
    if (data.shift_type_id_enum == 1 && !data.is_allow_half_day) {
      this.shiftForm.controls['half_shift_start'].disable();
      this.shiftForm.controls['half_shift_end'].disable();
    }
    if (data.shift_type_id_enum == 2 && data.is_allow_half_day) {
     
      this.shiftForm.controls['half_working_hour_min'].enable();
    }
    if (data.shift_type_id_enum == 2 && !data.is_allow_half_day) {
      
      this.shiftForm.controls['half_working_hour_min'].disable();
    }
   
  }
  disableFieldForFlexibleShift() {
    this.shiftForm.controls['report_time'].setValue(null);
    this.shiftForm.controls['late_tolerance_min'].setValue(0);
    this.shiftForm.controls['extended_time_min'].setValue(0);
    this.shiftForm.controls['early_tolerance_min'].setValue(0);
    this.shiftForm.controls['working_hour_min'].setValue(0);
    this.shiftForm.controls['half_working_hour_min'].setValue(0);
    const data = this.shiftForm.value;
    if (data.shift_type_id_enum != 1) {
      this.isShiftStartEnabled = true;
      this.isShiftEndEnabled = true;

      this.isHalfStartEnabled = true;
      this.isHalfEndEnabled = true;
      this.shiftForm.controls['working_hour_min'].enable();
     
      this.shiftForm.controls['late_tolerance_min'].disable();
      this.shiftForm.controls['extended_time_min'].disable();
      this.shiftForm.controls['report_time'].disable();
      this.isHalfWorkingHourEnabled = false;
    }
    else {

      this.isShiftStartEnabled = false;
      this.isShiftEndEnabled = false;

      this.isHalfStartEnabled = false;
      this.isHalfEndEnabled = false;
      this.shiftForm.controls['working_hour_min'].disable();
      this.shiftForm.controls['half_working_hour_min'].disable();
      this.shiftForm.controls['late_tolerance_min'].enable();
      this.shiftForm.controls['extended_time_min'].enable();
      this.shiftForm.controls['report_time'].enable();
      this.isHalfWorkingHourEnabled = true;
    }
  }
  loadShiftTypes() {

    this.ShiftinformationService.getShiftTypeEnum().subscribe(data => {

      this.shiftTypes = data;

    });
   
  }


  loadAttendanceCount() {
    this.attendanceCounts = [
      {
        "attendance_countname": 1,
        "attendance_count": 1
      },
      {
        "attendance_countname": 0.5,
        "attendance_count": 2
      }
    ]
  }
  loadBreakDP() {
    this.ShiftinformationService.getAllActiveBreakForDP().subscribe(result => {
      this.breakList = result;
    });
  }
  loadOTPolicy() {
    this.ShiftinformationService.getAllActiveOTPolicyForDP().subscribe(result => {
      this.otPolicies = result;
    });
  }
  getOTDetails() {
    let OT_policy_id = this.shiftForm.get('OT_policy_id')?.value;
    this.ShiftinformationService.getOTPolicySlabById(OT_policy_id).subscribe(res => {

      this.otslabDataSources = res;


    });


    if (!OT_policy_id) {
      return this.notifyService.ShowNotification(3, 'Please select OT Policy');
    }
    this.ShiftinformationService.getActiveOTPolicyById(OT_policy_id).subscribe(result => {
      this.OTDetailsForm.controls['minimum_OT_min'].setValue(result.MinimumOTMin);
      this.OTDetailsForm.controls['maximum_OT_min'].setValue(result.MaximumOTMin);
      this.OTDetailsForm.controls['OT_reduce_time_min'].setValue(result.OTReduceTimeMin);
    });
    this.OTDetailsModal = true;
  }
  loadTimeZone() {
    this.ShiftinformationService.getTimeZone().subscribe(result => {
      this.timeZones = result;
     
    });
  }
  loadAllshift() {
    this.ShiftinformationService.getAllShift().subscribe(result => {
      this.shifts = result;
      
    });
  }
  shiftSearch() {
    this.displayBasic = false;
    const data = this.shiftSearchForm.value;
    data.isAdvanceSearch = false;
    this.ShiftinformationService.GetAllShiftByFiltering(data).subscribe(result => {
      this.shifts = result;

    });
  }
  shiftAdvanceSearch() {
    const data = this.advSearchForm.value;
    data.isAdvanceSearch = true;
    this.ShiftinformationService.GetAllShiftByFiltering(data).subscribe(result => {
      this.shifts = result;

    });
  }
  deleteShift() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
    }

    let shift_id = this.rowData.ShiftId;
    this.ShiftinformationService.delete(shift_id).subscribe(data => {

      this.loadAllshift();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
    }
    else {
      this.collapsed = true;
    }

  }
  addOTSlabInfo() {
   
    let break_duration_min = this.shiftForm.get('break_duration_min')?.value;

    let shift_break_head_id = this.shiftForm.get('shift_break_head_id')?.value.shift_break_head_id;

    let break_name = (this.shiftForm.get('shift_break_head_id')?.value.head_name)
    if (this.dataExist(shift_break_head_id)) {
      return this.notifyService.ShowNotification(2, "Selected event already added")
    }

    const breakSlabobj = {
      shift_break_head_id: shift_break_head_id,
      break_duration_min: break_duration_min,
      shift_id: 0,
      break_name: break_name,
      is_active:true
    }


    if (this.isShiftEdit) {
      let shift_id = this.rowData.ShiftId;
      breakSlabobj.shift_id = shift_id;


      this.ShiftinformationService.AddBreakDurationForShiftUpdate(breakSlabobj).subscribe(data => {

        if (data.MessageType == 1) {
          this.ShiftinformationService.getShiftDurationSlabById(shift_id).subscribe(data => {

            this.breakDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {



      this.breakDataSources.push(breakSlabobj);
    }
  }

  // ...

  dataExist(shift_break_head_id) {

    return this.breakDataSources.some(function (el) {
      return el.shift_break_head_id === shift_break_head_id;
    });
  }
  removeEvent(a, row) {
    if (this.isShiftEdit) {
      let shift_id = this.rowData.ShiftId;


      this.ShiftinformationService.RemoveBreakDurationForShiftUpdate(row.shift_break_duration_id).subscribe(data => {

        if (data.MessageType == 1) {
          this.ShiftinformationService.getShiftDurationSlabById(shift_id).subscribe(data => {

            this.breakDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {
      this.breakDataSources = this.breakDataSources.slice(0, a).concat(this.breakDataSources.slice(a + 1));
    }


  }
  loadShiftToEdit() {

   
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
    }
    this.collapsed = false;
    let shift_id = this.rowData.ShiftId;
   
    this.ShiftinformationService.getShiftDurationSlabById(shift_id).subscribe(res => {

      this.breakDataSources = res;


    });
   
    this.ShiftinformationService.getShiftById(shift_id).subscribe(data => {
      var res = data[0];
     
  
      this.shiftForm.controls['shift_name'].setValue(res.shift_name);
      this.shiftForm.controls['code'].setValue(res.code);
      this.shiftForm.controls['shift_type_id_enum'].setValue(res.shift_type_id_enum);
      this.shiftForm.controls['remark'].setValue(res.remark);
      this.shiftForm.controls['time_zone_id'].setValue(res.time_zone_id);
      this.shiftForm.controls['is_day_crossing'].setValue(res.is_day_crossing);
      this.shiftForm.controls['attendance_count'].setValue(res.attendance_count);
      this.shiftForm.controls['day_start'].setValue(res.day_start);
      this.shiftForm.controls['day_end'].setValue((res.day_end));
      this.shiftForm.controls['shift_start'].setValue(res.shift_start);
      this.shiftForm.controls['shift_end'].setValue(res.shift_end);
      this.shiftForm.controls['is_allow_half_day'].setValue(res.is_allow_half_day);
      this.shiftForm.controls['half_shift_start'].setValue(res.half_shift_start);
      this.shiftForm.controls['half_shift_end'].setValue(res.half_shift_end);
 
      this.shiftForm.controls['report_time'].setValue(res.report_time);
      this.shiftForm.controls['late_tolerance_min'].setValue(res.late_tolerance_min);
      this.shiftForm.controls['extended_time_min'].setValue(res.extended_time_min);
      this.shiftForm.controls['early_tolerance_min'].setValue(res.early_tolerance_min);
      this.shiftForm.controls['working_hour_min'].setValue(res.working_hour_min);
      this.shiftForm.controls['half_working_hour_min'].setValue(res.half_working_hour_min);
      this.shiftForm.controls['OT_policy_id'].setValue(res.OT_policy_id);
      this.shiftForm.controls['is_OT_before_shift'].setValue(res.is_OT_before_shift);
      this.shiftForm.controls['is_OT_after_shift'].setValue(res.is_OT_after_shift);
      this.shiftForm.controls['attendance_benefit_policy_id'].setValue(res.attendance_benefit_policy_id);

      this.isShiftEdit = true;
    });

    //this.displayBasic = true;
  }

  policyApprove() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved.");
    }
    let shift_id = this.rowData.ShiftId;
    this.ShiftinformationService.approve(shift_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllshift();
      }
    );
  }
 
  timeCheck(time1,time2) {

let time1Date = new Date("01/01/2000 " + time1);
let time2Date = new Date("01/01/2000 " + time2);

  if (time2Date > time1Date) {
  return true;
} else {
  return false;
}}
  saveShift() {
    const data = this.shiftForm.value;

    data.shiftBreakDurations = this.breakDataSources;
    if (!(data.shift_name)) {
      return this.notifyService.ShowNotification(2, "Please enter shift name")
    }
    if (!(data.day_start)) {
      return this.notifyService.ShowNotification(2, "Please enter day start")
    }
    if (!(data.day_end)) {
      return this.notifyService.ShowNotification(2, "Please enter day end")
    }
    if (data.is_day_crossing && this.timeCheck(data.day_start, data.day_end)) {
      return this.notifyService.ShowNotification(2, "day end must be greater than day start")
    }
    if (!data.is_day_crossing && !this.timeCheck(data.day_start, data.day_end)) {
      return this.notifyService.ShowNotification(2, "day end must be greater than day start")
    }
    if (data.shift_type_id_enum == 1) {
      if (data.is_day_crossing && this.timeCheck(data.shift_start, data.shift_end)) {

        return this.notifyService.ShowNotification(2, "Day end should be next day")
      }
      if (!data.is_day_crossing && !this.timeCheck(data.shift_start, data.shift_end)) {
        return this.notifyService.ShowNotification(2, "shift end must be greater than shift start")
      }



      if (data.is_allow_half_day && !(data.half_shift_start)) {
        return this.notifyService.ShowNotification(2, "Please enter half shift start")
      }
      if (data.is_allow_half_day && !(data.half_shift_end)) {
        return this.notifyService.ShowNotification(2, "Please enter half shift end")
      }
    }

    if (this.isShiftEdit) {
    
      data.shift_id = this.rowData.ShiftId;
      this.ShiftinformationService.update(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
 
        if (result.MessageType == 1) {
          this.resetForm();
        }
        
      });
    }
    else {
     
      
      this.ShiftinformationService.create(JSON.stringify(data) ).subscribe(
        result => {
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.loadAllshift();
        }
      );
    }

   

  }

  //shiftDataValidate() {
  //  const data = this.shiftForm.value;

  //  data.shiftBreakDurations = this.breakDataSources;
  //  if (!(data.shift_name)) {
  //    return this.notifyService.ShowNotification(2, "Please enter shift name")
  //  }
  //  if (!(data.day_start)) {
  //    return this.notifyService.ShowNotification(2, "Please enter day start")
  //  }
  //  if (!(data.day_end)) {
  //    return this.notifyService.ShowNotification(2, "Please enter day end")
  //  }
  //  if (data.is_day_crossing && this.timeCheck(data.day_start, data.day_end)) {
  //    return this.notifyService.ShowNotification(2, "day end must be greater than day start")
  //  }
  //  if (!data.is_day_crossing && !this.timeCheck(data.day_start, data.day_end)) {
  //    return this.notifyService.ShowNotification(2, "day end must be greater than day start")
  //  }
  //  if (data.shift_type_id_enum == 1) {
  //    if (data.is_day_crossing && this.timeCheck(data.shift_start, data.shift_end)) {

  //      return this.notifyService.ShowNotification(2, "Day end should be next day")
  //    }
  //    if (!data.is_day_crossing && !this.timeCheck(data.shift_start, data.shift_end)) {
  //      return this.notifyService.ShowNotification(2, "shift end must be greater than shift start")
  //    }



  //    if (data.is_allow_half_day && !(data.half_shift_start)) {
  //      return this.notifyService.ShowNotification(2, "Please enter half shift start")
  //    }
  //    if (data.is_allow_half_day && !(data.half_shift_end)) {
  //      return this.notifyService.ShowNotification(2, "Please enter half shift end")
  //    }
  //  }
  //}
  resetForm() {
    this.shiftForm.reset();
    this.isShiftEdit = false;
    this.loadAllshift();
    this.collapsed = true;
    this.ngOnInit();
  }

}
