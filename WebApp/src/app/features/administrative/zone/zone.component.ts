import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Zone from './zone.model';
import { ZoneService } from './zone.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
})
export class ZoneComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  zoneForm: any;
  allZone: Observable<Zone[]>;
  selection = new SelectionModel<Zone>(true, []);
  zoneIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['ZoneName', 'Remarks'];

  selectedCountry: Zone;
  allCountry: Zone[];  

  selectedZone: Zone;
  zones: Zone[];
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


  constructor(private formbulider: FormBuilder, private ZoneService: ZoneService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.ZoneService.getAllZone().subscribe(data => this.zones = data);

    this.zoneForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      country_name: [null, [Validators.required]],
      zone_code: [null, [Validators.required]],
      zone_name: [null, [Validators.required]],
      zone_short_name: [null, [Validators.required]],
      name_in_local_language: null,
      short_name_in_local_language: null,
      remarks: null

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
    return this.zones ? this.first === (this.zones.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.zones ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.ZoneService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }
 
  selectRow(zone) {
    this.rowData = zone;
  }

  loadZoneToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let zoneId = this.rowData.zone_id;
    this.ZoneService.getZoneById(zoneId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.zoneIdUpdate = data.zone_id;
      this.zoneForm.controls['countryObj'].setValue(data.country_id);
      this.zoneForm.controls['zone_code'].setValue(data.zone_code);
      this.zoneForm.controls['zone_name'].setValue(data.zone_name);
      this.zoneForm.controls['zone_short_name'].setValue(data.zone_short_name);
      this.zoneForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.zoneForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.zoneForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteZoneInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let zoneId = this.rowData.zone_id;
    this.ZoneService.deleteZone(zoneId).subscribe(data => {
      this.massage = null;
      this.loadAllZones();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllZones() {
    this.ZoneService.getAllZone().subscribe(data => {
      this.zones = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const zonedata = this.zoneForm.value;
    zonedata.country_id = zonedata.countryObj;
    this.CreateZone(zonedata);
    this.zoneForm.reset();
  }

  resetForm() {
    this.zoneForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllZones();
  }
  
  CreateZone(zonedata: any) {

    if (this.zoneIdUpdate == null) {

      this.ZoneService.createZone(zonedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllZones();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.zoneIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      zonedata.zone_id = this.zoneIdUpdate;

      this.ZoneService.updateZone(zonedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllZones();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.zoneIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}


