import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { AttendancebenefitpolicyService } from '../attendancebenefitpolicy/attendancebenefitpolicy.service';
import { ShiftinformationService } from '../shiftinformation/shiftinformation.service';
import { AbsenteeismPolicyService } from './absenteeism-policy.service';


@Component({
  selector: 'app-absenteeism-policy',
  templateUrl: './absenteeism-policy.component.html',
  styleUrls: ['./absenteeism-policy.component.css']
})

export class AbsenteeismPolicyComponent implements OnInit {
  displayBasic: boolean = false;
  AbsenteeismPolicyForm: any;
  AbsenteeismPolicies: any[];
  selectedPolicy: any;
  salaryheads: any[];
  selectedSalaryHead: any;
  isAbsenteeismPolicyEdit: boolean = false;
  basicsalaryheads: any[];
  selectedBasicSalaryHead: any;
  rowData: any;
  header: any = "New Absenteeism Policy";

  // for delete data modal
  display: boolean = false;
  displayApprove: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
  collapsedAbsenteeismList = false;
  isShownMonetaryBenefit: boolean = false;
  isbasichead: boolean = true;
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

  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private absenteeismPolicyService: AbsenteeismPolicyService) { }

  ngOnInit() {

    this.formInit()


    this.loadAllAbsenteeismPolicy();
                           
    this.loadSalaryHead();
   
    this.loadBasicSalaryHead();
  
    this.getPolicyCode();
  }

  formInit() {

    this.AbsenteeismPolicyForm = this.formbulider.group({
      absenteeism_policy_name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      is_leave_adjustment: [false, [Validators.required]],
      remarks: ['', [Validators.required]],
      salary_head_id: [0, [Validators.required]],
      is_monetary_benefit: [false, [Validators.required]],
      percent_value: [0, [Validators.required]],
      is_gross: [false, [Validators.required]],
      basic_salary_head_id: [0, [Validators.required]]
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

  onMonetaryBenefitChange(event) {
    if (event.checked) {
      this.isShownMonetaryBenefit = true;

    }
    else {
      this.AbsenteeismPolicyForm.controls['salary_head_id'].setValue(0);
      this.AbsenteeismPolicyForm.controls['percent_value'].setValue(0);
      this.AbsenteeismPolicyForm.controls['is_gross'].setValue(false);
      this.AbsenteeismPolicyForm.controls['basic_salary_head_id'].setValue(0);
      this.isShownMonetaryBenefit = false;
    }
  }



  loadSalaryHead() {
    this.absenteeismPolicyService.getSalaryHeadForDP().subscribe(result => {
      this.salaryheads = result;
    });

  }
  loadBasicSalaryHead() {
    this.basicsalaryheads = [];
  }


  loadAllAbsenteeismPolicy() {
    this.absenteeismPolicyService.getAllAbsenteeismPolicy().subscribe(result => {
      this.AbsenteeismPolicies = result;

    });
  }

  deleteAbsenteeismPolicy() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
    }

    let absenteeism_policy_id = this.rowData.absenteeism_policy_id;
    this.absenteeismPolicyService.delete(absenteeism_policy_id).subscribe(data => {

      if (data.MessageType == 1) {
        this.AbsenteeismPolicies.splice(this.AbsenteeismPolicies.findIndex(item => item.absenteeism_policy_id === absenteeism_policy_id), 1);
      }
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
      this.collapsedAbsenteeismList = true;
    }
    else {
      this.collapsed = true;
      this.collapsedAbsenteeismList = false;
    }

  }


  // ...



  loadAbsenteeismPolicyToEdit() {

    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
    }
    this.resetForm();
    let absenteeism_policy_id = this.rowData.absenteeism_policy_id;

    this.absenteeismPolicyService.getPolicyById(absenteeism_policy_id).subscribe(data => {

      this.AbsenteeismPolicyForm.controls['absenteeism_policy_name'].setValue(data.absenteeism_policy_name);
      this.AbsenteeismPolicyForm.controls['code'].setValue(data.code);
      this.AbsenteeismPolicyForm.controls['remarks'].setValue(data.remarks);
      this.AbsenteeismPolicyForm.controls['is_leave_adjustment'].setValue(data.is_leave_adjustment);
      this.AbsenteeismPolicyForm.controls['salary_head_id'].setValue(data.salary_head_id);
      this.AbsenteeismPolicyForm.controls['percent_value'].setValue(data.percent_value);
      this.AbsenteeismPolicyForm.controls['is_gross'].setValue(data.is_gross);
      this.AbsenteeismPolicyForm.controls['basic_salary_head_id'].setValue(data.basic_salary_head_id);

    
     
      if (data.salary_head_id > 0) {
        this.AbsenteeismPolicyForm.controls['is_monetary_benefit'].setValue(true);
        this.isShownMonetaryBenefit = true;
      }

      this.isAbsenteeismPolicyEdit = true;
    });

    this.header = "Edit Absenteeism Policy";

    this.toggle();
  }

  policyApprove() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.approvedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved.");
    }
    let absenteeism_policy_id = this.rowData.absenteeism_policy_id;
    this.absenteeismPolicyService.approve(absenteeism_policy_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType == 1) {
          this.AbsenteeismPolicies.splice(this.AbsenteeismPolicies.findIndex(item => item.absenteeism_policy_id === absenteeism_policy_id), 1);
          this.AbsenteeismPolicies.unshift(result.Data);
          this.selectedPolicy = result.Data;
          this.rowSelected = true;
          this.rowData = result.Data;
          this.displayApprove = false;
        }
      }
    );
  }

  saveAbsenteeismPolicy() {
    const data = this.AbsenteeismPolicyForm.value;
    if (!data.absenteeism_policy_name) {
      return this.notifyService.ShowNotification(2, "Please enter policy name");
    }
  
    if (data.is_monetary_benefit && !data.salary_head_id) {
      return this.notifyService.ShowNotification(2, "Please select salary Head");

    }
    if (data.is_monetary_benefit && ( !data.percent_value)) {
      return this.notifyService.ShowNotification(2, "Please enter perncentage");

    }
    if (data.is_monetary_benefit && data.percent_value == 0) {
      return this.notifyService.ShowNotification(2, "Perncentage amount must be 1-100");
    }
   

  
    if (this.isAbsenteeismPolicyEdit) {

      data.absenteeism_policy_id = this.rowData.absenteeism_policy_id;
      this.absenteeismPolicyService.update(data).subscribe(result => {
        if (result.MessageType == 1) {
          this.clear();
          this.AbsenteeismPolicies.splice(this.AbsenteeismPolicies.findIndex(item => item.absenteeism_policy_id === data.absenteeism_policy_id), 1);
          this.AbsenteeismPolicies.unshift(result.Data);
          this.selectedPolicy = result.Data;
          this.rowSelected = true;
          this.rowData = result.Data;
        }
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
       


      });
    }
    else {


      this.absenteeismPolicyService.create((data)).subscribe(
        result => {
          if (result.MessageType == 1) {
            this.clear();
            this.AbsenteeismPolicies.unshift(result.Data);
            this.selectedPolicy = result.Data;
            this.rowSelected = true;
            this.rowData = result.Data;
          }
        
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

        }
      );
    }



  }

  checkPercentageAmount() {
    let salaryheadid = this.AbsenteeismPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.AbsenteeismPolicyForm.controls['percent_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.AbsenteeismPolicyForm.value.percent_value;
    if (percentageAmount > 100) {
      this.AbsenteeismPolicyForm.controls['percent_value'].setValue(0);
      return this.notifyService.ShowNotification(2, "Percent value must be 1-100")
    }

  }
  checkIsGross() {
    let isgross = this.AbsenteeismPolicyForm.value.is_gross;
    if (isgross == false) {
      this.isbasichead = true;
    }
    else {
      this.isbasichead = false;
    }


    let salaryheadid = this.AbsenteeismPolicyForm.value.salary_head_id;
    if (!salaryheadid) {
      this.AbsenteeismPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Please select salary head")
    }
    let percentageAmount = this.AbsenteeismPolicyForm.value.percent_value;

    if (percentageAmount == 0) {
      this.AbsenteeismPolicyForm.controls['is_gross'].setValue(false);
      return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
    }
  }

  getPolicyCode() {

    this.absenteeismPolicyService.getPolicyCode().subscribe(data => {

      this.AbsenteeismPolicyForm.controls['code'].setValue(data.code);


    });
  }

  resetForm() {
    this.AbsenteeismPolicyForm.reset();
    this.isAbsenteeismPolicyEdit = false;
    this.formInit();
    this.header = "New Absenteeism Policy";
    this.getPolicyCode();
    this.isShownMonetaryBenefit = false;
    this.isbasichead = true;

  }
  clear() {
    this.resetForm();
    this.toggle();
   
  }


}
