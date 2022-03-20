import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Mfs from './mfs.model';
import { MfsService } from './mfs.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-mfs',
  templateUrl: './mfs.component.html',
  styleUrls: ['./mfs.component.css']
})
export class MfsComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  mfsForm: any;
  allMfs: Observable<Mfs[]>;
  selection = new SelectionModel<Mfs>(true, []);
  mfsIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['RegulatorName', 'Remarks'];


  selectedCountry: Mfs;
  allCountry: Mfs[];

  selectedMfs: Mfs;
  mfss: Mfs[];
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


  constructor(private formbulider: FormBuilder, private MfsService: MfsService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.MfsService.getAllMfs().subscribe(data => this.mfss = data);

    this.mfsForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      mfs_name: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      remarks: ['']

    });


    this.loadAllCountryCboList();
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
    return this.mfss ? this.first === (this.mfss.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.mfss ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.MfsService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }


  selectRow(mfs) {
    this.rowData = mfs;
  }


  loadMfsToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let mfsId = this.rowData.mfs_id;
    this.MfsService.GetMfsById(mfsId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.mfsIdUpdate = data.mfs_id;
      this.mfsForm.controls['countryObj'].setValue(data.country_id);
      this.mfsForm.controls['mfs_name'].setValue(data.mfs_name);
      this.mfsForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayBasic = true;
  }

  deleteRegulatorInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let mfsId = this.rowData.mfs_id;
    this.MfsService.DeleteMfs(mfsId).subscribe(data => {
      this.massage = null;
      this.loadAllMfs();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllMfs() {
    this.MfsService.getAllMfs().subscribe(data => {
      this.mfss = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const mfsdata = this.mfsForm.value;
    mfsdata.country_id = mfsdata.countryObj;
    this.CreateMfs(mfsdata);
    this.mfsForm.reset();
  }

  resetForm() {
    this.mfsForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllMfs();
  }

  CreateMfs(mfsdata: any) {

    if (this.mfsIdUpdate == null) {
      this.MfsService.CreateMfs(mfsdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllMfs();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.mfsIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      mfsdata.mfs_id = this.mfsIdUpdate;
      this.MfsService.UpdateMfs(mfsdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllMfs();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.mfsIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }
}

