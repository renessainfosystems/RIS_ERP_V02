import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Division from './division.model';
import Country from '../country/country.model';
import { DivisionService } from './division.service';


@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {
  dataSaved = false;
  divisionForm: any;
  allDivisions: Observable<Division[]>;
  selection = new SelectionModel<Division>(true, []);
  divisionIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['DivisionCode', 'DivisionName', 'DivisionShortName', 'Edit', 'Delete'];
  allCountry: Division[];
  selectedChange: number;

  constructor(private formbulider: FormBuilder, private DivisionService: DivisionService) {
    this.DivisionService.getAllDivision().subscribe(data => {
    });
  }

  ngOnInit() {
    this.divisionForm = this.formbulider.group({
      country_id: ['', [Validators.required]],
      division_code: ['', [Validators.required]],
      division_name: ['', [Validators.required]],
      division_short_name: ['', [Validators.required]],
      name_in_local_language: [''],
      short_name_in_local_language: [''],
      remarks: [''],
    });
    this.loadAllcountry();
  }

  loadDivisionToEdit(divisionId: Number) {

    this.DivisionService.GetById(divisionId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.divisionIdUpdate = data.division_id;
      this.divisionForm.controls['country_id'].setValue(data.country_id);
      this.divisionForm.controls['division_code'].setValue(data.division_code);
      this.divisionForm.controls['division_name'].setValue(data.division_name);
      this.divisionForm.controls['division_short_name'].setValue(data.division_short_name);
      this.divisionForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.divisionForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.divisionForm.controls['remarks'].setValue(data.remarks);

    });

  }

  loadAllcountry() {
    this.DivisionService.getAllCountryCbo().subscribe(data => this.allCountry = data);

  }

  loadAllDivision() {
    this.DivisionService.getAllDivision().subscribe(data => {

    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const divisiondata = this.divisionForm.value;
    this.CreateDivision(divisiondata);
    this.divisionForm.reset();
  }

  resetForm() {
    this.divisionForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDivision();

  }
  
  CreateDivision(divisiondata: any) {

    if (this.divisionIdUpdate == null) {

      this.DivisionService.CreateDivision(divisiondata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDivision();
          this.divisionIdUpdate = null;
          this.divisionForm.reset();
        }
      );
    } else {
      divisiondata.division_id = this.divisionIdUpdate;
      this.DivisionService.UpdateDivision(divisiondata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDivision();
        this.divisionIdUpdate = null;
        this.divisionForm.reset();

      });
    }
  }
  
}

