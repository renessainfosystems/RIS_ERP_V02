import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Position from './position.model';
import { PositionService } from './position.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  positionForm: any;
  allPosition: Observable<Position[]>;
  selection = new SelectionModel<Position>(true, []);
  positionIdUpdate = null;
  createdDate = null;
  serverDate = null;
  createdUserId = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['PositionName', 'Remarks'];
  selectedCompanyCorporate: Position;
  allCompanyCorporate: Position[];


  selectedPosition: Position;
  positions: Position[];
  first = 0;
  rows = 10;
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
  displayBasic: boolean = false;
  showBasicDialog() {
    this.displayBasic = true;
    this.resetForm();
  }


  constructor(private formbulider: FormBuilder, private PositionService: PositionService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.PositionService.getAllPosition().subscribe(data => this.positions = data);

    this.positionForm = this.formbulider.group({
      position_code: [null, [Validators.required]],
      position_name: [null, [Validators.required]],
      position_short_name: [null, [Validators.required]],
      name_in_local_language: [null, [Validators.required]],
      remarks: [null, [Validators.required]],

    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.positions ? this.first === (this.positions.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.positions ? this.first === 0 : true;
  }


  selectRow(position) {
    this.rowData = position;
  }

  loadPositionToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let positionId = this.rowData.position_id;
    this.PositionService.GetPositionById(positionId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.positionIdUpdate = data.position_id;
      this.companyCorporateId = data.company_corporate_id;
      this.createdDate = data.created_datetime;
      this.serverDate = data.db_server_date_time;
      this.createdUserId = data.created_user_id;
      this.positionForm.controls['position_code'].setValue(data.position_code);
      this.positionForm.controls['position_name'].setValue(data.position_name);
      this.positionForm.controls['position_short_name'].setValue(data.position_short_name);
      this.positionForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.positionForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deletePositionInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let positionId = this.rowData.position_id;
    this.PositionService.DeletePosition(positionId).subscribe(data => {
      this.massage = null;
      this.loadAllPositions();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllPositions() {
    this.PositionService.getAllPosition().subscribe(data => {
      this.positions = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const positiondata = this.positionForm.value;
    this.CreatePosition(positiondata);
    this.positionForm.reset();
  }

  resetForm() {
    this.positionForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllPositions();
  }

  CreatePosition(positiondata: any) {

    if (this.positionIdUpdate == null) {

      this.PositionService.CreatePosition(positiondata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllPositions();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.positionIdUpdate = null;
          //this.positionForm.reset();
          this.displayBasic = false;
        }
      );
    }
    else {
      positiondata.position_id = this.positionIdUpdate;
      positiondata.company_corporate_id = this.companyCorporateId;
      positiondata.created_datetime = this.createdDate;
      positiondata.db_server_date_time = this.serverDate;
      positiondata.created_user_id = this.createdUserId;

      this.PositionService.UpdatePosition(positiondata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllPositions();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.positionIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

