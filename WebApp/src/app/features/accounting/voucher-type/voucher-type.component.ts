import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import VoucherType from './voucher-type.model';
import { VoucherTypeService } from './voucher-type.service'

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.css']
})
export class VoucherTypeComponent implements OnInit {
  rowData: any;
  dataSource: any;
  voucherTypeForm: any;
  selectedVoucherType: VoucherType;
  voucherTypes: VoucherType[];
  first = 0;
  rows = 10;
  massage = null;
  dataSaved: boolean;
  voucherTypeIdUpdate: any;

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

  constructor(private formbulider: FormBuilder, private VoucherTypeService: VoucherTypeService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.VoucherTypeService.getAllVoucherType().subscribe(data => this.voucherTypes = data);

    this.voucherTypeForm = this.formbulider.group({
      code: [null, [Validators.required]],
      voucher_type: [null, [Validators.required]],

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
    return this.voucherTypes ? this.first === (this.voucherTypes.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.voucherTypes ? this.first === 0 : true;
  }



  selectRow(voucherType) {
    this.rowData = voucherType;
  }

  loadVoucherTypeToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let voucherTypeId = this.rowData.accounting_voucher_type_id;
    this.VoucherTypeService.GetVoucherTypeById(voucherTypeId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.voucherTypeIdUpdate = data.accounting_voucher_type_id;
      this.voucherTypeForm.controls['code'].setValue(data.code);
      this.voucherTypeForm.controls['voucher_type'].setValue(data.voucher_type);

    });
    this.displayBasic = true;
  }

  deleteVoucherTypeInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let voucherTypeId = this.rowData.accounting_voucher_type_id;
    this.VoucherTypeService.DeleteVoucherType(voucherTypeId).subscribe(data => {
      this.massage = null;
      this.loadAllVoucherTypes();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllVoucherTypes() {
    this.VoucherTypeService.getAllVoucherType().subscribe(data => {
      this.voucherTypes = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const voucherTypedata = this.voucherTypeForm.value;
    this.CreateVoucherType(voucherTypedata);
    this.voucherTypeForm.reset();
  }

  resetForm() {
    this.voucherTypeForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllVoucherTypes();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  CreateVoucherType(voucherTypedata: any) {
    console.log(voucherTypedata)
    if (this.voucherTypeIdUpdate == null) {

      this.VoucherTypeService.CreateVoucherType(voucherTypedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllVoucherTypes();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.voucherTypeIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      voucherTypedata.accounting_voucher_type_id = this.voucherTypeIdUpdate;
      this.VoucherTypeService.UpdateVoucherType(voucherTypedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllVoucherTypes();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.voucherTypeIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}




