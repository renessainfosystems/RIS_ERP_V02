import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { AttendancePolicyAssignmentService } from './attendance-policy-assignment.service';

@Component({
    selector: 'app-attendance-policy-assignment',
    templateUrl: './attendance-policy-assignment.component.html',
    styleUrls: ['./attendance-policy-assignment.component.scss']
})
export class AttendancePolicyAssignmentComponent implements OnInit {

    AttPolicyAssignmentForm: FormGroup;
    submitted = false;
    selectedPolicy: any;
    policyAssigmentList: any[];
    selectedRostercycle: any;
    companyList: any[];
    locationList: any[];
    departmentList: any[];
    positionList: any[];
    rosterDetails: any[] = [];
    selectedShift: any;
    selectedNextShift: any;
    allShifts: any[];
    rowData: any;
    rowSelected: boolean = false;
    AttPolicyAssignmentEdit: boolean = false;
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
    company_group_id: number = 0;
    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private policyAssigmentService: AttendancePolicyAssignmentService, private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.AttPolicyAssignmentForm = this.formbulider.group({

            roster_policy_name: [null, [Validators.required]],
            next_shift_id: [null],
            shift_id: [null],
            roster_cycle: [null, [Validators.required]],
            position: 0,
            attendance_policy_id: [0, [Validators.required]],
            location_id: [0, [Validators.required]],
            company_group_id: [0, [Validators.required]],
            company_id: [0, [Validators.required]],
            department_id: [0, [Validators.required]],
            position_id: [0, [Validators.required]],
            group_name: [null, [Validators.required]],
        });
        this.loadAllPolicyAssigment();
        this.getGroupName();
        this.loadCompanyByOrganogram();
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
        //this.AttPolicyAssignmentForm.reset();
        this.AttPolicyAssignmentForm.valid;
    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.AttPolicyAssignmentForm.controls;
    }
    loadAllPolicyAssigment() {
        this.policyAssigmentService.getAllAttPolicyAssignment().subscribe(data => {
            this.policyAssigmentList = [];
        });
    }
    loadCompanyByOrganogram() {
        this.policyAssigmentService.getCompanyByOrganogram(1).subscribe(data => {
            this.companyList = data;
            console.log(this.companyList)
        });
    }
    loadLocationByOrganogram() {

    }
    loadDepartmentByOrganogram() {

    }
    loadPositionByOrganogram() {

    }
    loadPolicyAssignmentToEdit() {


        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
        }
        this.resetForm();
        let attendance_policy_organogram_id = this.rowData.attendance_policy_organogram_id;



        this.policyAssigmentService.getAttendancePolicyOrganogramById(attendance_policy_organogram_id).subscribe(data => {

            this.AttPolicyAssignmentForm.controls['roster_policy_name'].setValue(data.roster_policy_name);
            this.AttPolicyAssignmentForm.controls['roster_cycle'].setValue(data.roster_cycle);
            this.AttPolicyAssignmentEdit = true;
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

        let attendance_policy_organogram_id = this.rowData.attendance_policy_organogram_id;
        this.policyAssigmentService.delete(attendance_policy_organogram_id).subscribe(data => {


            if (data.MessageType == 1) {
                this.policyAssigmentList.splice(this.policyAssigmentList.findIndex(item => item.attendance_policy_organogram_id === attendance_policy_organogram_id), 1);
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
        let attendance_policy_organogram_id = this.rowData.attendance_policy_organogram_id;
        this.policyAssigmentService.approve(attendance_policy_organogram_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.policyAssigmentList.splice(this.policyAssigmentList.findIndex(item => item.attendance_policy_organogram_id === attendance_policy_organogram_id), 1);
                    this.policyAssigmentList.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayApprove = false;
                }
            }
        );
    }

    saveAttendancePolicyAssignment() {
        const data = this.AttPolicyAssignmentForm.value;

        this.submitted = true;

        if (this.AttPolicyAssignmentForm.invalid) {

            return;
        }
        if (this.AttPolicyAssignmentEdit) {

            data.attendance_policy_organogram_id = this.rowData.attendance_policy_organogram_id;
            this.policyAssigmentService.update(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.policyAssigmentList.splice(this.policyAssigmentList.findIndex(item => item.attendance_policy_organogram_id === data.attendance_policy_organogram_id), 1);
                    this.policyAssigmentList.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                }


            });
        }
        else {

            data.rosterDetails = this.rosterDetails;
            this.policyAssigmentService.create(JSON.stringify(data)).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.resetForm();
                        this.policyAssigmentList.unshift(result.Data[0]);
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
    getGroupName() {

        this.policyAssigmentService.getGroupNameById().subscribe(data => {

            this.AttPolicyAssignmentForm.controls['group_name'].setValue(data.group_name);
            this.company_group_id = data.company_group_id;
        });
    }
    resetForm() {
       // this.AttPolicyAssignmentForm.reset();
        this.rosterDetails = [];
        this.submitted = false;
        this.AttPolicyAssignmentEdit = false;
    }
}
