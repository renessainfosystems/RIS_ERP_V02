import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Regulator from './regulator.model';
import { RegulatorService } from './regulator.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
  selector: 'app-regulator',
  templateUrl: './regulator.component.html',
  styleUrls: ['./regulator.component.css'],
})
export class RegulatorComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  regulatorForm: any;
  allRegulator: Observable<Regulator[]>;
  selection = new SelectionModel<Regulator>(true, []);
  regulatorIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['RegulatorName', 'Remarks'];


  selectedCountry: Regulator;
  allCountry: Regulator[];

  selectedRegulator: Regulator;
  regulators: Regulator[];
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


  constructor(private formbulider: FormBuilder, private RegulatorService: RegulatorService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.RegulatorService.getAllRegulator().subscribe(data => this.regulators = data);

    this.regulatorForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      regulator_name: [null, [Validators.required]],
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
    return this.regulators ? this.first === (this.regulators.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.regulators ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.RegulatorService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }


  selectRow(Regulator) {
    this.rowData = Regulator;
  }


  loadRegulatorToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let regulatorId = this.rowData.regulator_id;
    this.RegulatorService.GetRegulatorById(regulatorId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.regulatorIdUpdate = data.regulator_id;
      this.regulatorForm.controls['countryObj'].setValue(data.country_id);
      this.regulatorForm.controls['regulator_name'].setValue(data.regulator_name);
      this.regulatorForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayBasic = true;
  }

  deleteRegulatorInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let regulatorId = this.rowData.regulator_id;
    this.RegulatorService.DeleteRegulator(regulatorId).subscribe(data => {
      this.massage = null;
      this.loadAllRegulators();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllRegulators() {
    this.RegulatorService.getAllRegulator().subscribe(data => {
      this.regulators = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const regulatordata = this.regulatorForm.value;
    regulatordata.country_id = regulatordata.countryObj;
    this.CreateRegulator(regulatordata);
    this.regulatorForm.reset();
  }

  resetForm() {
    this.regulatorForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllRegulators();
  }

  CreateRegulator(regulatordata: any) {
    if (this.regulatorIdUpdate == null) {

      this.RegulatorService.CreateRegulator(regulatordata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllRegulators();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.regulatorIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      regulatordata.regulator_id = this.regulatorIdUpdate;

      this.RegulatorService.UpdateRegulator(regulatordata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllRegulators();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.regulatorIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}

