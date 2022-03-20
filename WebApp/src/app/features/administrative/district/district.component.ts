import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import District from './district.model';
import { DistrictService } from './district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  dataSaved = false;
  districtForm: any;
  allDistricts: Observable<District[]>;
  selection = new SelectionModel<District>(true, []);
  districtIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['DistrictCode', 'DistrictName', 'DistrictShortName', 'Edit', 'Delete'];
  allDivision: District[];
  selectedChange: number;

  constructor(private formbulider: FormBuilder, private DistrictService: DistrictService) {
    this.DistrictService.getAllDistrict().subscribe(data => {
    });
  }

  ngOnInit() {
    this.districtForm = this.formbulider.group({
      division_id: ['', [Validators.required]],
      district_code: ['', [Validators.required]],
      district_name: ['', [Validators.required]],
      district_short_name: ['', [Validators.required]],
      name_in_local_language: [''],
      short_name_in_local_language: [''],
      remarks: [''],
    });
    this.loadAlldivision();
  }

  loadDistrictToEdit(districtId: Number) {

    this.DistrictService.GetById(districtId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.districtIdUpdate = data.district_id;
      this.districtForm.controls['division_id'].setValue(data.division_id);
      this.districtForm.controls['district_code'].setValue(data.district_code);
      this.districtForm.controls['district_name'].setValue(data.district_name);
      this.districtForm.controls['district_short_name'].setValue(data.district_short_name);
      this.districtForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.districtForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.districtForm.controls['remarks'].setValue(data.remarks);

    });

  }

  loadAlldivision() {
    this.DistrictService.getAllDivisionCbo().subscribe(data => this.allDivision = data);

  }

  loadAllDistrict() {
    this.DistrictService.getAllDistrict().subscribe(data => {

    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const districtdata = this.districtForm.value;
    this.CreateDistrict(districtdata);
    this.districtForm.reset();
  }

  resetForm() {
    this.districtForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDistrict();

  }

  CreateDistrict(districtdata: any) {

    if (this.districtIdUpdate == null) {

      this.DistrictService.CreateDistrict(districtdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDistrict();
          this.districtIdUpdate = null;
          this.districtForm.reset();
        }
      );
    } else {
      districtdata.district_id = this.districtIdUpdate;
      this.DistrictService.UpdateDistrict(districtdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDistrict();
        this.districtIdUpdate = null;
        this.districtForm.reset();

      });
    }
  }

}


