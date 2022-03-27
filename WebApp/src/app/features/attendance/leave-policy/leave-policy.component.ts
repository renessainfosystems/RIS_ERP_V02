import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

import { LeavePolicyService } from './leave-policy.service';

@Component({
    selector: 'app-leave-policy',
    templateUrl: './leave-policy.component.html',
    styleUrls: ['./leave-policy.component.scss']
})
export class LeavePolicyComponent implements OnInit {


    valCheck: string[] = [];
    valCheck2: string[] = [];



    leavePolicyForm: FormGroup;
    submitted = false;
    selectedPolicy: any;
    leavePolicies: any[];
    selectedRostercycle: any;
    allRosterCycle: any[];
    rosterDetails: any[] = [];
    selectedShift: any;

    selectedleaveTypes: any;
    leaveTypes: any[];

    selectedNextShift: any;
    allShifts: any[];

    rowData: any;
    rowSelected: boolean = false;
    isRosterEdit: boolean = false;
    displayApprove: boolean = false;
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
    //end grid and form show hide ********************
    // for delete data modal
    display: boolean = false;

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private LeavePolicyService: LeavePolicyService, private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.leavePolicyForm = this.formbulider.group({

            leave_policy_name: [null, [Validators.required]],
            next_shift_id: [null],
            shift_id: [null],
            code: [null],

            max_carry_forward: [null],
            max_carry_forwards: [null],
            leave_type_id: [null],



        });
        this.loadAllLeavePolicy();
        this.loadAllShift();
        this.loadAllRosterCycle();
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
        // this.displayBasic = true;
        this.toggleGridDisplay();
        this.leavePolicyForm.reset();
        this.leavePolicyForm.valid;
    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.leavePolicyForm.controls;
    }
    loadAllLeavePolicy() {
        this.LeavePolicyService.getAllLeavePolicy().subscribe(data => {
            this.leavePolicies = [];
        });
    }
    loadAllShift() {
        this.LeavePolicyService.getAllLeaveHeadForDP().subscribe(data => {

            this.leaveTypes = data;

            this.allShifts = data;

        });
    }
    loadAllRosterCycle() {
        this.LeavePolicyService.getPrimarySalaryHeadForDP().subscribe(data => {

            this.allRosterCycle = data;

            this.allShifts = data;

        });
    }


    loadRosterPolicyToEdit() {


        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
        }
        this.resetForm();
        let leave_policy_id = this.rowData.leave_policy_id;



        this.LeavePolicyService.getLeavePolicyById(leave_policy_id).subscribe(data => {

            this.leavePolicyForm.controls['leave_policy_name'].setValue(data.leave_policy_name);
            this.leavePolicyForm.controls['code'].setValue(data.code);
            this.isRosterEdit = true;
        });

        this.toggleGridDisplay();
    }

    deleteRoster() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
        }

        let leave_policy_id = this.rowData.leave_policy_id;
        this.LeavePolicyService.delete(leave_policy_id).subscribe(data => {


            if (data.MessageType == 1) {
                this.leavePolicies.splice(this.leavePolicies.findIndex(item => item.leave_policy_id === leave_policy_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }
    policyApprove() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved.");
        }
        let leave_policy_id = this.rowData.leave_policy_id;
        this.LeavePolicyService.approve(leave_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.leavePolicies.splice(this.leavePolicies.findIndex(item => item.leave_policy_id === leave_policy_id), 1);
                    this.leavePolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayApprove = false;
                }
            }
        );
    }

    saveRosterPolicy() {
        const data = this.leavePolicyForm.value;

        this.submitted = true;

        if (this.leavePolicyForm.invalid) {

            return;
        }
        if (this.isRosterEdit) {

            data.leave_policy_id = this.rowData.leave_policy_id;
            this.LeavePolicyService.update(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.leavePolicies.splice(this.leavePolicies.findIndex(item => item.leave_policy_id === data.leave_policy_id), 1);
                    this.leavePolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                }


            });
        }
        else {

            data.rosterDetails = this.rosterDetails;
            this.LeavePolicyService.create(JSON.stringify(data)).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.resetForm();
                        this.leavePolicies.unshift(result.Data[0]);
                        this.selectedPolicy = result.Data[0];
                        this.rowSelected = true;
                        this.rowData = result.Data[0];
                        this.toggleFormDisplay();
                    }
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                }
            );
        }



    }
    approveModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
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
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteRoster();
            },
            reject: () => {

            }
        });
    }
    resetForm() {
        this.leavePolicyForm.reset();
        this.rosterDetails = [];
        this.submitted = false;
        this.isRosterEdit = false;
    }

}
