import { P } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { LateEarlyPolicyService } from './late-early-policy.service';


@Component({
  selector: 'app-late-early-policy',
  templateUrl: './late-early-policy.component.html',
  styleUrls: ['./late-early-policy.component.css']
})
export class LateEarlyPolicyComponent implements OnInit {
  displayBasic: boolean = false;
  lateEarlyPolicyForm: any;
  OTDetailsForm: any;
  shiftSearchForm: any;
  latEarlySlabDataSources: any[] = [];
  lateEarlyPolicies: any[];
  selectedPolicy: any;
  salaryheads: any[];
  selectedSalaryHead: any;
  isBenefitPolicyEdit: boolean = false;
  basicsalaryheads: any[];
  selectedBasicSalaryHead: any;
  OTDetailsModal: boolean = false;
  rowData: any;
  header: any = "New Late-Early Policy";
  selectedValue: string = '1';
  selectedlateearlyValue: string = '3';
  // for delete data modal
  display: boolean = false;
  displayApprove: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
  collapsedBenefitList = false;
  isShownTimeslot: boolean = false; // hidden by default
  isShownHolidayDP: boolean = false;
  isShownOTBenefit: boolean = false;
  isShownLeaveBenefit: boolean = false;
  isShownMonetaryBenefit: boolean = false;
  categories: any[] = [{ name: 'Late', key: 'A' }, { name: 'Early', key: 'M' }, { name: 'Both', key: 'P' }];;

 

  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't delete this policy");
    }
    else
      this.display = true;
  }

  approveConfirm() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved");
    }
    else
      this.displayApprove = true;
  }

  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private LateEarlyPolicyService: LateEarlyPolicyService) { }

  ngOnInit() {
    
    this.formInit()

    this.loadAllLateEarly();
  
   
    this.loadSalaryHead();
    
    this.loadBasicSalaryHead();
   
    this.getPolicyCode();
   
  }

  formInit() {

    this.lateEarlyPolicyForm = this.formbulider.group({
      late_early_policy_name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      late_early_type_id_enum: ['3', [Validators.required]],
      remarks: ['', [Validators.required]],
      late_early_days_for: [0, [Validators.required]],
      is_consecutive: [false, [Validators.required]],
      is_allow_late_early_slab: [false, [Validators.required]],
      min_late_early_hour: [0, [Validators.required]],
      min_late_early_min: [0, [Validators.required]],
      max_late_early_hour: [0, [Validators.required]],
      max_late_early_min: [0, [Validators.required]],
      is_leave_adjustment: [false, [Validators.required]],
      leave_amount_d: [0, [Validators.required]],
      leave_amount_h: [0, [Validators.required]],
      leave_in_min: [0, [Validators.required]],
      is_leave_as_late_early_min: [false, [Validators.required]],
      is_monetary_benefit: [false, [Validators.required]],
      deduction_days: [0, [Validators.required]],
      percent_value: [0, [Validators.required]],
      is_deduction_monthly_min: [false, [Validators.required]],
      is_gross: [false, [Validators.required]],
      primary_salary_head_id: [0, [Validators.required]],
      salary_head_id: [0, [Validators.required]],
    });

    this.OTDetailsForm = this.formbulider.group({

      minimum_OT_min: ['', [Validators.required]],
      maximum_OT_min: ['', [Validators.required]],
      OT_reduce_time_min: ['', [Validators.required]],

    });


  }
  onRowSelect(event) {
    this.rowSelected = true;
    this.rowData = event.data;


  }
  onRowUnselect(event) {
    this.rowSelected = false;
    this.rowData = null;


  }
  btnNew() {
    this.resetForm();
 
    this.toggle();
    
  }
  showBasicDialog() {
    this.displayBasic = true;
  }

  getTotalHour(startTime, endTime, is_day_crossing) {
    if (is_day_crossing) {
      let initalTime = "00:00";
      let lastTime = "23:59";
      let startDateTime = new Date("01/01/2000 " + startTime);
      let initalDateTime = new Date("01/01/2000 " + initalTime);
      let lastDateTime = new Date("01/01/2000 " + lastTime);
      let endDateTime = new Date("01/01/2000 " + endTime + 1);
      let fisthalfDifference = (lastDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
      let secondhalfDifference = (endDateTime.getTime() - initalDateTime.getTime()) / (1000 * 3600);
      return (fisthalfDifference + secondhalfDifference)
    }
    else {
      let startDateTime = new Date("01/01/2000 " + startTime);
      let endDateTime = new Date("01/01/2000 " + endTime);
      return (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 3600);
    }


  }

  onBenefitTypeChange(event) {

    let benefit_work_on_id_enum = event.value;
    if (benefit_work_on_id_enum == 1) {
      this.isShownTimeslot = true;
      this.isShownHolidayDP = false;
      this.lateEarlyPolicyForm.controls['leave_head_id'].setValue(0);
    }
    else if (benefit_work_on_id_enum == 4) {
      this.isShownHolidayDP = true;
      this.isShownTimeslot = false;
      this.lateEarlyPolicyForm.controls['time_start'].setValue('');
      this.lateEarlyPolicyForm.controls['time_end'].setValue('');
    }
    else {
      this.isShownHolidayDP = false;
      this.isShownTimeslot = false;
      this.lateEarlyPolicyForm.controls['leave_head_id'].setValue(0);
      this.lateEarlyPolicyForm.controls['time_start'].setValue('');
      this.lateEarlyPolicyForm.controls['time_end'].setValue('');

    }
  }
  onOTBenefitChange(event) {
    if (event.checked) {
      this.isShownOTBenefit = true;

    }
    else {
      this.lateEarlyPolicyForm.controls['min_late_early_hour'].setValue(0);
      this.lateEarlyPolicyForm.controls['min_late_early_min'].setValue(0);
      this.lateEarlyPolicyForm.controls['max_late_early_min'].setValue(0);
      this.lateEarlyPolicyForm.controls['max_late_early_hour'].setValue(0);
      this.isShownOTBenefit = false;

    }
  }
  onLeaveBenefitChange(event) {

    if (event.checked) {
      this.isShownLeaveBenefit = true;
  

    }
    else {
      
      this.lateEarlyPolicyForm.controls['leave_amount_d'].setValue(0);
      this.lateEarlyPolicyForm.controls['leave_amount_h'].setValue(0);
      this.lateEarlyPolicyForm.controls['leave_in_min'].setValue(0);
      this.lateEarlyPolicyForm.controls['is_leave_as_late_early_min'].setValue(false);
      this.isShownLeaveBenefit = false;

    }
  }
  onMonetaryBenefitChange(event) {
   
    if (event.checked) {
      this.isShownMonetaryBenefit = true;
   

    }
    else {
      this.lateEarlyPolicyForm.controls['salary_head_id'].setValue(0);
      this.lateEarlyPolicyForm.controls['deduction_days'].setValue(0);
      this.lateEarlyPolicyForm.controls['percent_value'].setValue(0);
      this.lateEarlyPolicyForm.controls['is_deduction_monthly_min'].setValue(false);
      this.lateEarlyPolicyForm.controls['primary_salary_head_id'].setValue(0);
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
      this.isShownMonetaryBenefit = false;
    }
  }



  loadSalaryHead() {
    this.LateEarlyPolicyService.getDeductionSalaryHeadForDP().subscribe(result => {
      this.salaryheads = result;
    });

  }
  loadBasicSalaryHead() {
    this.LateEarlyPolicyService.getPrimarySalaryHeadForDP().subscribe(result => {
      
      let newArrayOfObj = result.map(({

        salary_head_name :basic_salary_head_name
      }) => ({
       
        basic_salary_head_name,
      
      }))
      this.basicsalaryheads = newArrayOfObj;
   
    });
  }

  

  loadAllLateEarly() {
    this.LateEarlyPolicyService.getAllLateEarlyPolicy().subscribe(result => {
      this.lateEarlyPolicies = result;

    });
  }

  deleteAttendanceBenefitPolicy() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
    }

    let late_early_policy_id = this.rowData.late_early_policy_id;
    this.LateEarlyPolicyService.delete(late_early_policy_id).subscribe(data => {

      if (data.MessageType == 1) {
        this.lateEarlyPolicies.splice(this.lateEarlyPolicies.findIndex(item => item.late_early_policy_id === late_early_policy_id), 1);
      }
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
      this.collapsedBenefitList = true;

    }
    else {
      this.collapsed = true;
      this.collapsedBenefitList = false;

    }

  }


  // ...



  loadBenefitPolicyToEdit() {


    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
    }
    this.resetForm();
    let late_early_policy_id = this.rowData.late_early_policy_id;

    this.LateEarlyPolicyService.getLateEarlyPolicyDetailsById(late_early_policy_id).subscribe(res => {
     
      this.setLateEarlyDataSource(res);

    });
  
    this.LateEarlyPolicyService.getLateEarlyPolicyById(late_early_policy_id).subscribe(data => {

      this.lateEarlyPolicyForm.controls['late_early_policy_name'].setValue(data.late_early_policy_name);
      this.lateEarlyPolicyForm.controls['code'].setValue(data.code);
      this.lateEarlyPolicyForm.controls['remarks'].setValue(data.remarks);
      this.isBenefitPolicyEdit = true;
    });

    this.header = "Edit Late-Early Policy";
    this.toggle();
  }

  policyApprove() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved.");
    }
    let late_early_policy_id = this.rowData.late_early_policy_id;
    this.LateEarlyPolicyService.approve(late_early_policy_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.lateEarlyPolicies.splice(this.lateEarlyPolicies.findIndex(item => item.late_early_policy_id === late_early_policy_id), 1);
          this.lateEarlyPolicies.unshift(result.Data[0]);
          this.selectedPolicy = result.Data[0];
          this.rowSelected = true;
          this.rowData = result.Data[0];
          this.displayApprove = false;
        }
      }
    );
  }

  timeCheck(time1, time2) {

    let time1Date = new Date("01/01/2000 " + time1);
    let time2Date = new Date("01/01/2000 " + time2);

    if (time2Date > time1Date) {
      return true;
    } else {
      return false;
    }
  }
  saveBenefitPolicy() {
    const data = this.lateEarlyPolicyForm.value;
    if (!data.late_early_policy_name) {
      return this.notifyService.ShowNotification(2, "Please enter policy name");
    }
  
    if (this.isBenefitPolicyEdit) {

      data.late_early_policy_id = this.rowData.late_early_policy_id;
      this.LateEarlyPolicyService.update(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.clear();
          this.lateEarlyPolicies.splice(this.lateEarlyPolicies.findIndex(item => item.late_early_policy_id === data.late_early_policy_id), 1);
          this.lateEarlyPolicies.unshift(result.Data[0]);
          this.selectedPolicy = result.Data[0];
          this.rowSelected = true;
          this.rowData = result.Data[0];
        }


      });
    }
    else {

      data.lateEarlyPolicyDetails = this.latEarlySlabDataSources;
      this.LateEarlyPolicyService.create(JSON.stringify(data)).subscribe(
        result => {
          if (result.MessageType == 1) {
            this.clear();
            this.lateEarlyPolicies.unshift(result.Data[0]);
            this.selectedPolicy = result.Data[0];
            this.rowSelected = true;
            this.rowData = result.Data[0];
          }
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

        }
      );
    }



  }

  getMaxHourToMin() {
    var hour = this.lateEarlyPolicyForm.value.max_late_early_hour;

    this.lateEarlyPolicyForm.controls['max_late_early_min'].setValue(hour * 60);
   
  }

  getHourToMin() {
    var hour = this.lateEarlyPolicyForm.value.min_late_early_hour;

    this.lateEarlyPolicyForm.controls['min_late_early_min'].setValue(hour * 60);

  }
  getDaytoHourToMin() {
    var day = this.lateEarlyPolicyForm.value.leave_amount_d;
    var hour = day * 8;

    this.lateEarlyPolicyForm.controls['leave_amount_h'].setValue(hour);
    this.lateEarlyPolicyForm.controls['leave_in_min'].setValue(hour * 60);
    this.lateEarlyPolicyForm.controls['is_leave_as_late_early_min'].setValue(false);

  }
  getHourToDayToMin() {
    var hour = this.lateEarlyPolicyForm.value.leave_amount_h;
    var day = hour / 8.0;

    this.lateEarlyPolicyForm.controls['leave_amount_d'].setValue(day);
    this.lateEarlyPolicyForm.controls['leave_in_min'].setValue(hour * 60);
    this.lateEarlyPolicyForm.controls['is_leave_as_late_early_min'].setValue(false);
  }
  checkFixedAmount() {

    let salaryheadid = this.lateEarlyPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.lateEarlyPolicyForm.controls['fixed_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Please select salary head")

    }
    let fixedAmount = this.lateEarlyPolicyForm.value.fixed_value;
    if (fixedAmount && fixedAmount > 0) {
      this.lateEarlyPolicyForm.controls['percent_value'].setValue(0);
    }

  }
  checkPercentageAmount() {
    let salaryheadid = this.lateEarlyPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.lateEarlyPolicyForm.controls['percent_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.lateEarlyPolicyForm.value.percent_value;
    if (percentageAmount && percentageAmount > 0) {
      this.lateEarlyPolicyForm.controls['fixed_value'].setValue(0);
    }
  }
  checkIsGross() {

    let salaryheadid = this.lateEarlyPolicyForm.value.salary_head_id;
    let is_gross = this.lateEarlyPolicyForm.value.is_gross;
    if (!salaryheadid) {
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.lateEarlyPolicyForm.value.percent_value;

    if (percentageAmount == 0) {
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
    }
    if (is_gross) {
      this.lateEarlyPolicyForm.controls['primary_salary_head_id'].setValue(0);
    }
   
  }

  checkPrimaryHead() {

    let salaryheadid = this.lateEarlyPolicyForm.value.salary_head_id;
    let is_gross = this.lateEarlyPolicyForm.value.is_gross;
    if (!salaryheadid) {
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.lateEarlyPolicyForm.value.percent_value;

    if (percentageAmount == 0) {
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
    }
    if (is_gross) {
      this.lateEarlyPolicyForm.controls['is_gross'].setValue(false);
    }

  }
  checkIsleavelateearlymin()
  {
    this.lateEarlyPolicyForm.controls['leave_amount_d'].setValue(0);
    this.lateEarlyPolicyForm.controls['leave_in_min'].setValue(0);
    
  }
  checkIsDeductionMonthlyMin() {

    let salaryheadid = this.lateEarlyPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.lateEarlyPolicyForm.controls['is_deduction_monthly_min'].setValue(false);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    
    this.lateEarlyPolicyForm.controls['deduction_days'].setValue(0);
    
  }
  getPolicyCode() {

    this.LateEarlyPolicyService.getLateEarlyPolicyCode().subscribe(data => {

      this.lateEarlyPolicyForm.controls['code'].setValue(data.code);


    });
  }
  addOTSlabInfo() {

    let late_early_type_id = this.lateEarlyPolicyForm.get('late_early_type_id_enum')?.value;
    let late_early_policy_name = this.lateEarlyPolicyForm.get('late_early_policy_name')?.value;
    let late_early_days_for = this.lateEarlyPolicyForm.get('late_early_days_for')?.value;
    let is_allow_late_early_slab = this.lateEarlyPolicyForm.get('is_allow_late_early_slab')?.value;
    let min_late_early_min = this.lateEarlyPolicyForm.get('min_late_early_min')?.value;
    let max_late_early_min = this.lateEarlyPolicyForm.get('max_late_early_min')?.value;
    let is_leave_adjustment = this.lateEarlyPolicyForm.get('is_leave_adjustment')?.value;
    let leave_in_min = this.lateEarlyPolicyForm.get('leave_in_min')?.value;
    let is_leave_as_late_early_min = this.lateEarlyPolicyForm.get('is_leave_as_late_early_min')?.value;
    let salary_head_id = this.lateEarlyPolicyForm.get('salary_head_id')?.value;
    let percent_value = this.lateEarlyPolicyForm.get('percent_value')?.value;
    let is_gross = this.lateEarlyPolicyForm.get('is_gross')?.value;
    let primary_salary_head_id = this.lateEarlyPolicyForm.get('primary_salary_head_id')?.value;
    let deduction_days = this.lateEarlyPolicyForm.get('deduction_days')?.value;
    let is_deduction_monthly_min = this.lateEarlyPolicyForm.get('is_deduction_monthly_min')?.value;
    let is_monetary_benefit = this.lateEarlyPolicyForm.get('is_monetary_benefit')?.value;
    let leave_amount_d = this.lateEarlyPolicyForm.get('leave_amount_d')?.value;

    if (!late_early_policy_name) {
      return this.notifyService.ShowNotification(2, "Please enter Policy Name")
    }
    if (!late_early_days_for || late_early_days_for == 0) {
      return this.notifyService.ShowNotification(2, "Please enter Late Days")
    }
    if (is_allow_late_early_slab && ((!min_late_early_min || min_late_early_min == 0) || (!max_late_early_min || max_late_early_min==0))) {
      return this.notifyService.ShowNotification(2, "Please enter late/Early min range")
    }
    if (is_allow_late_early_slab && (min_late_early_min > max_late_early_min)) {
      return this.notifyService.ShowNotification(2, "Max late/Early min must be greater than Min Late/Early min")
    }
    
    if (!is_leave_adjustment && !is_monetary_benefit) {
      return this.notifyService.ShowNotification(2, "Please select leave adjustment/salary adjustment")
    }
    if (is_leave_adjustment && (!leave_in_min || leave_in_min == 0)) {
      return this.notifyService.ShowNotification(2, "Please enter leave adjustment day")
    }
    if (is_monetary_benefit && !salary_head_id ) {
      return this.notifyService.ShowNotification(2, "Please select deduction head")
    }
    if (is_monetary_benefit && (!percent_value || percent_value == 0)) {
      return this.notifyService.ShowNotification(2, "Please enter percent amount")
    }

    if (is_monetary_benefit && (!is_gross) && primary_salary_head_id==0) {
      alert(primary_salary_head_id)
      return this.notifyService.ShowNotification(2, "Please select gross or salary head")
    }
    if (is_monetary_benefit && (!deduction_days || deduction_days==0)) {
      return this.notifyService.ShowNotification(2, "Please enter deduction day")
    }

    let rulesFor = '';
    let description = '';
    let Salaryadjustment = '';
    let leaveadjustment = '';
    let lateSlab = '';
    let grossBasic = is_gross ? "Gross" : "Basic";
    
    if (late_early_type_id == 1) {
      
      rulesFor = "Late"
      lateSlab = min_late_early_min + " to " + max_late_early_min + " minutes";
      description = is_allow_late_early_slab ? late_early_days_for + " Days of Monthly Late (" + lateSlab + ")" : late_early_days_for + " Days of Monthly Late";
      if (is_leave_adjustment) { leaveadjustment = is_leave_as_late_early_min ?  "Monthly actual late min adjust with leave":"Deduct " + leave_amount_d + " day leave"; }
      if (is_monetary_benefit) { Salaryadjustment = is_deduction_monthly_min ? "Deduct " + percent_value + "% " + grossBasic + "as per total late in minutes" : "Deduct " + +deduction_days + " days of " + percent_value + " % " + grossBasic }
   
     
    }
    if (late_early_type_id == 2) {
      rulesFor = "Early"
      lateSlab = min_late_early_min + " to " + max_late_early_min + " minutes";
      description = is_allow_late_early_slab ? late_early_days_for + " Days of Monthly Early(" + lateSlab + ")"  : late_early_days_for + " Days of Monthly Early";
      if (is_leave_adjustment) { leaveadjustment = is_leave_as_late_early_min ? "Monthly actual early min adjust with leave": "Deduct " + leave_amount_d +" day leave" ; }
      if (is_monetary_benefit) { Salaryadjustment = is_deduction_monthly_min ? "Deduct " + percent_value + "% " + grossBasic + "as per total early in minutes" : "Deduct " + +deduction_days + " days of " + percent_value + " % " + grossBasic }
    }
    if (late_early_type_id == 3) {
      rulesFor = "Both"
      lateSlab = min_late_early_min + " to " + max_late_early_min + " minutes";
      description = is_allow_late_early_slab ? late_early_days_for + " Days of Monthly Early/Late(" + lateSlab + ")"  : late_early_days_for + " Days of Monthly Early/Late";
      if (is_leave_adjustment) { leaveadjustment = is_leave_as_late_early_min ? "Monthly actual Early/Late min adjust with leave": "Deduct " + leave_amount_d + " day leave"; }
      if (is_monetary_benefit) { Salaryadjustment = is_deduction_monthly_min ? "Deduct " + percent_value + "% " + grossBasic + "as per total Early/Late in minutes" : "Deduct " + +deduction_days + " days of " + percent_value + " % " + grossBasic}
    }

    //if (this.dataExist(late_early_days_for)) {
    //  return this.notifyService.ShowNotification(2, "Selected event already added")
    //}

    const lateEarlyDetailObj = {
      late_early_type_id_enum: late_early_type_id,
      late_early_days_for: late_early_days_for,
      late_early_policy_id: 0,
      is_allow_late_early_slab: is_allow_late_early_slab,
      min_late_early_min: min_late_early_min,
      max_late_early_min: max_late_early_min,
      is_leave_adjustment: is_leave_adjustment ,
      leave_in_min: leave_in_min,
      is_leave_as_late_early_min: is_leave_as_late_early_min,
      salary_head_id: salary_head_id,
      percent_value: percent_value,
      is_gross: is_gross,
      primary_salary_head_id: primary_salary_head_id,
      deduction_days: deduction_days,
      is_deduction_monthly_min: is_deduction_monthly_min === 'true' ? true : false ,
      rulesFor: rulesFor,
      description: description,
      leaveadjustment: leaveadjustment,
      Salaryadjustment: Salaryadjustment
    }


    if (this.isBenefitPolicyEdit) {
      let late_early_policy_id = this.rowData.late_early_policy_id;
      lateEarlyDetailObj.late_early_policy_id = late_early_policy_id;


      this.LateEarlyPolicyService.addLateEarlyDetailsForUpdate(lateEarlyDetailObj).subscribe(data => {

        if (data.MessageType == 1) {
          this.LateEarlyPolicyService.getLateEarlyPolicyDetailsById(late_early_policy_id).subscribe(data => {
            if (data != null) {
              this.setLateEarlyDataSource(data);
            }
         

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {



      this.latEarlySlabDataSources.push(lateEarlyDetailObj);
    }
  }
  setLateEarlyDataSource(res) {
    for (var i = 0; i < res.length; i++) {
      let rulesFor = '';
      let description = '';
      let Salaryadjustment = '';
      let leaveadjustment = '';
      let lateSlab = '';
      let grossBasic = res[i].is_gross ? "Gross" : "Basic";
      if (res[i].late_early_type_id_enum == 1) {
        rulesFor = "Late"
        lateSlab = res[i].min_late_early_min + " to " + res[i].max_late_early_min + " minutes";
        description = res[i].is_allow_late_early_slab ? res[i].late_early_days_for + " Days of Monthly Late (" + lateSlab + ")" : res[i].late_early_days_for + " Days of Monthly Late";
        if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual late min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0  + " day leave"; }
        if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total late in minutes" : "Deduct " + +res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }


      }
      if (res[i].late_early_type_id_enum == 2) {
        rulesFor = "Early"
        lateSlab = res[i].min_late_early_min + " to " + res[i].max_late_early_min + " minutes";
        description = res[i].is_allow_late_early_slab ? res[i].late_early_days_for + " Days of Monthly Early(" + lateSlab + ")" : res[i].late_early_days_for + " Days of Monthly Early";
        if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual early min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0  + " day leave"; }
        if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total early in minutes" : "Deduct " + + res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }
      }
      if (res[i].late_early_type_id_enum == 3) {
        rulesFor = "Both"
        lateSlab = res[i].min_late_early_min + " to " + res[i].max_late_early_min + " minutes";
        description = res[i].is_allow_late_early_slab ? res[i].late_early_days_for + " Days of Monthly Early/Late(" + lateSlab + ")" : res[i].late_early_days_for + " Days of Monthly Early/Late";
        if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual Early/Late min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0  + " day leave"; }
        if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total Early/Late in minutes" : "Deduct " + + res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }
      }
      res[i].rulesFor = rulesFor;
      res[i].description = description;
      res[i].leaveadjustment = leaveadjustment;
      res[i].Salaryadjustment = Salaryadjustment;
    }
    this.latEarlySlabDataSources = res;
  }
  // ...

  dataExist(late_early_days_for) {

    return this.latEarlySlabDataSources.some(function (el) {
      return el.late_early_days_for === late_early_days_for;
    });
  }
  removeEvent(a, row) {
    if (this.isBenefitPolicyEdit) {
      let late_early_policy_id = this.rowData.late_early_policy_id;


      this.LateEarlyPolicyService.removeLateEarlyDetailsForUpdate(row.lep_detail_id).subscribe(data => {

        if (data.MessageType == 1) {
          this.LateEarlyPolicyService.getLateEarlyPolicyDetailsById(late_early_policy_id).subscribe(data => {
            this.setLateEarlyDataSource(data);
            //this.latEarlySlabDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {
      this.latEarlySlabDataSources = this.latEarlySlabDataSources.slice(0, a).concat(this.latEarlySlabDataSources.slice(a + 1));
    }


  }
  resetForm() {
    this.lateEarlyPolicyForm.reset();
    this.isBenefitPolicyEdit = false;
    this.formInit();
    this.header = "New Late-Early Policy";
    this.getPolicyCode();
    this.isShownTimeslot = false; // hidden by default
    this.isShownHolidayDP = false;
    this.isShownOTBenefit = false;
    this.isShownLeaveBenefit = false;
    this.isShownMonetaryBenefit = false;
    this.latEarlySlabDataSources = [];

  }
  clear() {
    this.resetForm();

    this.toggle();

  }
}
