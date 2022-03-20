import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import IndustrySector from './industry-sector.model';
import { IndustrySectorService } from './industry-sector.service'

@Component({
  selector: 'app-industry-sector',
  templateUrl: './industry-sector.component.html',
  styleUrls: ['./industry-sector.component.css']
})
export class IndustrySectorComponent implements OnInit {
  rowData: any;
  dataSource: any;
  industrySectorForm: any;
  selectedIndustrySector: IndustrySector;
  industrySectors: IndustrySector[];
  first = 0;
  rows = 10;
  massage = null;
  dataSaved: boolean;
  industrySectorIdUpdate: any;

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

  constructor(private formbulider: FormBuilder, private IndustrySectorService: IndustrySectorService,  private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.IndustrySectorService.getAllIndustrySector().subscribe(data => this.industrySectors = data);

    this.industrySectorForm = this.formbulider.group({
      industry_sector_name: [null, [Validators.required]],
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
    return this.industrySectors ? this.first === (this.industrySectors.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.industrySectors ? this.first === 0 : true;
  }


  
  selectRow(industrySector) {
    this.rowData = industrySector;
  }

  loadIndustrySectorToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let industrySectorId = this.rowData.industry_sector_id;
    this.IndustrySectorService.GetIndustrySectorById(industrySectorId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.industrySectorIdUpdate = data.industry_sector_id;
      this.industrySectorForm.controls['industry_sector_name'].setValue(data.industry_sector_name);
      this.industrySectorForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteIndustrySectorInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let industrySectorId = this.rowData.industry_sector_id;
    this.IndustrySectorService.DeleteIndustrySector(industrySectorId).subscribe(data => {
      this.massage = null;
      this.loadAllIndustrySectors();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllIndustrySectors() {
    this.IndustrySectorService.getAllIndustrySector().subscribe(data => {
      this.industrySectors = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const industrySectordata = this.industrySectorForm.value;
    if (!(industrySectordata.industry_sector_name)) {
      return this.notifyService.ShowNotification(2, "Please enter industry sector name")
    }
    this.CreateIndustrySector(industrySectordata);
    this.industrySectorForm.reset();
  }

  resetForm() {
    this.industrySectorForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllIndustrySectors();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  CreateIndustrySector(industrySectordata: any) {

    if (this.industrySectorIdUpdate == null) {

      this.IndustrySectorService.CreateIndustrySector(industrySectordata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllIndustrySectors();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.industrySectorIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      industrySectordata.industry_sector_id = this.industrySectorIdUpdate;
      this.IndustrySectorService.UpdateIndustrySector(industrySectordata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllIndustrySectors();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.industrySectorIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}




