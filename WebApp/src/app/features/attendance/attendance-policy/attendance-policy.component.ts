import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { RosterPolicyService } from '../roster-policy/roster-policy.service';
import { AttendancePolicyService } from './attendance-policy.service';

@Component({
  selector: 'app-attendance-policy',
  templateUrl: './attendance-policy.component.html',
  styleUrls: ['./attendance-policy.component.scss']
})
export class AttendancePolicyComponent implements OnInit {
    AttendancePolicyForm: FormGroup;
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
    selectedShift: any;
    selectedNextShift: any;
    allShifts: any[];
    rowData: any;
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
    //end grid and form show hide ********************
    // for delete data modal
    display: boolean = false;

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private AttendancePolicyService: AttendancePolicyService, private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.AttendancePolicyForm = this.formbulider.group({

            attendance_policy_name: [null, [Validators.required]],
            attendance_policy_id: [null],
            shift_id: [null],
            code: [null],
            remarks:[null],
            attendance_calendar_id: [null, [Validators.required]],
            absenteeism_policy_id: [null],
            late_early_policy_id: [null],
            leave_policy_id:[null],
            dayoff_alternative_id: [null],
            dayoff_type_id: [null],
            week_day: [null],
            is_random_dayoff: false,
            no_of_random_dayoff: 0,
            abd_id: [0],
            roster_policy_id:0,
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
        this.AttendancePolicyForm.reset();
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
    addAttendanceBenefit() {
        //this.submitted = true;

        //if (this.AttendancePolicyForm.invalid) {
        //    return;
        //}
        //let roster_policy_name = this.AttendancePolicyForm.get('roster_policy_name')?.value;
      
        let abp_id = this.AttendancePolicyForm.get('abp_id')?.value.abp_id;

        let abp_name = (this.AttendancePolicyForm.get('abp_id')?.value.abp_name);

        
        alert(abp_name)
        if (this.dataExist(abp_id)) {
            return this.notifyService.ShowNotification(2, "Selected shift already added")
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

    dataExist(abp_id) {

        return this.attBenefitDetails.some(function (el) {
            return el.abp_id === abp_id ;
        });
    }
    removeEvent(a, row) {
        if (this.isAttendancePolicyEdit) {
            let attendance_policy_id = this.rowData.attendance_policy_id;


            this.AttendancePolicyService.deletePolicyBenefit(row.roster_policy_detail_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.attBenefitDetails.splice(this.attBenefitDetails.findIndex(item => item.roster_policy_detail_id === row.roster_policy_detail_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.attBenefitDetails = this.attBenefitDetails.slice(0, a).concat(this.attBenefitDetails.slice(a + 1));
        }


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

            this.AttendancePolicyForm.controls['roster_policy_name'].setValue(data.roster_policy_name);
            this.AttendancePolicyForm.controls['roster_cycle'].setValue(data.roster_cycle);
            this.isAttendancePolicyEdit = true;
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

        let attendance_policy_id = this.rowData.attendance_policy_id;
        this.AttendancePolicyService.delete(attendance_policy_id).subscribe(data => {


            if (data.MessageType == 1) {
                this.AttendancePolicies.splice(this.AttendancePolicies.findIndex(item => item.attendance_policy_id === attendance_policy_id), 1);
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

    saveRosterPolicy() {
        const data = this.AttendancePolicyForm.value;

        this.submitted = true;

        if (this.AttendancePolicyForm.invalid) {

            return;
        }
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
        let leave_policy_id = this.rowData.leave_policy_id;
        this.AttendancePolicyService.copy(leave_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.AttendancePolicies.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
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
                this.deleteRoster();
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
    resetForm() {
        this.AttendancePolicyForm.reset();
        this.attBenefitDetails = [];
        this.submitted = false;
        this.isAttendancePolicyEdit = false;
    }
}
