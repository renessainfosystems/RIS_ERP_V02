import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { OvetimepolicyService } from './ovetimepolicy.service';

@Component({
  selector: 'app-overtimepolicy',
  templateUrl: './overtimepolicy.component.html',
  styleUrls: ['./overtimepolicy.component.css']
})
export class OvertimepolicyComponent implements OnInit {
  overTimePolicyForm: any;
  otPolicies: any[];
  selectedotPolicie: any;
  otslabDataSources: any[] = [];
  isOTPolicyEdit: boolean = false;
  rowData: any;
  // for delete data modal
  display: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
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

  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private ovetimepolicyService: OvetimepolicyService) { }

  ngOnInit() {
    this.overTimePolicyForm = this.formbulider.group({
      policy_name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      minimum_OT_min: ['', [Validators.required]],
      maximum_OT_min: ['', [Validators.required]],
      OT_reduce_time_min: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      min_ot_slab: ['', [Validators.required]],
      max_ot_slab: ['', [Validators.required]],
      acheive_ot_slab: ['', [Validators.required]],
    });
    this.loadAllOTPolicies();
  }
  onRowSelect(event) {
    this.rowSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {
    this.rowSelected = false;
    this.rowData = null;


  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
    }
    else {
      this.collapsed = true;
    }

  }
  loadAllOTPolicies() {
    this.ovetimepolicyService.getAllOTPolicy().subscribe(data => {

      this.otPolicies = data;

    });
  }
  deleteOTPolicy() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let OT_policy_id = this.rowData.OTPolicyId;
    this.ovetimepolicyService.delete(OT_policy_id).subscribe(data => {

      this.loadAllOTPolicies();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }
  loadOTPolicyToEdit() {

    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
   
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    }
    this.collapsed = false;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    let OT_policy_id = this.rowData.OTPolicyId;

    this.ovetimepolicyService.getOTPolicySlabById(OT_policy_id).subscribe(res => {

      this.otslabDataSources = res;


    });
    this.isOTPolicyEdit = true;
    this.overTimePolicyForm.controls['policy_name'].setValue(this.rowData.PolicyName);
    this.overTimePolicyForm.controls['code'].setValue(this.rowData.Code);
    this.overTimePolicyForm.controls['minimum_OT_min'].setValue(this.rowData.MinimumOTMin);
    this.overTimePolicyForm.controls['maximum_OT_min'].setValue(this.rowData.MaximumOTMin);
    this.overTimePolicyForm.controls['OT_reduce_time_min'].setValue(this.rowData.OTReduceTimeMin);
    this.overTimePolicyForm.controls['remarks'].setValue(this.rowData.Remarks);


    //this.displayBasic = true;
  }
  SaveOTPolicy() {
    const data = this.overTimePolicyForm.value;

    if (!(data.policy_name)) {
      return this.notifyService.ShowNotification(2, "Please enter policy name")
    }
    if (data.minimum_OT_min && data.maximum_OT_min) {
      this.checkMaxOTSlab();
    }

    if (this.isOTPolicyEdit) {

      data.OT_policy_id = this.rowData.OTPolicyId;
      this.ovetimepolicyService.update(data).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllOTPolicies();
        this.isOTPolicyEdit = false;
      });
    }
    else {
      data.otPolicySlab = this.otslabDataSources;
      this.ovetimepolicyService.create(data).subscribe(
        result => {
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.loadAllOTPolicies();
        }
      );
    }

    // this.displayBasic = false;

  }
  checkMaxOTSlab() {
    let minimum_OT_min = this.overTimePolicyForm.get('minimum_OT_min')?.value;
    let maximum_OT_min = this.overTimePolicyForm.get('maximum_OT_min')?.value;
    let OT_reduce_time_min = this.overTimePolicyForm.get('OT_reduce_time_min')?.value;
    if (minimum_OT_min > maximum_OT_min) {
      return this.notifyService.ShowNotification(2, "Max OT  must be grater than Min OT");
    }

    if (OT_reduce_time_min && maximum_OT_min < OT_reduce_time_min) {
      return this.notifyService.ShowNotification(2, "OT Reduce time must be less than max OT");
    }

  }

  policyApprove() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    }
    let OT_policy_id = this.rowData.OTPolicyId;
    this.ovetimepolicyService.approve(OT_policy_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllOTPolicies();
      }
    );
  }

  policyActiveInactive() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    }
    let OT_policy_id = this.rowData.OTPolicyId;
    this.ovetimepolicyService.otPolicyActivity(OT_policy_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllOTPolicies();
      }
    );
  }

  addOTSlabInfo() {

    let minimum_OT_min = this.overTimePolicyForm.get('min_ot_slab')?.value;
    let maximum_OT_min = this.overTimePolicyForm.get('max_ot_slab')?.value;
    let acheive_OT_min = this.overTimePolicyForm.get('acheive_ot_slab')?.value;


    if (!minimum_OT_min) {
      return this.notifyService.ShowNotification(2, "Please enter min OT");
    }
    if (!maximum_OT_min) {
      return this.notifyService.ShowNotification(2, "Please enter max OT");
    }
    if (!acheive_OT_min) {
      return this.notifyService.ShowNotification(2, "Please enter acheive OT");
    }
    if (minimum_OT_min > maximum_OT_min) {
      return this.notifyService.ShowNotification(2, "Max OT Slab must be grater than Min OT");
    }


    const otslabobj = {

      minimum_OT_min: minimum_OT_min,
      maximum_OT_min: maximum_OT_min,
      acheive_OT_min: acheive_OT_min,
      OT_policy_id: 0
    }


    if (this.isOTPolicyEdit) {
      let OT_policy_id = this.rowData.OTPolicyId;
      otslabobj.OT_policy_id = OT_policy_id;

      if (this.dataExist(minimum_OT_min, maximum_OT_min)) {
        return this.notifyService.ShowNotification(2, "This slab already added")
      }

      this.ovetimepolicyService.addOTSlabForOTUpdate(otslabobj).subscribe(data => {

        if (data.MessageType == 1) {
          this.ovetimepolicyService.getOTPolicySlabById(OT_policy_id).subscribe(data => {

            this.otslabDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {



      this.otslabDataSources.push(otslabobj);
    }
  }

  // ...

  dataExist(minimum_OT_min, maximum_OT_min) {

    return this.otslabDataSources.some(function (el) {
      return (minimum_OT_min >= el.minimum_OT_min && minimum_OT_min <= el.maximum_OT_min)
        || (maximum_OT_min <= el.maximum_OT_min && maximum_OT_min >= el.maximum_OT_min);


    });
  }
  removeEvent(a, row) {
    if (this.isOTPolicyEdit) {
      let OT_policy_id = this.rowData.OTPolicyId;
      let minimum_OT_min = row.minimum_OT_min;


      this.ovetimepolicyService.removeOTSlabForOTUpdate(row.OT_policy_slab_id).subscribe(data => {

        if (data.MessageType == 1) {
          this.ovetimepolicyService.getOTPolicySlabById(OT_policy_id).subscribe(data => {

            this.otslabDataSources = data;

          });

        }
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      });
    }
    else {
      this.otslabDataSources = this.otslabDataSources.slice(0, a).concat(this.otslabDataSources.slice(a + 1));
    }


  }
  resetForm() {
    this.overTimePolicyForm.reset();
    this.isOTPolicyEdit = false;
    this.loadAllOTPolicies();
    this.otslabDataSources = [];
  }
}
