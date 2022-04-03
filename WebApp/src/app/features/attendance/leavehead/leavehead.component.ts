import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { LeaveheadService } from './leavehead.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'app-leavehead',
    templateUrl: './leavehead.component.html',
    styleUrls: ['./leavehead.component.css']
})
export class LeaveheadComponent implements OnInit {

    leaveHeadForm: FormGroup;
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
    }
    //end grid and form show hide ********************

    rowData: any;
    dataSaved = false;
    allLeaveHead: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['HeadName', 'Remarks'];
    isLeaveHeadEdit: boolean = false;
    rowSelected: boolean = false;


    leaveHeads: any[];
    selectedLeaveHead: any;

    leaveTypes: any[];
    selectedLeaveType: any;

    requiredFor: any[];
    selectedrequiredFor: any;

    // for delete data modal
    display: boolean = false;
    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }
    // for Insert and update data modal
    //displayBasic: boolean = false;
    showBasicDialog() {
        this.resetForm();
        this.toggleGridDisplay();
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;
    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }


    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private LeaveheadService: LeaveheadService, private toastr: ToastrService, private notifyService: NotificationService) { }

    ngOnInit() {
        this.formInit();
        this.loadLeaveHead();
        this.loadLeaveType();
        this.loadGender();
    }

    formInit() {
        this.leaveHeadForm = this.formbulider.group({
            head_name: [null, [Validators.required]],
            leave_head_short_name: [null, [Validators.required]],
            leave_type_id_enum: ['', [Validators.required]],
            required_for_id_enum: ['', [Validators.required]],
            name_in_local_language: [''],
            remarks: ['']

        });
    }


    //btnNew() {
    //    this.resetForm();
    //    this.toggle();
    //}

    loadLeaveHead() {
        this.LeaveheadService.getAllLeaveHead().subscribe(data => {
            debugger

            this.leaveHeads = data;

        });
    }

    loadLeaveType() {
        this.LeaveheadService.getLeaveTypeEnumList().subscribe(data => {

            this.leaveTypes = data;

        });
    }
    loadGender() {
        this.LeaveheadService.getGenderEnumList().subscribe(data => {

            this.requiredFor = data;

        });
    }



    loadLeaveHeadToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
        }
        this.resetForm();

        this.leaveHeadForm.controls['head_name'].setValue(this.rowData.HeadName);
        this.leaveHeadForm.controls['leave_head_short_name'].setValue(this.rowData.LeaveHeadShortName);
        this.leaveHeadForm.controls['leave_type_id_enum'].setValue(this.rowData.LeaveTypeIdEnum);
        this.leaveHeadForm.controls['required_for_id_enum'].setValue(this.rowData.RequiredForIdEnum);
        this.leaveHeadForm.controls['name_in_local_language'].setValue(this.rowData.NameinLocalLanguage);
        this.leaveHeadForm.controls['remarks'].setValue(this.rowData.Remarks);

        this.isLeaveHeadEdit = true;
        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.leaveHeadForm.controls;
    }


    saveLeaveHead() {
        const data = this.leaveHeadForm.value;

        this.submitted = true;

        if (this.leaveHeadForm.invalid) {

            return;
        }

        if (this.isLeaveHeadEdit) {

            data.leave_head_id = this.rowData.LeaveHeadId;
            this.LeaveheadService.update(data).subscribe(result => {

                if (result.MessageType == 1) {
                    this.clear();
                    this.leaveHeads.splice(this.leaveHeads.findIndex(item => item.LeaveHeadId === data.leave_head_id), 1);
                    this.leaveHeads.unshift(result.Data);
                    this.selectedLeaveHead = result.Data;
                    this.rowSelected = true;
                    this.rowData = result.Data;
                    this.isLeaveHeadEdit = false;
                    this.toggleFormDisplay();
                }
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
            });
        }
        else {

            this.LeaveheadService.create(data).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        this.clear();
                        this.leaveHeads.unshift(result.Data);
                        this.selectedLeaveHead = result.Data;
                        this.rowSelected = true;
                        this.rowData = result.Data;
                        this.toggleFormDisplay();

                    }
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                }
            );
        }
    }

    deleteLeaveHead() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let leave_head_id = this.rowData.LeaveHeadId;
        this.LeaveheadService.delete(leave_head_id).subscribe(data => {
            if (data.MessageType == 1) {
                this.leaveHeads.splice(this.leaveHeads.findIndex(item => item.LeaveHeadId === leave_head_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.rowData = null;
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
                this.deleteLeaveHead();
            },
            reject: () => {

            }
        });
    }

    resetForm() {
        this.leaveHeadForm.reset();
        this.isLeaveHeadEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }
}
