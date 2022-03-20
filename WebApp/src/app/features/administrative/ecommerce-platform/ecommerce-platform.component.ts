import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import EcommercePlatform from './ecommerce-platform.model';
import { EcommercePlatformService } from './ecommerce-platform.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
  selector: 'app-ecommerce-platform',
  templateUrl: './ecommerce-platform.component.html',
  styleUrls: ['./ecommerce-platform.component.css'],
})
export class EcommercePlatformComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  ecommercePlatformForm: any;
  allEcommercePlatform: Observable<EcommercePlatform[]>;
  selection = new SelectionModel<EcommercePlatform>(true, []);
  ecommercePlatformIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['EcommercePlatformName', 'Remarks'];


  selectedEcommercePlatform: EcommercePlatform;
  ecommercePlatforms: EcommercePlatform[];
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


  constructor(private formbulider: FormBuilder, private EcommercePlatformService: EcommercePlatformService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.EcommercePlatformService.getAllEcommercePlatform().subscribe(data => this.ecommercePlatforms = data);

    this.ecommercePlatformForm = this.formbulider.group({
      ecommerce_paltforms_name: [null, [Validators.required]],
      remarks: ['']
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
    return this.ecommercePlatforms ? this.first === (this.ecommercePlatforms.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.ecommercePlatforms ? this.first === 0 : true;
  }


  selectRow(ecommercePlatform) {
    this.rowData = ecommercePlatform;
  }


  loadEcommercePlatformToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let ecommercePlatformId = this.rowData.ecommerce_paltforms_id;
    this.EcommercePlatformService.GetEcommercePlatformById(ecommercePlatformId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.ecommercePlatformIdUpdate = data.ecommerce_paltforms_id;
      this.ecommercePlatformForm.controls['ecommerce_paltforms_name'].setValue(data.ecommerce_paltforms_name);
      this.ecommercePlatformForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayBasic = true;
  }


  deleteEcommercePlatformInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let ecommercePlatformId = this.rowData.ecommerce_paltforms_id;
    this.EcommercePlatformService.DeleteEcommercePlatform(ecommercePlatformId).subscribe(data => {
      this.massage = null;
      this.loadAllEcommercePlatforms();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllEcommercePlatforms() {
    this.EcommercePlatformService.getAllEcommercePlatform().subscribe(data => {
      this.ecommercePlatforms = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const ecommercePlatformdata = this.ecommercePlatformForm.value;
    this.CreateEcommercePlatform(ecommercePlatformdata);
    this.ecommercePlatformForm.reset();
  }

  resetForm() {
    this.ecommercePlatformForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllEcommercePlatforms();
  }

  CreateEcommercePlatform(ecommercePlatformdata: any) {

    if (this.ecommercePlatformIdUpdate == null) {

      this.EcommercePlatformService.CreateEcommercePlatform(ecommercePlatformdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllEcommercePlatforms();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.ecommercePlatformIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      ecommercePlatformdata.ecommerce_paltforms_id = this.ecommercePlatformIdUpdate;

      this.EcommercePlatformService.UpdateEcommercePlatform(ecommercePlatformdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllEcommercePlatforms();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.ecommercePlatformIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}


