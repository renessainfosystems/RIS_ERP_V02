import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
    submitted = false;

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;

    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormClose() {
        this.toggleFormDisplay();
        this.resetForm();
    }
    showBasicDialog() {
        this.toggleGridDisplay();
        this.overTimePolicyForm.valid;
    }

    // for delete data modal
    display: boolean = false;
    rowSelected: boolean = false;

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

    constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private confirmationService: ConfirmationService, private ovetimepolicyService: OvetimepolicyService) { }

    ngOnInit() {
        this.formInit();
        this.loadAllOTPolicies();
    }


    formInit() {
        this.overTimePolicyForm = this.formbulider.group({
            policy_name: [null, [Validators.required]],
            code: [''],
            minimum_OT_min: [0],
            maximum_OT_min: [0],
            OT_reduce_time_min: [0],
            remarks: [''],
            min_ot_slab: [0],
            max_ot_slab: [0],
            acheive_ot_slab: [0],
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

    loadAllOTPolicies() {
        this.ovetimepolicyService.getAllOTPolicy().subscribe(data => {
            debugger
            this.otPolicies = data;
            console.log(this.otPolicies)
        });
    }
    deleteOTPolicy() {
    
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved,you can't delete this policy");
        }

        let OT_policy_id = this.rowData.OTPolicyId;
        this.ovetimepolicyService.delete(OT_policy_id).subscribe(data => {

            if (data.MessageType == 1) {
                this.otPolicies.splice(this.otPolicies.findIndex(item => item.OTPolicyId === OT_policy_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.rowData = null;
    }
    loadOTPolicyToEdit() {
        
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
        }


        let OT_policy_id = this.rowData.OTPolicyId;

        this.ovetimepolicyService.getOTPolicySlabById(OT_policy_id).subscribe(res => {

            this.otslabDataSources = res;


        });

        this.resetForm();

        this.overTimePolicyForm.controls['policy_name'].setValue(this.rowData.PolicyName);
        this.overTimePolicyForm.controls['code'].setValue(this.rowData.Code);
        this.overTimePolicyForm.controls['minimum_OT_min'].setValue(this.rowData.MinimumOTMin);
        this.overTimePolicyForm.controls['maximum_OT_min'].setValue(this.rowData.MaximumOTMin);
        this.overTimePolicyForm.controls['OT_reduce_time_min'].setValue(this.rowData.OTReduceTimeMin);
        this.overTimePolicyForm.controls['remarks'].setValue(this.rowData.Remarks);
         this.isOTPolicyEdit = true;
        this.toggleGridDisplay();

    }
    SaveOTPolicy() {
        const data = this.overTimePolicyForm.value;

        this.submitted = true;

        if (this.overTimePolicyForm.invalid) {

            return;
        }
        if (data.minimum_OT_min && data.maximum_OT_min) {
            this.checkMaxOTSlab();
        }

        if (this.isOTPolicyEdit) {
           debugger
            data.OT_policy_id = this.rowData.OTPolicyId;
            this.ovetimepolicyService.update(data).subscribe(result => {
                if (result.MessageType == 1) {
                    this.resetForm();
                  
                    this.otPolicies.splice(this.otPolicies.findIndex(item => item.OTPolicyId === data.OT_policy_id), 1);
                    this.otPolicies.unshift(result.Data[0]);
                    this.selectedotPolicie = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                }
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
               
            });
        }
        else {
            data.otPolicySlab = this.otslabDataSources;
            this.ovetimepolicyService.create(data).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.resetForm();
                        console.log(result)
                        this.otPolicies.unshift(result.Data[0]);
                        this.selectedotPolicie = result.Data[0];
                        this.rowSelected = true;
                        this.rowData = result.Data[0];
                        this.toggleFormDisplay();
                    }
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                   
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
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        this.ovetimepolicyService.approve(this.rowData.OTPolicyId).subscribe(
            result => {
                if (result.MessageType == 1) {
                    this.otPolicies.splice(this.otPolicies.findIndex(item => item.OTPolicyId === this.rowData.OTPolicyId), 1);
                    this.otPolicies.unshift(result.Data[0]);
                    this.selectedotPolicie = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    
                }
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        
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

    approveModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved,you can't delete this policy");
        }
        this.confirmationService.confirm({
            key: 'approve',
            target: event.target,
            message: 'Are you sure that you want to approve?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.policyApprove();
            },
            reject: () => {

            }
        });
    }
    deleteModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved,you can't delete this policy");
        }
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteOTPolicy();
            },
            reject: () => {

            }
        });
    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.overTimePolicyForm.controls;
    }
    resetForm() {
        this.formInit();
        this.isOTPolicyEdit = false;
        this.otslabDataSources = [];
        this.submitted = false;
     
    }
}
