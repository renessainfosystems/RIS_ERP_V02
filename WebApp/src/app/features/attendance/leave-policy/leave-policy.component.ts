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
    valRadio: string;


    leavePolicyForm: FormGroup;
    submitted = false;
    selectedPolicy: any;
    leavePolicies: any[];
    selectedRostercycle: any;
    allRosterCycle: any[];
    rosterDetails: any[] = [];
    selectedShift: any;

    selectedleaveTypes: any;
    leaveHeads: any[];
    salaryheads: any[];
    selectedNextShift: any;
    allShifts: any[];

    rowData: any;
    rowSelected: boolean = false;
    isLeavePolicyEdit: boolean = false;
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
            remarks: [null],
            is_proportionate: [false],
            leave_head_id: [null, [Validators.required]],
            default_leave_balance_day: [null],
            default_leave_balance_min: [null],
            max_enjoyable_limit_min: [null],
            max_carry_leave_limit_min: [null],
            max_carry_year: [null],
            is_hourly: [null],
            is_attachment_required: [null],
            attachment_required_for_min: [null],
            is_allow_sandwich: [null],
            is_sandwich_dayoff: [null],
            is_sandwich_holiday: [null],
            is_sandwich_uneven: [null],
            is_prefix: [null],
            is_prefix_dayoff: [null],
            is_prefix_holiday: [null],
            is_prefix_uneven: [null],
            is_sufix: [null],
            is_sufix_dayoff: [null],
            is_sufix_holiday: [null],
            is_sufix_uneven: [null],
            is_required_purpose: [null],
            purpose_required_for_min: [null],
            is_leave_area_required: [null],
            area_required_for_min: [null],
            is_responsible_person_required: [null],
            responsible_person_required_for_min: [null],
            is_negetive_balance: [null],
            notice_period: [null],
            notice_required_for_min: [null],
            earn_day_count: [null],
            is_earn_dayoff: [null],
            is_earn_holiday: [null],
            is_earn_uneven: [null],
            is_earn_absent: [null],
            encash_leave_balance_limit_min: [null],
            encash_fixed_amount: [null],
            encash_amount_percent: [null],
            is_gross: [null],
            salary_head_id: [null],
            activation_days: [null],
            is_activation_on_joining: ['1', [Validators.required]],


        });
        this.loadAllLeavePolicy();
        this.loadSalaryHead();
        this.loadLeaveHead();
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
    loadSalaryHead() {
        this.LeavePolicyService.getPrimarySalaryHeadForDP().subscribe(data => {

            this.salaryheads = data;

            

        });
    }
    loadLeaveHead() {
        this.LeavePolicyService.getAllLeaveHeadForDP().subscribe(data => {

            this.leaveHeads = data;

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
            this.isLeavePolicyEdit = true;
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

    saveLeavePolicy() {
        const data = this.leavePolicyForm.value;

        this.submitted = true;

        if (this.leavePolicyForm.invalid) {

            return;
        }
        if (this.isLeavePolicyEdit) {

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
        this.isLeavePolicyEdit = false;
    }

}
