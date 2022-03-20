import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Country from './country.model';
import { CountryService } from './country.service';
import ContinentModel from './ContinentModel'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from 'file-saver';

// tf start 
import Division from './division.model';
import District from './district.model';
import { ToastrService } from 'ngx-toastr';
import Thana from './thana.model';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})

export class CountryComponent implements OnInit {
  dataSaved = false;
  massage = null;

  //start country
  countryRowData: any;
  countryForm: any;
  allCountries: Observable<Country[]>;
  countryIdUpdate = null;
  selection = new SelectionModel<Country>(true, []);
  displayedColumns: string[] = ['CountryCode', 'CountryName', 'CountryShortName'];
  selectedContinent: ContinentModel;
  allContinent: ContinentModel[];

  selectCountry: Country;
  countrys: Country[];
  first = 0;
  rows = 10;

  cols: any[];
  _selectedColumns: any[];
  exportColumns;
  //end country

  //start division
  divisionRowData: any;
  divisionForm: any;
  allDivisions: Observable<Division[]>;
  divisionIdUpdate = null;
  divisiondisplayedColumns: string[] = ['DivisionCode', 'DivisionName', 'DivisionShortName'];
  selectedCountry: Division;
  allCountry: Division[];

  selectDivision: Division;
  divisions: Division[];
  //end Division

  //start district
  districtRowData: any;
  districtForm: any;
  allDistricts: Observable<District[]>;
  districtIdUpdate = null;
  districtdisplayedColumns: string[] = ['DistrictCode', 'DistrictName', 'DistrictShortName'];
  selectedDivision: District;
  allDivision: District[];

  selectDistrict: District;
  districts: District[];
  //end district

  //start thana
  thanaRowData: any;
  thanaForm: any;
  allThanas: Observable<Thana[]>;
  thanaIdUpdate = null;
  thanadisplayedColumns: string[] = ['ThanaCode', 'ThanaName', 'ThanaShortName'];
  selectedDistrict: Thana;
  allDistrict: Thana[];

  selectThana: Thana;
  thanas: Thana[];
  //end thana


  selectedChange: number;
  gridApi: any;
// tf start 

 
 
  

  // for delete country data modal
  display: boolean = false;
  showDialog() {
    if (this.selectCountryRow == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }

  displayModal: boolean;
  showModalDialog() {
    this.displayModal = true;
    this.resetForm();
  }

  // for delete division data modal
  displayDivision: boolean = false;
  showDivisionDialog() {
    if (this.selectDivisionRow == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.displayDivision = true;
  }

  displayModaldivision: boolean;
  showModalDialogdivision() {
    this.displayModaldivision = true;
    this.resetForm();
  }

  // for delete district data modal
  displayDistrict: boolean = false;
  showDistrictDialog() {
    if (this.selectDistrictRow == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.displayDistrict = true;
  }
  displayModaldistrict: boolean;
  showModalDialogdistrict() {
    this.displayModaldistrict = true;
    this.resetForm();
  }

  // for delete thana data modal
  displayThana: boolean = false;
  showThanaDialog() {
    if (this.selectThanaRow == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.displayThana = true;
  }
  displayModalthana: boolean;
  showModalDialogthana() {
    this.displayModalthana = true;
    this.resetForm();
  }

  constructor(private formbulider: FormBuilder, private CountryService: CountryService,  private toastr: ToastrService, private notifyService: NotificationService) {
    
  }

  ngOnInit() {
    this.CountryService.getAllCountry().subscribe(data => this.countrys = data);    
    this.countryForm = this.formbulider.group({
      continent_enum: [null,[Validators.required]],
      country_code: [null,[Validators.required]],
      country_name: [null,[Validators.required]],
      country_short_name: [null, [Validators.required]],
      name_in_local_language: null,
      short_name_in_local_language: null,
      remarks: null
    });  
    this.loadAllContinentEnum();

    this.CountryService.getAllDivision().subscribe(data => this.divisions = data);
    this.divisionForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      division_code: [null, [Validators.required]],
      division_name: [null, [Validators.required]],
      division_short_name: [null, [Validators.required]],
      name_in_local_language: null,
      short_name_in_local_language: null,
      remarks: null
    });
    this.loadAllcountryCbo();

    this.CountryService.getAllDistrict().subscribe(data => this.districts = data);
    this.districtForm = this.formbulider.group({
      divisionObj: [null, [Validators.required]],
      district_code: [null, [Validators.required]],
      district_name: [null, [Validators.required]],
      district_short_name: [null, [Validators.required]],
      name_in_local_language: null,
      short_name_in_local_language: null,
      remarks: null
    });
    this.loadAlldivisionCbo();

    this.CountryService.getAllThana().subscribe(data => this.thanas = data);
    this.thanaForm = this.formbulider.group({
      districtObj: [null, [Validators.required]],
      thana_code: [null, [Validators.required]],
      thana_name: [null, [Validators.required]],
      thana_short_name: [null, [Validators.required]],
      name_in_local_language:null,
      short_name_in_local_language: null,
      remarks: null
    });
    this.loadAlldistrictCbo();

    this._selectedColumns = this.cols;
    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
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
    return this.countrys ? this.first === (this.countrys.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.countrys ? this.first === 0 : true;
  }

  

  selectCountryRow(country) {
    this.countryRowData = country;
  }


  loadCountryToEdit() {
    if (this.countryRowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let countryId = this.countryRowData.country_id;
    this.CountryService.GetByCountryId(countryId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.countryIdUpdate = data.country_id;
      this.countryForm.controls['continent_enum'].setValue(data.continent_enum_id);
      this.countryForm.controls['country_code'].setValue(data.country_code);
      this.countryForm.controls['country_name'].setValue(data.country_name);
      this.countryForm.controls['country_short_name'].setValue(data.country_short_name);
      this.countryForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.countryForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.countryForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayModal = true;
  }

  deleteCountryInfo() {
    if (!this.selectCountryRow == null) {
      return this.notifyService.ShowNotification(3, 'Select country row');
    }
    let countryId = this.countryRowData.country_id;
    this.CountryService.DeleteCountry(countryId).subscribe(data => {
      this.massage = null;
      this.loadAllCountry();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllContinentEnum() {
    this.CountryService.getAllContinentEnum().subscribe(data => {
      this.allContinent = data;
    });

  }

  loadAllCountry() {
    this.CountryService.getAllCountry().subscribe(data => {
    });

    this.CountryService.getAllCountry().subscribe(data => {
      this.countrys = data;


    });
  }

  onCountrySubmit() {
    this.dataSaved = false;
    const countrydata = this.countryForm.value;
    countrydata.continent_enum_id = countrydata.continent_enum;
    if (!(countrydata.continent_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select continent")
    }
    if (!(countrydata.country_code)) {
      return this.notifyService.ShowNotification(2, "Please enter country code")
    }
    if (!(countrydata.country_name)) {
      return this.notifyService.ShowNotification(2, "Please enter country name")
    }
    if (!(countrydata.country_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter country short name")
    }
    
    this.CreateCountry(countrydata);
    this.countryForm.reset();   
  }


  resetForm() {
    this.countryForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllCountry();
    
  }  

  CreateCountry(countrydata: any) {
    if (this.countryIdUpdate == null) {
      this.CountryService.CreateCountry(countrydata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllCountry();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
          this.countryIdUpdate = null;
          this.displayModal = true;
         // this.countryForm.reset();
        }
      );
    }
    else {
      countrydata.country_id = this.countryIdUpdate;
      this.CountryService.UpdateCountry(countrydata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllCountry();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
        this.countryIdUpdate = null;
        this.displayModal = true;
        //this.countryForm.reset();

      });
    }
  }
    

  loadAllcountryCbo() {
    this.CountryService.getAllCountryCbo().subscribe(data => this.allCountry = data);

  }


  selectDivisionRow(division) {
    this.divisionRowData = division;
  }
  
  loadDivisionToEdit() {
    if (this.divisionRowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let divisionId = this.divisionRowData.division_id;
    this.CountryService.GetByDivisionId(divisionId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.divisionIdUpdate = data.division_id;
      this.divisionForm.controls['countryObj'].setValue(data.country_id);
      this.divisionForm.controls['division_code'].setValue(data.division_code);
      this.divisionForm.controls['division_name'].setValue(data.division_name);
      this.divisionForm.controls['division_short_name'].setValue(data.division_short_name);
      this.divisionForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.divisionForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.divisionForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayModaldivision = true;
  }

  deleteDivisionInfo() {
    if (!this.selectDivisionRow == null) {
      return this.notifyService.ShowNotification(3, 'Select division row');
    }
    let divisionId = this.divisionRowData.division_id
    this.CountryService.DeleteDivision(divisionId).subscribe(data => {
      this.massage = null;
      this.loadAllDivision();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.displayDivision = false;
  }   
  
  loadAllDivision() {
    this.CountryService.getAllDivision().subscribe(data => {
      this.divisions = data;
    });
  }

  onDivisionSubmit() {
    this.dataSaved = false;
    const divisiondata = this.divisionForm.value;
    divisiondata.country_id = divisiondata.countryObj;
    if (!(divisiondata.country_id)) {
      return this.notifyService.ShowNotification(2, "Please select country")
    }
    if (!(divisiondata.division_code)) {
      return this.notifyService.ShowNotification(2, "Please enter division code")
    }
    if (!(divisiondata.division_name)) {
      return this.notifyService.ShowNotification(2, "Please enter division name")
    }
    if (!(divisiondata.division_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter division short name")
    }
    this.CreateDivision(divisiondata);
    this.divisionForm.reset();
  }

  resetFormDivision() {
    this.divisionForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDivision();

  }  
  CreateDivision(divisiondata: any) {

    if (this.divisionIdUpdate == null) {

      this.CountryService.CreateDivision(divisiondata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDivision();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
          this.divisionIdUpdate = null;
          this.displayModaldivision = true;
          //this.divisionForm.reset();
        }
      );
    } else {
      divisiondata.division_id = this.divisionIdUpdate;
      this.CountryService.UpdateDivision(divisiondata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDivision();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
        this.divisionIdUpdate = null;
        this.displayModaldivision = true;
        //this.divisionForm.reset();

      });
    }
  }

  loadAlldivisionCbo() {
    this.CountryService.getAllDivisionCbo().subscribe(data => this.allDivision = data);

  }

  selectDistrictRow(district) {
    this.districtRowData = district;
  }

  loadDistrictToEdit() {
    if (this.districtRowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let districtId = this.districtRowData.district_id;
    this.CountryService.GetByDistrictId(districtId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.districtIdUpdate = data.district_id;
      this.districtForm.controls['divisionObj'].setValue(data.division_id);
      this.districtForm.controls['district_code'].setValue(data.district_code);
      this.districtForm.controls['district_name'].setValue(data.district_name);
      this.districtForm.controls['district_short_name'].setValue(data.district_short_name);
      this.districtForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.districtForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.districtForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayModaldistrict = true;
  }

  deleteDistrictInfo() {
    if (!this.selectDistrictRow == null) {
      return this.notifyService.ShowNotification(3, 'Select district row');
    }
    let districtId = this.districtRowData.district_id
    this.CountryService.DeleteDistrict(districtId).subscribe(data => {
      this.massage = null;
      this.loadAllDistrict();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.displayDistrict = false;
  }

  loadAllDistrict() {
    this.CountryService.getAllDistrict().subscribe(data => {
      this.districts = data;
    });
  }

  onDistrictSubmit() {
    this.dataSaved = false;
    const districtdata = this.districtForm.value;
    districtdata.division_id = districtdata.divisionObj;
    if (!(districtdata.division_id)) {
      return this.notifyService.ShowNotification(2, "Please select division")
    }
    if (!(districtdata.district_code)) {
      return this.notifyService.ShowNotification(2, "Please enter district code")
    }
    if (!(districtdata.district_name)) {
      return this.notifyService.ShowNotification(2, "Please enter district name")
    }
    if (!(districtdata.district_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter district short name")
    }
    this.CreateDistrict(districtdata);
    this.districtForm.reset();
  }

  resetDistrictForm() {
    this.districtForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDistrict();

  }
  
  CreateDistrict(districtdata: any) {

    if (this.districtIdUpdate == null) {

      this.CountryService.CreateDistrict(districtdata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDistrict();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
          this.districtIdUpdate = null;
          this.displayModaldistrict = true;
          //this.districtForm.reset();
        }
      );
    } else {
      districtdata.district_id = this.districtIdUpdate;
      this.CountryService.UpdateDistrict(districtdata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDistrict();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
        this.districtIdUpdate = null;
        this.displayModaldistrict = true;
        //this.districtForm.reset();

      });
    }
  }

  // Thana Strat


  loadAlldistrictCbo() {
    this.CountryService.getAllDistrictCbo().subscribe(data => this.allDistrict = data);

  }

  selectThanaRow(thana) {
    this.thanaRowData = thana;
  }

  loadThanaToEdit() {
    if (this.thanaRowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let thanaId = this.thanaRowData.thana_id;
    this.CountryService.GetByThanaId(thanaId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.thanaIdUpdate = data.thana_id;
      this.thanaForm.controls['districtObj'].setValue(data.district_id);
      this.thanaForm.controls['thana_code'].setValue(data.thana_code);
      this.thanaForm.controls['thana_name'].setValue(data.thana_name);
      this.thanaForm.controls['thana_short_name'].setValue(data.thana_short_name);
      this.thanaForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.thanaForm.controls['short_name_in_local_language'].setValue(data.short_name_in_local_language);
      this.thanaForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayModalthana = true;
  }

  deleteThanaInfo() {
    if (!this.selectThanaRow == null) {
      return this.notifyService.ShowNotification(3, 'Select thana row');
    }
    let thanaId = this.thanaRowData.thana_id
    this.CountryService.DeleteThana(thanaId).subscribe(data => {
      this.massage = null;
      this.loadAllThana();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.displayThana = false;
  }

  loadAllThana() {
    this.CountryService.getAllThana().subscribe(data => {
      this.thanas = data;
    });
  }

  onThanaSubmit() {
    this.dataSaved = false;
    const thanadata = this.thanaForm.value;
    thanadata.district_id = thanadata.districtObj;
    if (!(thanadata.district_id)) {
      return this.notifyService.ShowNotification(2, "Please select division")
    }
    if (!(thanadata.thana_code)) {
      return this.notifyService.ShowNotification(2, "Please enter thana code")
    }
    if (!(thanadata.thana_name)) {
      return this.notifyService.ShowNotification(2, "Please enter thana name")
    }
    if (!(thanadata.thana_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter thana short name")
    }
    this.CreateThana(thanadata);
    this.thanaForm.reset();
  }

  resetThanaForm() {
    this.thanaForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllThana();

  }

  CreateThana(thanadata: any) {

    if (this.thanaIdUpdate == null) {

      this.CountryService.CreateThana(thanadata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllThana();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
          this.thanaIdUpdate = null;
          this.displayModalthana = true;
        }
      );
    } else {
      thanadata.thana_id = this.thanaIdUpdate;
      this.CountryService.UpdateThana(thanadata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllThana();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage)
        this.thanaIdUpdate = null;
        this.displayModalthana = true;

      });
    }
  }




  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
      const doc = new jsPDF.default('p', 'pt');
        doc['autoTable'](this.exportColumns, this.countrys);
        doc.save('CountryList.pdf');
      })
    })
  }

    exportExcel() {
        import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.countrys);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "countrys");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}

