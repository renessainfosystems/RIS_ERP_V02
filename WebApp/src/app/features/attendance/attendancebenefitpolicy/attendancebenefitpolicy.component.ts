import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { ShiftinformationService } from '../shiftinformation/shiftinformation.service';
import { AttendancebenefitpolicyService } from './attendancebenefitpolicy.service';

@Component({
  selector: 'app-attendancebenefitpolicy',
  templateUrl: './attendancebenefitpolicy.component.html',
  styleUrls: ['./attendancebenefitpolicy.component.css']
}) 
export class AttendancebenefitpolicyComponent implements OnInit {
  displayBasic: boolean = false;
  benefitPolicyForm: any;
  OTDetailsForm: any;
  shiftSearchForm: any;
  otslabDataSources: any[] = [];
  benefitPolicies: any[];
  selectedPolicy: any;
  benefitType: any[];
  selectedBenefit: any;
  holidays: any[];
  selectedHoliday: any;
  leaveHeads: any[];
  selectedLeaveHead: any;
  otPolicies: any[];
  selectedOTPolicy: any;
  salaryheads: any[];
  selectedSalaryHead: any;
  isBenefitPolicyEdit: boolean = false;
  basicsalaryheads: any[];
  selectedBasicSalaryHead: any;
  OTDetailsModal: boolean = false;
  rowData: any;
  header: any = "New Benefit Policy";
  
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
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't delete this policy");
    }
    else
      this.display = true;
  }
  approveConfirm() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved");
    }
    else
      this.displayApprove = true;
  }
  
  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private AttendancebenefitpolicyService: AttendancebenefitpolicyService) { }

  ngOnInit() {
   
    this.formInit()


    this.loadAllBenefit();
    this.loadBenefitType();
    this.loadHoliday();
    this.loadSalaryHead();
    this.loadOTPolicy();
    this.loadBasicSalaryHead();
    this.loadLeaveHead();
    this.getPolicyCode();
  }

  formInit() {

    this.benefitPolicyForm = this.formbulider.group({
      abp_name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      benefit_work_on_id_enum: [0, [Validators.required]],
      remarks: ['', [Validators.required]],
      minimum_working_hour: [0, [Validators.required]],
      minimum_working_hour_min: [0, [Validators.required]],

      holiday_id: [0, [Validators.required]],
      OT_policy_id: [0, [Validators.required]],
      leave_head_id: [0, [Validators.required]],
      leave_amount: [0, [Validators.required]],
      time_start: ["00:00", [Validators.required]],
      time_end: ["00:00", [Validators.required]],
      leave_expire_day: [0, [Validators.required]],
      salary_head_id: [0, [Validators.required]],
      is_monetary_benefit: [false, [Validators.required]],
      is_leave_benefit: [false, [Validators.required]],
      is_OT_benefit: [false, [Validators.required]],

      leave_amount_d: [0, [Validators.required]],
      leave_amount_h: [0, [Validators.required]],
      fixed_value: [0, [Validators.required]],
      percent_value: [0, [Validators.required]],
      is_gross: [false, [Validators.required]],
      is_effect_on_payroll: [false, [Validators.required]],
      basic_salary_head_id: [0, [Validators.required]]
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
      this.benefitPolicyForm.controls['leave_head_id'].setValue(0);
    }
    else if (benefit_work_on_id_enum == 4) {
      this.isShownHolidayDP = true;
      this.isShownTimeslot = false;
      this.benefitPolicyForm.controls['time_start'].setValue('');
      this.benefitPolicyForm.controls['time_end'].setValue('');
    }
    else {
      this.isShownHolidayDP = false;
      this.isShownTimeslot = false;
      this.benefitPolicyForm.controls['leave_head_id'].setValue(0);
      this.benefitPolicyForm.controls['time_start'].setValue('');
      this.benefitPolicyForm.controls['time_end'].setValue('');
      
    }
  }
  onOTBenefitChange(event) {
    if (event.checked) {
      this.isShownOTBenefit = true;
     
    }
    else {
      this.benefitPolicyForm.controls['OT_policy_id'].setValue(0);
      this.isShownOTBenefit = false;
    
    }
  }
  onLeaveBenefitChange(event) {
    if (event.checked) {
      this.isShownLeaveBenefit = true;
     
    }
    else {
      this.benefitPolicyForm.controls['leave_head_id'].setValue(0);
      this.benefitPolicyForm.controls['leave_amount'].setValue(0);
      this.benefitPolicyForm.controls['leave_expire_day'].setValue(0);
      this.benefitPolicyForm.controls['leave_amount_h'].setValue(0);
      this.benefitPolicyForm.controls['leave_amount_d'].setValue(0);
      this.isShownLeaveBenefit = false;

    }
  }
  onMonetaryBenefitChange(event) {
    if (event.checked) {
      this.isShownMonetaryBenefit = true;
   
    }
    else {
      this.benefitPolicyForm.controls['salary_head_id'].setValue(0);
      this.benefitPolicyForm.controls['fixed_value'].setValue(0);
      this.benefitPolicyForm.controls['percent_value'].setValue(0);
      this.benefitPolicyForm.controls['is_gross'].setValue(false);
      this.benefitPolicyForm.controls['basic_salary_head_id'].setValue(0);
      this.benefitPolicyForm.controls['is_effect_on_payroll'].setValue(false);
      this.isShownMonetaryBenefit = false;
    }
  }
  loadBenefitType() {

    this.AttendancebenefitpolicyService.getEnumBenefitTypeOnWork().subscribe(data => {

      this.benefitType = data;

    });

  }


  loadSalaryHead() {
    this.AttendancebenefitpolicyService.getSalaryHeadForDP().subscribe(result => {
      this.salaryheads = result;
    });
    
  }
  loadBasicSalaryHead() {
    this.basicsalaryheads = [];
  }
  loadHoliday() {
    this.AttendancebenefitpolicyService.getAllHolidayForDP().subscribe(result => {
      this.holidays = result;
    });
  }
  loadOTPolicy() {
    this.AttendancebenefitpolicyService.getAllActiveOTPolicyForDP().subscribe(result => {
      this.otPolicies = result;
    });
  }
  getOTDetails() {
    let OT_policy_id = this.benefitPolicyForm.get('OT_policy_id')?.value;
    this.AttendancebenefitpolicyService.getOTPolicySlabById(OT_policy_id).subscribe(res => {

      this.otslabDataSources = res;


    });


    if (!OT_policy_id) {
      return this.notifyService.ShowNotification(3, 'Please select OT Policy');
    }
    this.AttendancebenefitpolicyService.getActiveOTPolicyById(OT_policy_id).subscribe(result => {
      this.OTDetailsForm.controls['minimum_OT_min'].setValue(result.MinimumOTMin);
      this.OTDetailsForm.controls['maximum_OT_min'].setValue(result.MaximumOTMin);
      this.OTDetailsForm.controls['OT_reduce_time_min'].setValue(result.OTReduceTimeMin);
    });
    this.OTDetailsModal = true;
  }
  loadLeaveHead() {
    this.AttendancebenefitpolicyService.getAllLeaveHeadForDP().subscribe(result => {
      this.leaveHeads = result;

    });
  }
  loadAllBenefit() {
    this.AttendancebenefitpolicyService.getAllAttendanceBenefitPolicy().subscribe(result => {
      this.benefitPolicies = result;

    });
  }

  deleteAttendanceBenefitPolicy() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
    }

    let abp_id = this.rowData.AbpId;
    this.AttendancebenefitpolicyService.delete(abp_id).subscribe(data => {

      if (data.MessageType == 1) {
       this.benefitPolicies.splice(this.benefitPolicies.findIndex(item => item.AbpId === abp_id), 1);
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

    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
    }
    this.resetForm();
    let abp_id = this.rowData.AbpId;

    this.AttendancebenefitpolicyService.getPolicyById(abp_id).subscribe(data => {
   
      this.benefitPolicyForm.controls['abp_name'].setValue(data.abp_name);
      this.benefitPolicyForm.controls['code'].setValue(data.code);
      this.benefitPolicyForm.controls['remarks'].setValue(data.remarks);
      this.benefitPolicyForm.controls['benefit_work_on_id_enum'].setValue(data.benefit_work_on_id_enum);
      this.benefitPolicyForm.controls['minimum_working_hour_min'].setValue(data.minimum_working_hour_min);
      this.benefitPolicyForm.controls['time_start'].setValue(data.time_start);
      this.benefitPolicyForm.controls['time_end'].setValue(data.time_end);
      this.benefitPolicyForm.controls['holiday_id'].setValue(data.holiday_id);
      this.benefitPolicyForm.controls['OT_policy_id'].setValue(data.OT_policy_id);
      this.benefitPolicyForm.controls['leave_head_id'].setValue(data.leave_head_id);
      this.benefitPolicyForm.controls['leave_amount'].setValue(data.leave_amount);
      this.benefitPolicyForm.controls['leave_expire_day'].setValue(data.leave_expire_day);
      this.benefitPolicyForm.controls['salary_head_id'].setValue(data.salary_head_id);
      this.benefitPolicyForm.controls['fixed_value'].setValue(data.fixed_value);
      this.benefitPolicyForm.controls['percent_value'].setValue(data.percent_value);
      this.benefitPolicyForm.controls['is_gross'].setValue(data.is_gross);
      this.benefitPolicyForm.controls['basic_salary_head_id'].setValue(data.basic_salary_head_id);
      this.benefitPolicyForm.controls['is_effect_on_payroll'].setValue(data.is_effect_on_payroll);
      if (data.leave_head_id > 0) {
        this.benefitPolicyForm.controls['is_leave_benefit'].setValue(true);
        this.isShownLeaveBenefit = true;
      }
      if (data.OT_policy_id > 0) {
        this.benefitPolicyForm.controls['is_OT_benefit'].setValue(true);
        this.isShownOTBenefit = true;
      }
      if (data.salary_head_id > 0) {
        this.benefitPolicyForm.controls['is_monetary_benefit'].setValue(true);
        this.isShownMonetaryBenefit = true;
      }
      if (data.benefit_work_on_id_enum == 1) {
       
        this.isShownTimeslot = true;
      }
      if (data.benefit_work_on_id_enum == 4) {

        this.isShownHolidayDP = true;
      }

      this.benefitPolicyForm.controls['minimum_working_hour'].setValue(data.minimum_working_hour_min / 60.00);
      this.benefitPolicyForm.controls['leave_amount_h'].setValue(data.leave_amount / 60.00);
      this.benefitPolicyForm.controls['leave_amount_d'].setValue(data.leave_amount / 480.00);
      this.isBenefitPolicyEdit = true;
    });
   
    this.header = "Edit Benefit Policy";
    this.toggle();
  }

  policyApprove() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved.");
    }
    let abp_id = this.rowData.AbpId;
    this.AttendancebenefitpolicyService.approve(abp_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.benefitPolicies.splice(this.benefitPolicies.findIndex(item => item.AbpId === abp_id), 1);
          this.benefitPolicies.unshift(result.Data);
          this.selectedPolicy = result.Data;
          this.rowSelected = true;
          this.rowData = result.Data;
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
    const data = this.benefitPolicyForm.value;
    if (!data.abp_name) {
      return this.notifyService.ShowNotification(2,"Please enter policy name");
    }
    if (!data.benefit_work_on_id_enum) {
      return this.notifyService.ShowNotification(2, "Please select work on type");
    }
    if (!data.minimum_working_hour_min) {
      return this.notifyService.ShowNotification(2, "Please enter minimum working hour");
    }
 
    if (data.benefit_work_on_id_enum == 1 && (!data.time_start || data.time_start == "00:00")) {

      return this.notifyService.ShowNotification(2, "Please select start time");
    }
    if (data.benefit_work_on_id_enum == 1 && (!data.time_end || data.time_end == "00:00")) {

      return this.notifyService.ShowNotification(2, "Please select end time");
    }

    
     if (data.is_OT_benefit && !data.OT_policy_id) {
       return this.notifyService.ShowNotification(2, "Please select OT policy");

    }
    if (data.is_leave_benefit && !data.leave_head_id) {
      return this.notifyService.ShowNotification(2, "Please select leave head");

    }
  
    if (data.is_leave_benefit && !data.leave_amount) {
      return this.notifyService.ShowNotification(2, "Please enter leave amount");

    }
    if (data.is_monetary_benefit && !data.salary_head_id) {
      return this.notifyService.ShowNotification(2, "Please select salary Head");

    }
    if (data.is_monetary_benefit && (!data.fixed_value && !data.percent_value)) {
      return this.notifyService.ShowNotification(2, "Please enter fixed amount or perncentage");

    }
    if (this.isBenefitPolicyEdit) {
  
      data.abp_id = this.rowData.AbpId;
      this.AttendancebenefitpolicyService.update(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.clear();
          this.benefitPolicies.splice(this.benefitPolicies.findIndex(item => item.AbpId === data.abp_id), 1);
          this.benefitPolicies.unshift(result.Data);
          this.selectedPolicy = result.Data;
          this.rowSelected = true;
          this.rowData = result.Data;
        }
       

      });
    }
    else {

    
      this.AttendancebenefitpolicyService.create(JSON.stringify(data)).subscribe(
        result => {
          if (result.MessageType == 1) {
            this.clear();
            this.benefitPolicies.unshift(result.Data);
            this.selectedPolicy = result.Data;
            this.rowSelected = true;
            this.rowData = result.Data;
          }
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
       
        }
      );
    }



  }


  
  getHourToMin() {
    var hour = this.benefitPolicyForm.value.minimum_working_hour;
 
    this.benefitPolicyForm.controls['minimum_working_hour_min'].setValue(hour * 60);
  }
  getDaytoHourToMin() {
    var day = this.benefitPolicyForm.value.leave_amount_d;
    var hour = day * 8;

    this.benefitPolicyForm.controls['leave_amount_h'].setValue(hour);
    this.benefitPolicyForm.controls['leave_amount'].setValue(hour * 60);
  }
  getHourToDayToMin() {
    var hour = this.benefitPolicyForm.value.leave_amount_h;
    var day = hour / 8.0;

    this.benefitPolicyForm.controls['leave_amount_d'].setValue(day);
    this.benefitPolicyForm.controls['leave_amount'].setValue(hour * 60);
  }
  checkFixedAmount() {

    let salaryheadid = this.benefitPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.benefitPolicyForm.controls['fixed_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Please select salary head")
   
    }
    let fixedAmount = this.benefitPolicyForm.value.fixed_value;
    if ( fixedAmount && fixedAmount > 0) {
      this.benefitPolicyForm.controls['percent_value'].setValue(0);
    }
    
  }
  checkPercentageAmount() {
    let salaryheadid = this.benefitPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.benefitPolicyForm.controls['percent_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.benefitPolicyForm.value.percent_value;
    if (percentageAmount && percentageAmount > 0) {
      this.benefitPolicyForm.controls['fixed_value'].setValue(0);
    }
  }
  checkIsGross() {

    let salaryheadid = this.benefitPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.benefitPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.benefitPolicyForm.value.percent_value;
    
    if (percentageAmount == 0) {
      this.benefitPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
    }
  }

  getPolicyCode() {

    this.AttendancebenefitpolicyService.getBenefitPolicyCode().subscribe(data => {
    
      this.benefitPolicyForm.controls['code'].setValue(data.code);

     
    });
  }

  resetForm() {
    this.benefitPolicyForm.reset();
    this.isBenefitPolicyEdit = false;
    this.formInit();
    this.header = "New Benefit Policy";
    this.getPolicyCode();
    this.isShownTimeslot = false; // hidden by default
    this.isShownHolidayDP = false;
    this.isShownOTBenefit = false;
    this.isShownLeaveBenefit = false;
    this.isShownMonetaryBenefit = false;
  }
  clear() {
    this.resetForm();
    this.toggle();
  }

}
