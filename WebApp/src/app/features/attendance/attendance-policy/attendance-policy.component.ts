import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { AbsenteeismPolicyService } from '../absenteeism-policy/absenteeism-policy.service';
import { LateEarlyPolicyService } from '../late-early-policy/late-early-policy.service';
import { RosterPolicyService } from '../roster-policy/roster-policy.service';
import { AttendancePolicyService } from './attendance-policy.service';

@Component({
  selector: 'app-attendance-policy',
  templateUrl: './attendance-policy.component.html',
  styleUrls: ['./attendance-policy.component.scss']
})
export class AttendancePolicyComponent implements OnInit {
    AttendancePolicyForm: FormGroup;
    AbsenteeismPolicyForm: FormGroup;
    submitted = false;
    selectedPolicy: any;
    AttendancePolicies: any[];
    selectedCalendar: any;
    calendarsDP: any[];
    selectedAbsenteeism: any;
    absenteeismDP: any[];
    lateEarlyDP: any[];
    rosterPolicyDP: any[];
    benefitPolicyDP: any[];
    leavePolicyDP: any[];
    DayOffDP: any[];
    DayOffAlternativeDP: any[];
    weekDaysDP: any[];
    attBenefitDetails: any[] = [];
    shiftDetails: any[] = [];
    selectedShift: any;
    leavePolicyDetails: any[] = [];
    dayOffPolicyDetails: any[] = [];
    latEarlySlabDataSources: any[] = [];
    rosterDetails: any[] = [];
    selectedNextShift: any;
    allShifts: any[]=[];
    rowData: any;
    isShowdayofftype: boolean = false;
    rowSelected: boolean = false;
    isAttendancePolicyEdit: boolean = false;
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
    isShownDayOff: boolean = true;
    isShownNoOfDayOff: boolean = false;
    //end grid and form show hide ********************
    // for delete data modal
    lateearlydisplay: boolean = false;
    rosterPolicydisplay: boolean = false;
    absenteeismdisplay: boolean = false;
    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private AttendancePolicyService: AttendancePolicyService, private notifyService: NotificationService, private LateEarlyPolicyService: LateEarlyPolicyService, private RosterPolicyService: RosterPolicyService, private absenteeismPolicyService: AbsenteeismPolicyService) { }

    ngOnInit() {
        this.formInit();
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
        this.loadAllAttendancePolicy();
        this.loadAllShift();
        this.loadAllCalendars();
        this.loadAllAbsenteeism();
        this.loadAllLateEarly();
        this.loadAllRosterPolicy();
        this.loadAllBenefitPolicy();
        this.loadAllLeavePolicy();
        this.loadAllWeekDays();
        this.loadAllDayOffType();
        this.loadAllDayOffAlternative();
        this.getPolicyCode();
    }

    formInit() {
        this.AttendancePolicyForm = this.formbulider.group({

            policy_name: [null, [Validators.required]],
            attendance_policy_id: [0],
            shift_id: [0],
            code: [''],
            remarks: [null],
            attendance_calendar_id: [0, [Validators.required]],
            absenteeism_policy_id: [0],
            late_early_policy_id: [0],
            leave_policy_id: [0],
            dayoff_alternative_id: [0],
            dayoff_type_id: [0],
            week_day: [''],
            is_random_dayoff: false,
            no_of_random_dayoff: 0,
            abp_id: [0],
            roster_policy_id: 0,
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
        // this.displayBasic = true;
        this.toggleGridDisplay();
       // this.AttendancePolicyForm.reset();
        this.AttendancePolicyForm.valid;
    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.AttendancePolicyForm.controls;
    }
    loadAllAttendancePolicy() {
        this.AttendancePolicyService.getAllAttendancePolicy().subscribe(data => {
            this.AttendancePolicies = data;
        });
    }
    loadAllShift() {
        this.AttendancePolicyService.getShiftForDP().subscribe(data => {
            this.allShifts = data;
        });
    }
    loadAllCalendars() {

        this.AttendancePolicyService.getAllCalendarDP().subscribe(data => {
            this.calendarsDP = data;
        });
    }
    loadAllAbsenteeism() {

        this.AttendancePolicyService.getAllAbsenteeismPolicyForDP().subscribe(data => {
            this.absenteeismDP = data;
        });
    }
    loadAllLateEarly() {

        this.AttendancePolicyService.getAllLateEarlyPolicyForDP().subscribe(data => {
            this.lateEarlyDP = data;
        });
    }
    loadAllRosterPolicy() {

        this.AttendancePolicyService.getAllRosterPolicyForDP().subscribe(data => {
            this.rosterPolicyDP = data;
        });
    }
    loadAllBenefitPolicy() {

        this.AttendancePolicyService.getAllAttBenefitPolicyForDP().subscribe(data => {
            this.benefitPolicyDP = data;
        });
    }
    loadAllLeavePolicy() {

        this.AttendancePolicyService.getAllLeavePolicy().subscribe(data => {
            this.leavePolicyDP = data;
        });
    }
    loadAllDayOffType() {

        this.AttendancePolicyService.getDayOffTypeForDP().subscribe(data => {
            this.DayOffDP = data;
        });
    }
    loadAllDayOffAlternative() {

        this.AttendancePolicyService.getDayOffAlternativeForDP().subscribe(data => {
            this.DayOffAlternativeDP = data;
        });
    }
    loadAllWeekDays() {

        this.AttendancePolicyService.getEnumWeekDays().subscribe(data => {
            this.weekDaysDP = data;
        });
    }
   
    getPolicyCode() {

        this.AttendancePolicyService.getAttendancePolicyCode().subscribe(data => {

            this.AttendancePolicyForm.controls['code'].setValue(data.code);

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
        let attendance_policy_id = this.rowData.attendance_policy_id;

        this.AttendancePolicyService.getAttendancePolicyById(attendance_policy_id).subscribe(res => {

            this.attBenefitDetails = res;

        });

        this.AttendancePolicyService.getAttendancePolicyById(attendance_policy_id).subscribe(data => {

            this.AttendancePolicyForm.controls['policy_name'].setValue(data.policy_name);
            this.AttendancePolicyForm.controls['code'].setValue(data.code);
            this.AttendancePolicyForm.controls['remarks'].setValue(data.remarks);
            this.AttendancePolicyForm.controls['attendance_calendar_id'].setValue(data.attendance_calendar_id);
            this.AttendancePolicyForm.controls['absenteeism_policy_id'].setValue(data.absenteeism_policy_id);
            this.AttendancePolicyForm.controls['late_early_policy_id'].setValue(data.late_early_policy_id);
            this.AttendancePolicyForm.controls['roster_policy_id'].setValue(data.roster_policy_id);
            this.AttendancePolicyForm.controls['is_random_dayoff'].setValue(data.is_random_dayoff);
            this.AttendancePolicyForm.controls['no_of_random_dayoff'].setValue(data.no_of_random_dayoff);
            this.dayOffPolicyDetails = data.attendance_Policy_Dayoffs;
            this.attBenefitDetails = data.attendance_Policy_Benefits;
            this.leavePolicyDetails = data.attendance_Policy_Leaves;
            this.shiftDetails = data.attendance_Policy_Shifts;
            if (data.is_random_dayoff) {
                this.isShownDayOff = false;
                this.isShownNoOfDayOff = true;
            }
            this.isAttendancePolicyEdit = true;
        });

        this.toggleGridDisplay();
    }

    deleteAttendancePolicy() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
        }

        let attendance_policy_id = this.rowData.attendance_policy_id;
        this.AttendancePolicyService.delete(attendance_policy_id).subscribe(data => {


            if (data.MessageType == 1) {
                this.AttendancePolicies.splice(this.AttendancePolicies.findIndex(item => item.attendance_policy_id === attendance_policy_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.rowData = null;

    }
    policyApprove() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved.");
        }
        let attendance_policy_id = this.rowData.attendance_policy_id;
        this.AttendancePolicyService.approve(attendance_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.AttendancePolicies.splice(this.AttendancePolicies.findIndex(item => item.attendance_policy_id === attendance_policy_id), 1);
                    this.AttendancePolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayApprove = false;
                }
            }
        );
    }

    saveAttendancePolicy() {
        const data = this.AttendancePolicyForm.value;

        this.submitted = true;

        if (this.AttendancePolicyForm.invalid) {

            return;
        }
        data.attendance_Policy_Dayoffs = this.dayOffPolicyDetails;
        data.attendance_Policy_Benefits = this.attBenefitDetails;
        data.attendance_Policy_Leaves = this.leavePolicyDetails;
        data.attendance_Policy_Shifts = this.shiftDetails;
 
        if (this.isAttendancePolicyEdit) {

            data.attendance_policy_id = this.rowData.attendance_policy_id;
            this.AttendancePolicyService.update(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.AttendancePolicies.splice(this.AttendancePolicies.findIndex(item => item.attendance_policy_id === data.attendance_policy_id), 1);
                    this.AttendancePolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                }


            });
        }
        else {

            data.attBenefitDetails = this.attBenefitDetails;
            this.AttendancePolicyService.create(JSON.stringify(data)).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.resetForm();
                        this.AttendancePolicies.unshift(result.Data[0]);
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

    policyCopy() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved.");
        }
        let attendance_policy_id = this.rowData.attendance_policy_id;
        this.AttendancePolicyService.copy(attendance_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.AttendancePolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                }
            }
        );
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
                this.deleteAttendancePolicy();
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


    addAttendanceBenefit() {
       
        let abp_id = this.AttendancePolicyForm.get('abp_id')?.value.abp_id;

        let abp_name = (this.AttendancePolicyForm.get('abp_id')?.value.abp_name);

        if (!abp_id) {
            return this.notifyService.ShowNotification(2, "Please select attendance benefit");
        }
        if (this.attBenifitdataExist(abp_id)) {
            return this.notifyService.ShowNotification(2, "Selected benefit already added")
        }

        const attBenefitObj = {
            abp_id: abp_id,
            attendance_policy_id: 0,
            attendance_policy_benefit_id: 0,
            abp_name: abp_name,

        }


        if (this.isAttendancePolicyEdit) {

            let attendance_policy_id = this.rowData.attendance_policy_id;
            attBenefitObj.attendance_policy_id = attendance_policy_id;
            this.AttendancePolicyService.createPolicyBenefit(attBenefitObj).subscribe(data => {

                if (data.MessageType == 1) {
                    this.attBenefitDetails.unshift(data.Data[0]);
                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {



            this.attBenefitDetails.push(attBenefitObj);
        }
    }

    // ...

    attBenifitdataExist(abp_id) {

        return this.attBenefitDetails.some(function (el) {
            return el.abp_id === abp_id;
        });
    }
    removeattBenifit(a, row) {
        if (this.isAttendancePolicyEdit) {
            let attendance_policy_id = this.rowData.attendance_policy_id;


            this.AttendancePolicyService.deletePolicyBenefit(row.attendance_policy_benefit_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.attBenefitDetails.splice(this.attBenefitDetails.findIndex(item => item.attendance_policy_benefit_id === row.attendance_policy_benefit_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.attBenefitDetails = this.attBenefitDetails.slice(0, a).concat(this.attBenefitDetails.slice(a + 1));
        }


    }

    addShift() {
      
        let shift_id = this.AttendancePolicyForm.get('shift_id')?.value.shift_id;

        let shift_name = (this.AttendancePolicyForm.get('shift_id')?.value.shift_name);
        if (!shift_id) {
            return this.notifyService.ShowNotification(2, "Please select shift");
        }
        if (this.shiftdataExist(shift_id)) {
            return this.notifyService.ShowNotification(2, "Selected shift already added")
        }

        const shiftObj = {
            shift_id: shift_id,
            attendance_policy_id: 0,
            attendance_policy_shift_id: 0,
            shift_name: shift_name,

        }


        if (this.isAttendancePolicyEdit) {

            let attendance_policy_id = this.rowData.attendance_policy_id;
            shiftObj.attendance_policy_id = attendance_policy_id;
            this.AttendancePolicyService.createPolicyShift(shiftObj).subscribe(data => {

                if (data.MessageType == 1) {
                    this.shiftDetails.unshift(data.Data[0]);
                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {



            this.shiftDetails.push(shiftObj);
        }
    }

    // ...

   shiftdataExist(shift_id) {

        return this.shiftDetails.some(function (el) {
            return el.shift_id === shift_id;
        });
    }
    removeShift(a, row) {
        if (this.isAttendancePolicyEdit) {
            let attendance_policy_id = this.rowData.attendance_policy_id;


            this.AttendancePolicyService.deletePolicyShift(row.attendance_policy_shift_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.shiftDetails.splice(this.shiftDetails.findIndex(item => item.attendance_policy_shift_id === row.attendance_policy_shift_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.shiftDetails = this.shiftDetails.slice(0, a).concat(this.shiftDetails.slice(a + 1));
        }


    }

    addLeavePolicy() {
       
        let leave_policy_id = this.AttendancePolicyForm.get('leave_policy_id')?.value.leave_policy_id;

        let leave_policy_name = (this.AttendancePolicyForm.get('leave_policy_id')?.value.leave_policy_name);
        if (!leave_policy_id) {
            return this.notifyService.ShowNotification(2, "Please select leave policy");
        }
        if (this.leavePolicydataExist(leave_policy_id)) {
            return this.notifyService.ShowNotification(2, "Selected leave policy already added")
        }
        let data = this.leavePolicyDP.filter(
            leave => leave.leave_policy_id === leave_policy_id);
        
        const leavePolicyObj = {
            leave_policy_id: leave_policy_id,
            attendance_policy_id: 0,
            attendance_policy_leave_id: 0,
            leave_policy_name: leave_policy_name,
            leave_head_short_name: data[0].leave_head_short_name,
            default_leave_balance_day: data[0].default_leave_balance_day,
            activationdays: data[0].activationdays
        }


        if (this.isAttendancePolicyEdit) {

            let attendance_policy_id = this.rowData.attendance_policy_id;
            leavePolicyObj.attendance_policy_id = attendance_policy_id;
            this.AttendancePolicyService.createPolicyLeave(leavePolicyObj).subscribe(data => {

                if (data.MessageType == 1) {
                    this.leavePolicyDetails.unshift(data.Data[0]);
                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {



            this.leavePolicyDetails.push(leavePolicyObj);
        }
    }

    // ...

    leavePolicydataExist(leave_policy_id) {

        return this.leavePolicyDetails.some(function (el) {
            return el.leave_policy_id === leave_policy_id;
        });
    }
    removeLeavePolicy(a, row) {
        if (this.isAttendancePolicyEdit) {
            let attendance_policy_id = this.rowData.attendance_policy_id;


            this.AttendancePolicyService.deletePolicyLeave(row.attendance_policy_leave_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.leavePolicyDetails.splice(this.leavePolicyDetails.findIndex(item => item.attendance_policy_leave_id === row.attendance_policy_leave_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.leavePolicyDetails = this.leavePolicyDetails.slice(0, a).concat(this.leavePolicyDetails.slice(a + 1));
        }


    }

    addDayOffPolicy() {
       
        let dayoff_type_id = this.AttendancePolicyForm.get('dayoff_type_id')?.value.dayoff_type_id;

        let dayoff_type_name = (this.AttendancePolicyForm.get('dayoff_type_id')?.value.dayoff_type_name);
        let week_day = (this.AttendancePolicyForm.get('week_day')?.value.week_day);
        
        if (!dayoff_type_id || !week_day) {
            
            return this.notifyService.ShowNotification(2, "Please select week day and day off type");
        }
        let dayoff_alternative_id = this.AttendancePolicyForm.get('dayoff_alternative_id')?.value.dayoff_alternative_id;

        let dayoff_alternative_name = (this.AttendancePolicyForm.get('dayoff_alternative_id')?.value.dayoff_alternative_name);

        if ((dayoff_type_id == 3 || dayoff_type_id == 4) && !dayoff_alternative_id) {

            return this.notifyService.ShowNotification(2, "Please select alternative day off");
        }
        if (this.dayOffPolicydataExist(week_day)) {
            return this.notifyService.ShowNotification(2, "Selected day off already added")
        }


        const dayOffPolicyObj = {
            dayoff_type_id: dayoff_type_id,
            attendance_policy_id: 0,
            attendance_policy_dayoff_id: 0,
            dayoff_type_name: '[' + dayoff_type_name + ']' ,
            dayoff_alternative_id: dayoff_alternative_id,
            dayoff_alternative_name: dayoff_alternative_name ? '[' + dayoff_alternative_name + ']' : '',
            week_day: week_day
        }


        if (this.isAttendancePolicyEdit) {

            let attendance_policy_id = this.rowData.attendance_policy_id;
            dayOffPolicyObj.attendance_policy_id = attendance_policy_id;
            this.AttendancePolicyService.createPolicyDayOff(dayOffPolicyObj).subscribe(data => {

                if (data.MessageType == 1) {
                    this.dayOffPolicyDetails.unshift(data.Data[0]);
                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {



            this.dayOffPolicyDetails.push(dayOffPolicyObj);
        }
    }

    // ...

    dayOffPolicydataExist(week_day) {

        return this.dayOffPolicyDetails.some(function (el) {
            return el.week_day === week_day;
        });
    }
    removeDayOffPolicy(a, row) {
        if (this.isAttendancePolicyEdit) {
            let attendance_policy_id = this.rowData.attendance_policy_id;


            this.AttendancePolicyService.deletePolicyDayOff(row.attendance_policy_dayoff_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.dayOffPolicyDetails.splice(this.dayOffPolicyDetails.findIndex(item => item.attendance_policy_leave_id === row.attendance_policy_leave_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.dayOffPolicyDetails = this.dayOffPolicyDetails.slice(0, a).concat(this.dayOffPolicyDetails.slice(a + 1));
        }


    }

    onAllowRandomDayOff(event) {
        if (event.checked) {
            this.isShownDayOff = false;
            this.isShownNoOfDayOff = true;
            this.AttendancePolicyForm.controls['week_day'].setValue(0);
            this.AttendancePolicyForm.controls['dayoff_type_id'].setValue(0);
            this.AttendancePolicyForm.controls['dayoff_alternative_id'].setValue(0);
            this.dayOffPolicyDetails = [];
        }
        else {

            this.AttendancePolicyForm.controls['no_of_random_dayoff'].setValue(0);
            this.isShownDayOff = true;
            this.isShownNoOfDayOff = false;

        }
    }
    viewLateEarlyPolicy() {
        this.lateearlydisplay = true;
        let late_early_policy_id = this.AttendancePolicyForm.get('late_early_policy_id')?.value;
        this.LateEarlyPolicyService.getLateEarlyPolicyDetailsById(late_early_policy_id).subscribe(res => {

            this.setLateEarlyDataSource(res);

        });
    }
  
    viewRosterPolicy() {
        this.rosterPolicydisplay = true;
        let roster_policy_id = this.AttendancePolicyForm.get('roster_policy_id')?.value;
        this.RosterPolicyService.getRosterDetailsById(roster_policy_id).subscribe(res => {

            this.rosterDetails = res;

        });
    }
    viewAbsenteeismPolicy() {
        this.absenteeismdisplay = true;
        let absenteeism_policy_id = this.AttendancePolicyForm.get('absenteeism_policy_id')?.value;
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
                
            }
        });
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
                if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual late min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0 + " day leave"; }
                if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total late in minutes" : "Deduct " + +res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }


            }
            if (res[i].late_early_type_id_enum == 2) {
                rulesFor = "Early"
                lateSlab = res[i].min_late_early_min + " to " + res[i].max_late_early_min + " minutes";
                description = res[i].is_allow_late_early_slab ? res[i].late_early_days_for + " Days of Monthly Early(" + lateSlab + ")" : res[i].late_early_days_for + " Days of Monthly Early";
                if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual early min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0 + " day leave"; }
                if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total early in minutes" : "Deduct " + + res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }
            }
            if (res[i].late_early_type_id_enum == 3) {
                rulesFor = "Both"
                lateSlab = res[i].min_late_early_min + " to " + res[i].max_late_early_min + " minutes";
                description = res[i].is_allow_late_early_slab ? res[i].late_early_days_for + " Days of Monthly Early/Late(" + lateSlab + ")" : res[i].late_early_days_for + " Days of Monthly Early/Late";
                if (res[i].is_leave_adjustment) { leaveadjustment = res[i].is_leave_as_late_early_min ? "Monthly actual Early/Late min adjust with leave" : "Deduct " + res[i].leave_in_min / 8.0 + " day leave"; }
                if (res[i].salary_head_id != 0) { Salaryadjustment = res[i].is_deduction_monthly_min ? "Deduct " + res[i].percent_value + "% " + grossBasic + "as per total Early/Late in minutes" : "Deduct " + + res[i].deduction_days + " days of " + res[i].percent_value + " % " + grossBasic }
            }
            res[i].rulesFor = rulesFor;
            res[i].description = description;
            res[i].leaveadjustment = leaveadjustment;
            res[i].Salaryadjustment = Salaryadjustment;
        }
        this.latEarlySlabDataSources = res;
    }

    onDayOffTypeChange(event)
    {
        let dayOffTypeId = this.AttendancePolicyForm.get('dayoff_type_id')?.value.dayoff_type_id;

        if (dayOffTypeId == 3 || dayOffTypeId == 4) {
            this.isShowdayofftype = true;

        } else {
            this.isShowdayofftype = false;
            this.AttendancePolicyForm.controls['dayoff_alternative_id'].setValue(0);
        }
    } 

    resetForm() {
        //this.AttendancePolicyForm.reset();
        this.formInit();
        this.attBenefitDetails = [];
        this.rosterDetails = [];
        this.shiftDetails = [];
        this.leavePolicyDetails = [];
        this.dayOffPolicyDetails = [];
        this.submitted = false;
        this.isAttendancePolicyEdit = false;
        this.getPolicyCode();

    }
}
