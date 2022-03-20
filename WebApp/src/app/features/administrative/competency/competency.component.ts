import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Competency from './competency.model';
import { CompetencyService } from './competency.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-competency',
  templateUrl: './competency.component.html',
  styleUrls: ['./competency.component.css'],  
})
export class CompetencyComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  competencyForm: any;
  allCompetency: Observable<Competency[]>;
  selection = new SelectionModel<Competency>(true, []);
  competencyIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['CompetencyName', 'Remarks'];
  selectedCompanyCorporate: Competency;
  allCompanyCorporate: Competency[];


  selectedCompetency: Competency;
  competencys: Competency[];
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


  constructor(private formbulider: FormBuilder, private CompetencyService: CompetencyService,  private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.CompetencyService.getAllCompetency().subscribe(data => this.competencys = data);

    this.competencyForm = this.formbulider.group({
      competency_name: [null, [Validators.required]],
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
    return this.competencys ? this.first === (this.competencys.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.competencys ? this.first === 0 : true;
  }

    
  selectRow(competency) {
    this.rowData = competency;
  }

  loadCompetencyToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let competencyId = this.rowData.competency_id;
    this.CompetencyService.GetCompetencyById(competencyId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.competencyIdUpdate = data.competency_id;
      this.companyCorporateId = data.company_corporate_id;
      this.competencyForm.controls['competency_name'].setValue(data.competency_name);
      this.competencyForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteCompetencyInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let competencyId = this.rowData.competency_id;
    this.CompetencyService.DeleteCompetency(competencyId).subscribe(data => {
      this.massage = null;
      this.loadAllCompetencys();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllCompetencys() {
    this.CompetencyService.getAllCompetency().subscribe(data => {
      this.competencys = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const competencydata = this.competencyForm.value;
    if (!(competencydata.competency_name)) {
      return this.notifyService.ShowNotification(2, "Please enter competency name")
    }
    this.CreateCompetency(competencydata);
    this.competencyForm.reset();
  }

  resetForm() {
    this.competencyForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllCompetencys();
  }
  
  CreateCompetency(competencydata: any) {

    if (this.competencyIdUpdate == null) {

      this.CompetencyService.CreateCompetency(competencydata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllCompetencys();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.competencyIdUpdate = null;
          //this.competencyForm.reset();
          this.displayBasic = true;
        }
      );
    }
    else
    {
      competencydata.competency_id = this.competencyIdUpdate;
      competencydata.company_corporate_id = this.companyCorporateId;
      this.CompetencyService.UpdateCompetency(competencydata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllCompetencys();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.competencyIdUpdate = null;
        this.displayBasic = true;
      });
    }
  }

}
