import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    valRadio: boolean=true;
    selectedJoiningValue: boolean = true;

    leavePolicyForm: any;
    submitted = false;
    selectedPolicy: any;
    leavePolicies: any[];
    selectedRostercycle: any;
    allRosterCycle: any[];
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
    //Check Uncheck hidden by default
    isShownSandwich: boolean = false;
    isShownSuffix: boolean = false;
    isShownPrefix: boolean = false;
    isShownRequiredPurpose: boolean = false;
    isShownAreaRequired: boolean = false;
    isShownResponsilbleRequired: boolean = false;
    isShownNegativeBalance: boolean = false;
    isShownAttachmentRequired: boolean = false;
    isShownEarnLeave: boolean = false;
    //end grid and form show hide ********************
    // for delete data modal
    display: boolean = false;
    
    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private LeavePolicyService: LeavePolicyService, private notifyService: NotificationService) { }

    ngOnInit() {
        this.formInit();
        this.loadAllLeavePolicy();
        this.loadSalaryHead();
        this.loadLeaveHead();
        this.getPolicyCode();
    }
    formInit() {
        this.leavePolicyForm = this.formbulider.group({

            leave_policy_name: ["", [Validators.required]],
            code: [this.getPolicyCode()],
            remarks: [''],
            is_proportionate: [false],
            leave_head_id: [0, [Validators.required]],
            default_leave_balance_day: [null],
            default_leave_balance_min: [0],
            max_enjoyable_limit_min: [0],
            max_enjoyable_limit_min_all: [false],
            max_carry_leave_limit_min: [0],
            max_carry_leave_limit_min_all: [false],
            max_carry_year: [0],
            is_hourly: [false],
            is_attachment_required: [false],
            attachment_required_for_min: [0],
            is_allow_sandwich: [false],
            is_sandwich_dayoff: [false],
            is_sandwich_holiday: [false],
            is_sandwich_uneven: [false],
            is_prefix: [false],
            is_prefix_dayoff: [false],
            is_prefix_holiday: [false],
            is_prefix_uneven: [false],
            is_sufix: [false],
            is_sufix_dayoff: [false],
            is_sufix_holiday: [false],
            is_sufix_uneven: [false],
            is_required_purpose: [false],
            purpose_required_for_min: [0],
            is_leave_area_required: [false],
            area_required_for_min: [0],
            is_responsible_person_required: [false],
            responsible_person_required_for_min: [0],
            is_negetive_balance: [false],
            max_negetive_balance_min: [0],
            notice_period: [0],
            notice_required_for_min: [0],
            earn_day_count: [0],
            is_earn_dayoff: [false],
            is_earn_holiday: [false],
            is_earn_uneven: [false],
            is_earn_absent: [false],
            encash_leave_balance_limit_min: [0],
            encash_fixed_amount: [0],
            encash_amount_percent: [0],
            is_gross: [false],
            salary_head_id: [0],
            activation_days: [0],
            is_activation_on_joining: [true],
            description: ['']

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

    showBasicDialog() {
       this.toggleGridDisplay();
        //this.leavePolicyForm.reset();
        this.formInit();
        this.leavePolicyForm.valid;

    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.leavePolicyForm.controls;
    }
    onAllowAttachmentRequired(event) {
        if (event.checked) {
            this.isShownAttachmentRequired = true;

        }
        else {

            this.leavePolicyForm.controls['attachment_required_for_min'].setValue(false);
            this.isShownAttachmentRequired = false;
            
        }
    }
    onAllowSandwich(event) {
        if (event.checked) {
            this.isShownSandwich = true;

        }
        else {
         
            this.leavePolicyForm.controls['is_sandwich_dayoff'].setValue(false);
            this.leavePolicyForm.controls['is_sandwich_holiday'].setValue(false);
            this.leavePolicyForm.controls['is_sandwich_uneven'].setValue(false);
            this.isShownSandwich = false;

        }
    }
    onAllowSuffix(event) {
        if (event.checked) {
            this.isShownSuffix = true;

        }
        else {

            this.leavePolicyForm.controls['is_sufix_dayoff'].setValue(false);
            this.leavePolicyForm.controls['is_sufix_holiday'].setValue(false);
            this.leavePolicyForm.controls['is_sufix_uneven'].setValue(false);
            this.isShownSuffix = false;

        }
    }
    onAllowPrefix(event) {
        if (event.checked) {
            this.isShownPrefix = true;

        }
        else {

            this.leavePolicyForm.controls['is_prefix_dayoff'].setValue(false);
            this.leavePolicyForm.controls['is_prefix_holiday'].setValue(false);
            this.leavePolicyForm.controls['is_prefix_uneven'].setValue(false);
            this.isShownPrefix = false;

        }
    }
    onAllowPurposeRequired(event) {
        if (event.checked) {
            this.isShownRequiredPurpose = true;

        }
        else {

            this.leavePolicyForm.controls['purpose_required_for_min'].setValue(0);
            this.isShownRequiredPurpose = false;

        }
    }
    onAllowLeaveAreaRequired(event) {
        if (event.checked) {
            this.isShownAreaRequired = true;

        }
        else {

            this.leavePolicyForm.controls['area_required_for_min'].setValue(0);
            this.isShownAreaRequired = false;

        }
    }
    onAllowPersonRequired(event) {
        if (event.checked) {
            this.isShownResponsilbleRequired = true;

        }
        else {
            
            this.leavePolicyForm.controls['responsible_person_required_for_min'].setValue(0);
            this.isShownResponsilbleRequired = false;

        }
    }
    onAllowNegativeBalance(event) {
        if (event.checked) {
            this.isShownNegativeBalance = true;

        }
        else {
            
            this.leavePolicyForm.controls['max_negetive_balance_min'].setValue(0);
            this.isShownNegativeBalance = false;

        }
    }

    setDefaultBalanceToEnjoyableLimit(event) {
        
        if (event.checked) {
            this.leavePolicyForm.controls['max_enjoyable_limit_min'].setValue(this.leavePolicyForm.value.default_leave_balance_day);

        }
        else {

            this.leavePolicyForm.controls['max_enjoyable_limit_min'].setValue(0);
    
        }
    }
    setDefaultBalanceToCarryLimit(event) {

        if (event.checked) {
            this.leavePolicyForm.controls['max_carry_leave_limit_min'].setValue(this.leavePolicyForm.value.default_leave_balance_day);

        }
        else {

            this.leavePolicyForm.controls['max_carry_leave_limit_min'].setValue(0);

        }
    }
    loadAllLeavePolicy() {
        this.LeavePolicyService.getAllLeavePolicy().subscribe(data => {
            this.leavePolicies = data;
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

            this.leavePolicyForm.setValue({
                leave_policy_name: data.leave_policy_name,
                code: data.code,
                remarks: data.remarks,
                is_proportionate: data.is_proportionate,
                leave_head_id: data.leave_head_id,
                default_leave_balance_day: data.default_leave_balance_day,
                default_leave_balance_min: data.default_leave_balance_min,
                max_enjoyable_limit_min: data.max_enjoyable_limit_min/60.0,
                max_enjoyable_limit_min_all:1,
                max_carry_leave_limit_min: data.max_carry_leave_limit_min/60.0,
                max_carry_leave_limit_min_all:1,
                max_carry_year: data.max_carry_year,
                is_hourly: data.is_hourly,
                is_attachment_required: data.is_attachment_required ,
                attachment_required_for_min: data.attachment_required_for_min/60,
                is_allow_sandwich: data.is_allow_sandwich,
                is_sandwich_dayoff: data.is_sandwich_dayoff,
                is_sandwich_holiday: data.is_sandwich_holiday,
                is_sandwich_uneven: data.is_sandwich_uneven,
                is_prefix: data.is_prefix,
                is_prefix_dayoff: data.is_prefix_dayoff ,
                is_prefix_holiday: data.is_prefix_holiday,
                is_prefix_uneven: data.is_prefix_uneven,
                is_sufix: data.is_sufix,
                is_sufix_dayoff: data.is_sufix_dayoff,
                is_sufix_holiday: data.is_sufix_holiday,
                is_sufix_uneven: data.is_sufix_uneven,
                is_required_purpose: data.is_required_purpose,
                purpose_required_for_min: data.purpose_required_for_min/60.0,
                is_leave_area_required: data.is_leave_area_required,
                area_required_for_min: data.area_required_for_min/60.0,
                is_responsible_person_required: data.is_responsible_person_required,
                responsible_person_required_for_min: data.responsible_person_required_for_min/60.0,
                is_negetive_balance: data.is_negetive_balance,
                max_negetive_balance_min: data.max_negetive_balance_min/60.0,
                notice_period: data.notice_period,
                notice_required_for_min: data.notice_required_for_min/60.0,
                earn_day_count: data.earn_day_count,
                is_earn_dayoff: data.is_earn_dayoff,
                is_earn_holiday: data.is_earn_holiday,
                is_earn_uneven: data.is_earn_uneven,
                is_earn_absent: data.is_earn_absent,
                encash_leave_balance_limit_min: data.encash_leave_balance_limit_min/60.0,
                encash_fixed_amount: data.encash_fixed_amount,
                encash_amount_percent: data.encash_amount_percent,
                is_gross: data.is_gross,
                salary_head_id: data.salary_head_id,
                activation_days: data.activation_days,
                is_activation_on_joining: data.is_activation_on_joining,
                description: ''
            });

            let leaveHeadId = data.leave_head_id;
            let list = this.leaveHeads.filter(
                book => book.LeaveHeadId === leaveHeadId);
            this.leavePolicyForm.controls['description'].setValue('[' + list[0].LeaveHeadShortName + ': ' + list[0].LeaveTypeName + '] ' + '[Applicable for: ' + list[0].RequiredFor + ']');
            if (list[0].LeaveTypeIdEnum === 3) {
                this.isShownEarnLeave = true;
            }
            else
            {
                this.isShownEarnLeave = false;
                this.leavePolicyForm.controls['encash_fixed_amount'].setValue(0);
                this.leavePolicyForm.controls['encash_leave_balance_limit_min'].setValue(0);
                this.leavePolicyForm.controls['encash_amount_percent'].setValue(0);
                this.leavePolicyForm.controls['salary_head_id'].setValue(0);
                this.leavePolicyForm.controls['is_gross'].setValue(false);
            }
         
            this.isShownAttachmentRequired = (data.is_attachment_required) ? true : false;
            this.isShownSandwich = (data.is_allow_sandwich) ? true : false;
            this.isShownPrefix = (data.is_prefix) ? true : false;
            this.isShownSuffix = (data.is_sufix) ? true : false;
            this.isShownRequiredPurpose = (data.is_required_purpose) ? true : false;
            this.isShownAreaRequired = (data.is_leave_area_required) ? true : false;
            this.isShownResponsilbleRequired = (data.is_responsible_person_required) ? true : false;
            this.isShownNegativeBalance = (data.is_negetive_balance) ? true : false;
            this.isLeavePolicyEdit = true;
        });

        this.toggleGridDisplay();
    }

    deleteLeavePolicy() {
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
                    this.leavePolicies.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.displayApprove = false;
                }
            }
        );
    }
    policyCopy() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved.");
        }
        let leave_policy_id = this.rowData.leave_policy_id;
        this.LeavePolicyService.Copy(leave_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.leavePolicies.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
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
                    this.leavePolicies.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.toggleFormDisplay();
                }


            });
        }
        else {

            
            this.LeavePolicyService.create(JSON.stringify(data)).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.resetForm();
                        this.leavePolicies.unshift(result.Data);
                        this.selectedPolicy = result.Data;
                        this.rowSelected = true;
                        this.rowData = result.Data;
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
    copyModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        this.confirmationService.confirm({
            key: 'copy',
            target: event.target,
            message: 'Are you sure that you want to copy?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.policyCopy();
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
                this.deleteLeavePolicy();
            },
            reject: () => {

            }
        });
    }
    getPolicyCode() {

        this.LeavePolicyService.getLeavePolicyCode().subscribe(data => {

            this.leavePolicyForm.controls['code'].setValue(data.code);


        });
    }
    policyNameSearch(event)
    {
        const inputValue = event.target.value;

        this.LeavePolicyService.getLeavePolicyByName(inputValue).subscribe(result => {
           
                this.resetForm();
                this.leavePolicies = [];
                this.leavePolicies = result;
            
        });
    }

    onLeaveHeadChange(event) {
        let leaveHeadId = event.value;
        let data=    this.leaveHeads.filter(
            book => book.LeaveHeadId === leaveHeadId);
        this.leavePolicyForm.controls['description'].setValue('['+data[0].LeaveHeadShortName + ': ' + data[0].LeaveTypeName +'] '+ '[Applicable for: ' +  data[0].RequiredFor +']');
        if (data[0].LeaveTypeIdEnum === 3) {
            this.isShownEarnLeave = true;
        }
        else {
            this.isShownEarnLeave = false;
            this.leavePolicyForm.controls['encash_fixed_amount'].setValue(0);
            this.leavePolicyForm.controls['encash_leave_balance_limit_min'].setValue(0);
            this.leavePolicyForm.controls['encash_amount_percent'].setValue(0);
            this.leavePolicyForm.controls['salary_head_id'].setValue(0);
            this.leavePolicyForm.controls['is_gross'].setValue(false);
        }
    }

    checkPercentageAmount() {
        let encashfixedamount = this.leavePolicyForm.value.encash_fixed_amount;
        let percentageAmount = this.leavePolicyForm.value.encash_amount_percent;
        if (percentageAmount && percentageAmount > 0) {
            this.leavePolicyForm.controls['encash_fixed_amount'].setValue(0);
        }
        if (encashfixedamount && encashfixedamount > 0) {
            this.leavePolicyForm.controls['encash_amount_percent'].setValue(0);
        }
    }
    checkIsGross() {

        let salaryheadid = this.leavePolicyForm.value.salary_head_id;
        let is_gross = this.leavePolicyForm.value.is_gross;
      
        let percentageAmount = this.leavePolicyForm.value.encash_amount_percent;

        if (percentageAmount == 0) {
            this.leavePolicyForm.controls['is_gross'].setValue(false);
            return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
        }
        if (is_gross) {
            this.leavePolicyForm.controls['salary_head_id'].setValue(0);
        }

    }

    checkPrimaryHead() {

        let salaryheadid = this.leavePolicyForm.value.salary_head_id;
        let is_gross = this.leavePolicyForm.value.is_gross;
       
        let percentageAmount = this.leavePolicyForm.value.encash_amount_percent;

        if (percentageAmount == 0) {
            this.leavePolicyForm.controls['is_gross'].setValue(false);
            return this.notifyService.ShowNotification(2, "Percentage amount must be greater than 0")
        }
        if (is_gross) {
            this.leavePolicyForm.controls['is_gross'].setValue(false);
        }

    }
    resetForm() {
      //  this.leavePolicyForm.reset();
        this.formInit();
        this.submitted = false;
        this.isLeavePolicyEdit = false;
        //Check Uncheck hidden by default
        this.isShownSandwich = false;
        this.isShownSuffix = false;
        this.isShownPrefix = false;
        this.isShownRequiredPurpose= false;
        this.isShownAreaRequired = false;
        this.isShownResponsilbleRequired = false;
        this.isShownNegativeBalance = false;
        this.isShownAttachmentRequired = false;
        this.isShownEarnLeave = false;
    }

}
