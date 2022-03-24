import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { ShiftbreakService } from './shiftbreak.service';

@Component({
  selector: 'app-shiftbreak',
  templateUrl: './shiftbreak.component.html',
  styleUrls: ['./shiftbreak.component.css']
})
export class ShiftbreakComponent implements OnInit {
  shiftbreakForm: any;
  shiftBreaks: any[];
  selectedBreaks: any;
  rowData: any;
  rowSelected: boolean = false;

  // for delete data modal
  display: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }
    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private ShiftbreakService: ShiftbreakService) { }

  ngOnInit() {
    this.shiftbreakForm = this.formbulider.group({
      head_name: [null, [Validators.required]],

    });
    this.loadAllShiftBreak();
  }
  onRowSelect(event) {
    console.log(event)
    this.rowSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {

    this.rowSelected = false;
    this.rowData = null;

  }
  loadAllShiftBreak() {
    this.ShiftbreakService.getAllShiftBreak().subscribe(data => {
   
      this.shiftBreaks = data;


    });
  }
  resetForm() {
    this.shiftbreakForm.reset();

    this.loadAllShiftBreak();

  }
  saveShiftBreak() {
    const data = this.shiftbreakForm.value;

    if (!data.head_name) {
      return this.notifyService.ShowNotification(2, "Please enter shift break name.");
    }
  
    this.ShiftbreakService.createShiftBreak(data).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        if (result.MessageType != 3) {
          this.resetForm();
        }
        this.loadAllShiftBreak();
      }
    );

  }
  shiftBreakActivity() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let shiftBreak_id = this.rowData.shift_break_head_id;
  
    this.ShiftbreakService.ShiftBreakActivity(shiftBreak_id).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllShiftBreak();
      }
    );

  }

  deleteShiftBreak() {
    this.showDialog();
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let shiftBreak_id = this.rowData.shift_break_head_id;
    this.ShiftbreakService.deleteShiftBreak(shiftBreak_id).subscribe(data => {

      this.loadAllShiftBreak();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
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
                this.deleteShiftBreak();
            },
            reject: () => {

            }
        });
    }
  //next() {
  //  this.first = this.first + this.rows;
  //}

  //prev() {
  //  this.first = this.first - this.rows;
  //}

  //reset() {
  //  this.first = 0;
  //}
  //isLastPage(): boolean {
  //  return this.Holidays ? this.first === (this.Holidays.length - this.rows) : true;
  //}

  //isFirstPage(): boolean {
  //  return this.Holidays ? this.first === 0 : true;
  //}
}
