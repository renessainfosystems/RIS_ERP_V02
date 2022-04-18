import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { AttendancePolicyService } from '../attendance-policy/attendance-policy.service';
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
    attendancePolicyList: any[];
    AttendancePolicies: any[];
    rowData: any;
    rowSelected: boolean = false;
    AttPolicyAssignmentEdit: boolean = false;
    displayApprove: boolean = false;
    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    company_group_id: number = 0;
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
    attendancePolicyDisplay: boolean = false;
    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private policyAssigmentService: AttendancePolicyAssignmentService, private notifyService: NotificationService, private attendancePolicyService: AttendancePolicyService) { }

    ngOnInit(): void {
        this.AttPolicyAssignmentForm = this.formbulider.group({
            attendance_policy_id: [0, [Validators.required]],
            location_id: [0, [Validators.required]],
            company_group_id: [0],
            company_id: [0, [Validators.required]],
            department_id: [0, [Validators.required]],
            position_id: [0, [Validators.required]],
            group_name: [null, [Validators.required]],
        });
        this.loadAllPolicyAssigment();
        this.getGroupName();
        this.loadAttendancePolicy()
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
            this.policyAssigmentList = data;
        });
    }
    loadCompanyByOrganogram() {

        this.policyAssigmentService.getCompanyByOrganogram(this.company_group_id).subscribe(data => {
            this.companyList = data;
           
        });
    }
    loadAttendancePolicy() {
     
        this.attendancePolicyService.getAllAttendancePolicy().subscribe(data => {
            this.attendancePolicyList = data.filter(
                policy => policy.is_active === true);
           
        });
    }
    onSelectCompany(company_id:number) {
        if (company_id != null) {
            
            this.policyAssigmentService.getLocationByOrganogram(this.company_group_id, company_id).subscribe(data => {
                this.locationList = data;
            });
        }
        else
            this.locationList = null;
    }
    onSelectLocation(location_id:number) {
        let company_id = this.AttPolicyAssignmentForm.get('company_id')?.value;
        
        if (location_id != null) {

            this.policyAssigmentService.getDepartmentByOrganogram(this.company_group_id, company_id,location_id).subscribe(data => {
                this.departmentList = data;
            });
        }
        else
            this.departmentList = null;
    }
    onSelectDepartment(department_id: number) {
     
        let company_id = this.AttPolicyAssignmentForm.get('company_id')?.value;
        let location_id = this.AttPolicyAssignmentForm.get('location_id')?.value;
        
        if (department_id != null) {

            this.policyAssigmentService.getPositionByOrganogram(this.company_group_id, company_id, location_id,department_id).subscribe(data => {
                this.positionList = data;
            });
        }
        else
            this.positionList = null;
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
            
            this.AttPolicyAssignmentForm.controls['company_id'].setValue(data.company_id);
            this.AttPolicyAssignmentForm.controls['group_name'].setValue(data.group_name);
            this.AttPolicyAssignmentForm.controls['company_group_id'].setValue(data.company_group_id);
            this.onSelectCompany(data.company_id);
            this.AttPolicyAssignmentForm.controls['location_id'].setValue(data.location_id);
            this.onSelectLocation(data.location_id);
            this.AttPolicyAssignmentForm.controls['department_id'].setValue(data.department_id);
            this.onSelectDepartment(data.department_id);
            this.AttPolicyAssignmentForm.controls['position_id'].setValue(data.position_id);
            this.AttPolicyAssignmentForm.controls['attendance_policy_id'].setValue(data.attendance_policy_id);
            this.AttPolicyAssignmentEdit = true;
        });

        this.toggleGridDisplay();
    }

    deletePolicyAssignment() {
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
                    this.policyAssigmentList.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
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
        let position_id = this.AttPolicyAssignmentForm.get('position_id')?.value;

       let dd= this.positionList.filter(
            policy => policy.position_id === position_id);
        data.organogram_detail_id = dd[0].organogram_detail_id;
        
        if (this.AttPolicyAssignmentEdit) {

            data.attendance_policy_organogram_id = this.rowData.attendance_policy_organogram_id;
            this.policyAssigmentService.update(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.resetForm();
                    this.policyAssigmentList.splice(this.policyAssigmentList.findIndex(item => item.attendance_policy_organogram_id === data.attendance_policy_organogram_id), 1);
                    this.policyAssigmentList.unshift(result.Data);
                    this.selectedPolicy = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
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
                        this.policyAssigmentList.unshift(result.Data);
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
                this.deletePolicyAssignment();
            },
            reject: () => {

            }
        });
    }
    getGroupName() {

        this.policyAssigmentService.getGroupNameById().subscribe(data => {

            this.AttPolicyAssignmentForm.controls['group_name'].setValue(data.group_name);
            this.company_group_id = data.company_group_id;
            this.loadCompanyByOrganogram();
        });
    }
    viewAttendancePolicy() {
        this.attendancePolicyDisplay = true;
        let attendance_policy_id = this.AttPolicyAssignmentForm.get('attendance_policy_id')?.value;
        this.AttendancePolicies = this.attendancePolicyList.filter(
            policy => policy.attendance_policy_id === attendance_policy_id);
    }
    resetForm() {
       // this.AttPolicyAssignmentForm.reset();
        this.rosterDetails = [];
        this.submitted = false;
        this.AttPolicyAssignmentEdit = false;
    }
}
