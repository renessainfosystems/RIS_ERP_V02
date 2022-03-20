import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import RegistryAuthority from './registry-authority.model';
import { RegistryAuthorityService } from './registry-authority.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

@Component({
  selector: 'app-registry-authority',
  templateUrl: './registry-authority.component.html',
  styleUrls: ['./registry-authority.component.css'],
})
export class RegistryAuthorityComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  registryAuthorityForm: any;
  allRegistryAuthority: Observable<RegistryAuthority[]>;
  selection = new SelectionModel<RegistryAuthority>(true, []);
  registryAuthorityIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['RegistryAuthorityName', 'Remarks'];

  selectedCountry: RegistryAuthority;
  allCountry: RegistryAuthority[];

  selectedRegistryAuthority: RegistryAuthority;
  registryAuthoritys: RegistryAuthority[];
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


  constructor(private formbulider: FormBuilder, private RegistryAuthorityService: RegistryAuthorityService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.RegistryAuthorityService.getAllRegistryAuthority().subscribe(data => this.registryAuthoritys = data);

    this.registryAuthorityForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      registry_authority_name: [null, [Validators.required]],
      registry_authority_short_name: [null, [Validators.required]],
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
    return this.registryAuthoritys ? this.first === (this.registryAuthoritys.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.registryAuthoritys ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.RegistryAuthorityService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }


  selectRow(registryAuthority) {
    this.rowData = registryAuthority;
  }


  loadRegistryAuthorityToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let registryAuthorityId = this.rowData.registry_authority_id;
    this.RegistryAuthorityService.GetRegistryAuthorityById(registryAuthorityId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.registryAuthorityIdUpdate = data.registry_authority_id;
      this.registryAuthorityForm.controls['countryObj'].setValue(data.country_id);      
      this.registryAuthorityForm.controls['registry_authority_name'].setValue(data.registry_authority_name);
      this.registryAuthorityForm.controls['registry_authority_short_name'].setValue(data.registry_authority_short_name);
      this.registryAuthorityForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayBasic = true;
  }

  deleteRegistryAuthorityInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let RegistryAuthorityId = this.rowData.registry_authority_id;
    this.RegistryAuthorityService.DeleteRegistryAuthority(RegistryAuthorityId).subscribe(data => {
      this.massage = null;
      this.loadAllRegistryAuthoritys();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllRegistryAuthoritys() {
    this.RegistryAuthorityService.getAllRegistryAuthority().subscribe(data => {
      this.registryAuthoritys = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const RegistryAuthoritydata = this.registryAuthorityForm.value;
    RegistryAuthoritydata.country_id = RegistryAuthoritydata.countryObj;
    this.CreateRegistryAuthority(RegistryAuthoritydata);
    this.registryAuthorityForm.reset();
  }

  resetForm() {
    this.registryAuthorityForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllRegistryAuthoritys();
  }

  CreateRegistryAuthority(RegistryAuthoritydata: any) {

    if (this.registryAuthorityIdUpdate == null) {

      this.RegistryAuthorityService.CreateRegistryAuthority(RegistryAuthoritydata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllRegistryAuthoritys();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.registryAuthorityIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      RegistryAuthoritydata.registry_authority_id = this.registryAuthorityIdUpdate;

      this.RegistryAuthorityService.UpdateRegistryAuthority(RegistryAuthoritydata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllRegistryAuthoritys();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.registryAuthorityIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

