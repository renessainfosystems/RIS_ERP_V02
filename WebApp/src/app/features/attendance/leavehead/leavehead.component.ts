import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { LeaveheadService } from './leavehead.service';

@Component({
  selector: 'app-leavehead',
  templateUrl: './leavehead.component.html',
  styleUrls: ['./leavehead.component.css']
})
export class LeaveheadComponent implements OnInit {
  leaveHeadForm: any;
  leaveHeads: any[];
  selectedLeaveHead: any;
  leaveTypes: any[];
  selectedLeaveType: any;
  requiredFor: any[];
  selectedrequiredFor: any;
  isLeaveHeadEdit: boolean = false;
  rowData: any;
  // for delete data modal
  display: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
  collapsedLeaveHeadList = false;
  header: any = "New Leave Head";
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
  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private LeaveheadService: LeaveheadService) { }

  ngOnInit() {
    this.leaveHeadForm = this.formbulider.group({
      head_name: [null, [Validators.required]],
      leave_head_short_name: [null, [Validators.required]],
      leave_type_id_enum: ['', [Validators.required]],
      required_for_id_enum: ['', [Validators.required]],
      name_in_local_language: ['', [Validators.required]],
      remarks: ['', [Validators.required]]

    });
    this.loadLeaveHead();
    this.loadLeaveType();
    this.loadGender();
  }
  btnNew() {
    this.resetForm();

    this.toggle();

  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
      this.collapsedLeaveHeadList = true;

    }
    else {
      this.collapsed = true;
      this.collapsedLeaveHeadList = false;

    }

  }

  onRowSelect(event) {
    this.rowSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {
    this.rowSelected = false;
    this.rowData = null;


  }
  loadLeaveHead() {
    this.LeaveheadService.getAllLeaveHead().subscribe(data => {

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
    this.header = "Edit Leave Head";
    this.toggle();
    //this.displayBasic = true;
  }
  saveLeaveHead() {
    const data = this.leaveHeadForm.value;

    if (!(data.head_name)) {
      return this.notifyService.ShowNotification(2, "Please enter leave name")
    }
    if (!(data.leave_head_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter leave short name")
    }
    if (!(data.leave_type_id_enum)) {
      return this.notifyService.ShowNotification(2, "Please select leave type")
    }
    if (!(data.required_for_id_enum)) {
      return this.notifyService.ShowNotification(2, "Please select required for")
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
          }
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

        }
      );
    }

    // this.displayBasic = false;

  }
  resetForm() {
    this.leaveHeadForm.reset();
    this.isLeaveHeadEdit = false;
    this.header = "New Leave Head";
  }
  clear() {
    this.resetForm();

    this.toggle();

  }
}
