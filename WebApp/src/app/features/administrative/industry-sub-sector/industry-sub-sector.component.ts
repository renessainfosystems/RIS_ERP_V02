import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import IndustrySubSector from './industry-sub-sector.model';
import { IndustrySubSectorService } from './industry-sub-sector.service'

@Component({
  selector: 'app-industry-sub-sector',
  templateUrl: './industry-sub-sector.component.html',
  styleUrls: ['./industry-sub-sector.component.css']
})
export class IndustrySubSectorComponent implements OnInit {
  rowData: any;
  dataSource: any;
  industrySubSectorForm: any;
  selectedIndustrySubSector: IndustrySubSector;
  industrySubSectors: IndustrySubSector[];
  first = 0;
  rows = 10;
  massage = null;
  displayedColumns: string[] = ['IndustrySubSectorName', 'Remarks'];
  dataSaved: boolean;
  industrySubSectorIdUpdate: any;
  selectedIndustrySector: IndustrySubSector;
  allIndustrySector: IndustrySubSector[];

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

  constructor(private formbulider: FormBuilder, private IndustrySubSectorService: IndustrySubSectorService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.IndustrySubSectorService.getAllIndustrySubSector().subscribe(data => this.industrySubSectors = data);

    this.industrySubSectorForm = this.formbulider.group({
      IndustrySectorObj: [null, [Validators.required]],
      industry_sector_id: [null, [Validators.required]],
      industry_sub_sector_name: [null, [Validators.required]],
      remarks: [null, [Validators.required]]
    });
    this.loadAllIndustrySectorCboList();
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
    return this.industrySubSectors ? this.first === (this.industrySubSectors.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.industrySubSectors ? this.first === 0 : true;
  }

  loadAllIndustrySectorCboList() {
    this.IndustrySubSectorService.getAllIndustrySectorCboList().subscribe(data => {
      this.allIndustrySector = data;
    });
  }

  
  selectRow(industrySubSector) {
    this.rowData = industrySubSector;
  }

  loadIndustrySubSectorToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let industrySubSectorId = this.rowData.industry_sub_sector_id;
    this.IndustrySubSectorService.GetIndustrySubSectorById(industrySubSectorId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.industrySubSectorIdUpdate = data.industry_sub_sector_id;
      this.industrySubSectorForm.controls['IndustrySectorObj'].setValue(data.industry_sector_id);
      this.industrySubSectorForm.controls['industry_sub_sector_name'].setValue(data.industry_sub_sector_name);
      this.industrySubSectorForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteIndustrySubSectorInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let industrySubSectorId = this.rowData.industry_sub_sector_id;
    this.IndustrySubSectorService.DeleteIndustrySubSector(industrySubSectorId).subscribe(data => {
      this.massage = null;
      this.loadAllIndustrySubSectors();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllIndustrySubSectors() {
    this.IndustrySubSectorService.getAllIndustrySubSector().subscribe(data => {
      this.industrySubSectors = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const industrySectordata = this.industrySubSectorForm.value;
    if (!(industrySectordata.industry_sector_id)) {
      return this.notifyService.ShowNotification(2, "Please select industry sector")
    }
    if (!(industrySectordata.industry_sub_sector_name)) {
      return this.notifyService.ShowNotification(2, "Please enter industry sub sector")
    }
    this.CreateIndustrySubSector(industrySectordata);
    this.industrySubSectorForm.reset();
  }

  resetForm() {
    this.industrySubSectorForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllIndustrySubSectors();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  CreateIndustrySubSector(industrySectordata: any) {

    if (this.industrySubSectorIdUpdate == null) {

      this.IndustrySubSectorService.CreateIndustrySubSector(industrySectordata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllIndustrySubSectors();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.industrySubSectorIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      industrySectordata.industry_sub_sector_id = this.industrySubSectorIdUpdate;
      this.IndustrySubSectorService.UpdateIndustrySubSector(industrySectordata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllIndustrySubSectors();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.industrySubSectorIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}





