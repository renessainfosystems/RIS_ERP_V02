import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import OwnershipType from './ownership-type.model';
import { OwnershipTypeService } from './ownership-type.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-ownership-type',
  templateUrl: './ownership-type.component.html',
  styleUrls: ['./ownership-type.component.css']
})
export class OwnershipTypeComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  ownershipTypeForm: any;
  allOwnershipType: Observable<OwnershipType[]>;
  selection = new SelectionModel<OwnershipType>(true, []);
  ownershipTypeIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['OwnershipTypeName', 'Remarks'];
  selectedCompanyCorporate: OwnershipType;
  allCompanyCorporate: OwnershipType[];

  selectedOwnershipType: OwnershipType;
  ownershipTypes: OwnershipType[];
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


  constructor(private formbulider: FormBuilder, private OwnershipTypeService: OwnershipTypeService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.OwnershipTypeService.getAllOwnershipType().subscribe(data => this.ownershipTypes = data);

    this.ownershipTypeForm = this.formbulider.group({
      ownership_type_name: [null, [Validators.required]],
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
    return this.ownershipTypes ? this.first === (this.ownershipTypes.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.ownershipTypes ? this.first === 0 : true;
  }


  selectRow(ownershipType) {
    this.rowData = ownershipType;
  }

  loadOwnershipTypeToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let ownershipTypeId = this.rowData.ownership_type_id;
    this.OwnershipTypeService.GetOwnershipTypeById(ownershipTypeId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.ownershipTypeIdUpdate = data.ownership_type_id;
      this.companyCorporateId = data.company_corporate_id;
      this.ownershipTypeForm.controls['ownership_type_name'].setValue(data.ownership_type_name);
      this.ownershipTypeForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteOwnershipTypeInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let ownershipTypeId = this.rowData.ownership_type_id;
    this.OwnershipTypeService.DeleteOwnershipType(ownershipTypeId).subscribe(data => {
      this.massage = null;
      this.loadAllOwnershipTypes();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllOwnershipTypes() {
    this.OwnershipTypeService.getAllOwnershipType().subscribe(data => {
      this.ownershipTypes = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const ownershipTypedata = this.ownershipTypeForm.value;
    if (!(ownershipTypedata.ownership_type_name)) {
      return this.notifyService.ShowNotification(2, "Please enter ownership type name")
    }
    this.CreateOwnershipType(ownershipTypedata);
    this.ownershipTypeForm.reset();
  }

  resetForm() {
    this.ownershipTypeForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllOwnershipTypes();
  }

  CreateOwnershipType(ownershipTypedata: any) {

    if (this.ownershipTypeIdUpdate == null) {

      this.OwnershipTypeService.CreateOwnershipType(ownershipTypedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllOwnershipTypes();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.ownershipTypeIdUpdate = null;
          this.displayBasic = false;
        }
      );
    }
    else {
      ownershipTypedata.ownership_type_id = this.ownershipTypeIdUpdate;
      ownershipTypedata.company_corporate_id = this.companyCorporateId;

      this.OwnershipTypeService.UpdateOwnershipType(ownershipTypedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllOwnershipTypes();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.ownershipTypeIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

