import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { ToastrService } from 'ngx-toastr';
import Employee from './employeebasicinfo.model';
import { EmployeeService } from './employeebasicinfo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employeebasicinfo',
  templateUrl: './employeebasicinfo.component.html',
  styleUrls: ['./employeebasicinfo.component.css']
})
export class EmployeebasicinfoComponent implements OnInit {


    companyForm: FormGroup;
    submitted = false;

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormClose() {
        this.toggleFormDisplay();
        this.generalIndex();
    }
    //end grid and form show hide ********************

  @ViewChild('employeeImage', {
    static: true
  }) employeeImage;
  @ViewChild('employeeSignature', {
    static: true
  }) employeeSignature;
  @ViewChild('employeeNationalId', {
    static: true
  }) employeeNationalId;
  employeeForm: any;//FormName
  employeeList: any[];//List Employee
  employeedataSource: any[];//single employee
  selectedemployee: any;// Selected Employee  
  isEmployeeEdit: boolean = false;
  nodeSelected: boolean = false;
  //declare dropdown List Property
  drpdwntitleList: Employee[];//Title Dropdown List
  selectedTitle: Employee;//Title Selected Row List
  drpdwngenderList: Employee[];//Gender Dropdown List
  selectedGender: Employee;//Gender Selected Row List
  drpdwnreligionList: Employee[];//Religion Dropdown List
  selectedReligion: Employee;//Gender Selected Row List
  drpdwnbloodGroupList: Employee[];//BloodGroup Dropdown List
  selectedBloodGroup: Employee;//BloodGroup Selected Row List
  drpdwnresidencialStatusList: Employee[];//ResidencialStatus Dropdown List
  selectedResidencialStatus: Employee;//ResidencialStatus Selected Row List
  drpdwnmaritalStatusList: Employee[];//Marital Status Dropdown List
  selectedMaritalStatus: Employee;//Marital Status Selected Row List

  drpdwnNationalityList: Employee[];//Nationality Dropdown List
  selectedNationality: Employee;//Nationality Selected Row List
  drpdwnCountryOfBirthList: Employee[];//Country Of Birth Dropdown List
  selectedCountryOfBirth: Employee;//Country Of Birth Selected Row List
  drpdwnEthnicityList: Employee[];//Country Of Birth Dropdown List
  selectedEthnicity: Employee;//Country Of Birth Selected Row List
  drpdwnPresentCountryList: Employee[];//Present Country Dropdown List
  selectedPresentCountry: Employee;//Present Country Selected Row List
  drpdwnPresentDivisionList: Employee[];//Present Division Dropdown List
  selectedPresentDivision: Employee;//Present Division Selected Row List
  drpdwnPresentDistrictList: Employee[];//Present District Dropdown List
  selectedPresentDistrict: Employee;//Present District Selected Row List
  drpdwnPermanentCountryList: Employee[];//Permanent Country Dropdown List
  selectedPermanentCountry: Employee;//Permanent Country Selected Row List
  drpdwnPermanentDivisionList: Employee[];//Present Division Dropdown List
  selectedPermanentDivision: Employee;//Present Division Selected Row List
  drpdwnPermanentDistrictList: Employee[];//Present District Dropdown List
  selectedPermanentDistrict: Employee;//Present District Selected Row List
  first = 0;
  rows = 10;
  index: number = 0;
  //end dropdown List prperty
  rowData: any;
  // for delete data modal
  display: boolean = false;
  rowSelected: boolean = false;
  selected = true;
  collapsedempInfo = true;
  collapsedempDetails = false;
  collapsed = false;
  checked: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    //if (this.rowData.ApprovedBy) {
    //  return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    //}
    else
      this.display = true;
  }
    generalIndex() {
        this.index = 0;
    }
    function(e) {
        this.index = e.index;
    }
    openNext() {
        this.index = (this.index === 3) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 3 : this.index - 1;
    }
    get f(): { [key: string]: AbstractControl } {
        return this.employeeForm.controls;
    }
    onGeneral(): void {
        this.submitted = true;
        const employeedata = this.employeeForm.value;
        //if (companydata.company_group_id === null) {
        //    return;
        //}
        //else if (companydata.company_name === null) {
        //    return;
        //}
        //else if (companydata.company_prefix === null) {
        //    return;
        //}
        //else if (companydata.company_short_name === null) {
        //    return;
        //}
        //else if (companydata.currency_id === null) {
        //    return;
        //}
        //else {
        if (this.isEmployeeEdit == true) {
            this.openNext();
        } else {
            this.onFormSubmit();
            this.openNext();
        }
           
       // }
        //if (this.employeeForm.invalid) {
        //    return;
        //}
    }
  // for photo and signature upload

    photourllink: string = "assets/images/defaultimg.jpeg";
  selectFile(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photourllink = event.target.result
      }
    }
  }

  sigurllink: string = "assets/images/user-signature1.png";
    //sigurllink: string = "assets/images/defaultimg.jpeg";
  selectSig(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.sigurllink = event.target.result
      }
    }
  }

  filellink: string = "assets/images/FileUpload.png";
  selectuFile(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.filellink = event.target.result
      }
    }
  }
    showBasicDialog() {
    this.resetForm();
    this.toggleGridDisplay();    
    }


    //resetForm() {
    //    this.employeeForm.reset();
    //}
    constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private employeeService: EmployeeService, private toastr: ToastrService) { }

  clear() {
    this.employeeForm = this.formbulider.group({
      code: [''],
      employee_name: [''],
      first_name: [''],
      middle_name: [''],
      sur_name: [''],
      father_name: [''],
      mother_name: [''],
      spouse_name: [''],
      date_of_marriage: [''],
      personal_phone: [''],
      official_phone: [''],
      personal_email: [''],
      official_email: [''],
      date_of_birth: [''],
      identification_mark: [''],
      passport_no: [''],
      birth_id: [''],
      driving_license_no: [''],
      //drownlist field
      title_enum_id: [null],
      title_enum_name: [''],
      gender_enum_id: [null],
      gender_enum_name: [null],
      religion_enum_id: [null],
      ReligionName: [''],
      blood_group_enum_id: [null],
      BloodGroupName: [''],
      residentcial_status_enum_id: [null],
      ResidencialStatusName: [''],
      marital_status_enum_id: [null],
      marital_status_enum_name: [''],
      national_id: [''],
      employee_old_code: [''],
      nationality_id: [''],
      NationalityName: [''],
      country_of_birth_id: [''],
      CountryOfBirthName: [''],
      ethnicity_id: [''],
      EthnicityName: [''],
      ImageUpload: new FormControl(''),
      SignatureUpload: new FormControl('')
    });

  }
  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({    
      code: [null, [Validators.required]],
      employee_name: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      middle_name: [null, [Validators.required]],
      sur_name: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      mother_name: ['', [Validators.required]],
      spouse_name: ['', [Validators.required]],
      date_of_marriage: ['', [Validators.required]],
      personal_phone: ['', [Validators.required]],
      official_phone: ['', [Validators.required]],
      personal_email: ['', [Validators.required]],
      official_email: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      identification_mark: ['', [Validators.required]],
      passport_no: ['', [Validators.required]],
      birth_id: ['', [Validators.required]],
      driving_license_no: ['', [Validators.required]],
      //drownlist field
      title_enum_id: [null, [Validators.required]],
      title_enum_name: ['', [Validators.required]],
      gender_enum_id: [null, [Validators.required]],
      gender_enum_name: [null, [Validators.required]],
      religion_enum_id: [null, [Validators.required]],
      ReligionName: ['', [Validators.required]],
      blood_group_enum_id: [null, [Validators.required]],
      BloodGroupName: ['', [Validators.required]],
      residentcial_status_enum_id: [null, [Validators.required]],
      ResidencialStatusName: ['', [Validators.required]],
      marital_status_enum_id: [null, [Validators.required]],
      marital_status_enum_name: ['', [Validators.required]],
      national_id: ['', [Validators.required]],
      employee_old_code: ['', [Validators.required]],
      nationality_id: ['', [Validators.required]],
      NationalityName: ['', [Validators.required]],
      country_of_birth_id: ['', [Validators.required]],
      CountryOfBirthName: ['', [Validators.required]],
      ethnicity_id: ['', [Validators.required]],
      EthnicityName: ['', [Validators.required]],

      present_country_id: [null, [Validators.required]],
      present_division_id: [null, [Validators.required]],
      present_district_id: [null, [Validators.required]],
      present_ps_area: ['', [Validators.required]],
      present_city: ['', [Validators.required]],
      present_post_code: ['', [Validators.required]],
      present_block: ['', [Validators.required]],
      present_road_no: ['', [Validators.required]],
      present_house_no: ['', [Validators.required]],
      present_flat_no: ['', [Validators.required]],
      present_address_note: ['', [Validators.required]],

      permanent_country_id: [null, [Validators.required]],
      permanent_division_id: [null, [Validators.required]],
      permanent_district_id: [null, [Validators.required]],
      permanent_city: ['', [Validators.required]],
      permanent_ps_area: ['', [Validators.required]],
      permanent_post_code: ['', [Validators.required]],
      permanent_block: ['', [Validators.required]],
      permanent_road_no: ['', [Validators.required]],
      permanent_house_no: ['', [Validators.required]],
      permanent_flat_no: ['', [Validators.required]],
      permanent_address_note: ['', [Validators.required]],

      ImageUpload: new FormControl('', [Validators.required]),
      SignatureUpload: new FormControl('', [Validators.required])
     
    });
    //Load Dropdown
    this.loadEmployeeTittlesdrpdwn();
    this.loadEmployeeGenderdrpdwn();
    this.loadEmployeeReligiondrpdwn();
    this.loadEmployeeBloodGroupdrpdwn();
    this.loadEmployeeResidencialStatusdrpdwn();
    this.loadEmployeeNationalitydrpdwn();
    this.loadCountryOfBirthdrpdwn();
    this.loadEmployeeMaritalStatusdrpdwn();
    this.loadEthnicitydrpdwn();
    this.loadAllEmployees();
    this.loadPresentCountrydrpdwn();
    this.loadPermanentCountrydrpdwn();
  
  }
  onRowSelect(event) {
    debugger;
   // this.toggle();
    this.nodeSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {
   // this.toggle();
    this.nodeSelected = false;
    this.rowData = null;

  }
  toggle() {   
    if (this.collapsedempInfo) {
      this.collapsedempDetails = true;
      this.collapsedempInfo = false;
    }
    else {
      this.collapsedempInfo = true;
      this.collapsedempDetails = false;
    }
  }
  toggleAddress() {
    if (this.collapsed) {
      this.collapsed = false;
    }
    else {
      this.collapsed = true;
    }

  }
  sameAddress(event) {
    if (event.checked) {
      //return this.notifyService.ShowNotification(2, 'Checked true');
      const data = this.employeeForm.value;
      debugger;
     
      this.employeeForm.controls['permanent_country_id'].setValue(data.present_country_id);
      this.onSelectByPermanentCountryId(data.present_country_id);
      this.employeeForm.controls['permanent_ps_area'].setValue(data.present_ps_area);
      this.employeeForm.controls['permanent_block'].setValue(data.present_block);
      this.employeeForm.controls['permanent_house_no'].setValue(data.present_house_no);     
      this.employeeForm.controls['permanent_division_id'].setValue(data.present_division_id);
      this.onSelectByPermanentDivisionId(data.present_division_id);
      this.employeeForm.controls['permanent_city'].setValue(data.present_city);
      this.employeeForm.controls['permanent_post_code'].setValue(data.present_post_code);
      this.employeeForm.controls['permanent_road_no'].setValue(data.present_road_no);
      this.employeeForm.controls['permanent_flat_no'].setValue(data.present_flat_no);
      this.employeeForm.controls['permanent_address_note'].setValue(data.present_address_note);
      this.employeeForm.controls['permanent_district_id'].setValue(data.present_district_id);

    }
    else {
      this.employeeForm.controls['permanent_country_id'].setValue('');
      this.employeeForm.controls['permanent_ps_area'].setValue('');
      this.employeeForm.controls['permanent_block'].setValue('');
      this.employeeForm.controls['permanent_house_no'].setValue('');
      this.employeeForm.controls['permanent_division_id'].setValue('');
      this.employeeForm.controls['permanent_city'].setValue('');
      this.employeeForm.controls['permanent_post_code'].setValue('');
      this.employeeForm.controls['permanent_road_no'].setValue('');
      this.employeeForm.controls['permanent_flat_no'].setValue('');
      this.employeeForm.controls['permanent_address_note'].setValue('');
      this.employeeForm.controls['permanent_district_id'].setValue('');
    }

  }
  btnNew() {
   
    this.toggle();
  }
  loadEmployeeToEdit() {

    debugger;
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    debugger;
    let employeeId = this.rowData.EmployeeId;
    this.employeeService.getEmployeeById(employeeId).subscribe(data => {
      debugger;
      if (data != null) {
        this.isEmployeeEdit = true;
      }
      //if (data.days_of_month != null) {

      //  this.holidayForm.controls['selectedday'].setValue(+data.days_of_month.split('-')[0]);
      //  this.holidayForm.controls['selectedmonth'].setValue(data.days_of_month.split('-')[1]);
      //}
      this.employeeForm.controls['code'].setValue(data.Code);
       
      this.employeeForm.controls['first_name'].setValue(data.FirstName);
      this.employeeForm.controls['middle_name'].setValue(data.MiddleName);
      this.employeeForm.controls['sur_name'].setValue(data.SurName);
      this.employeeForm.controls['father_name'].setValue(data.FatherName);
      this.employeeForm.controls['mother_name'].setValue(data.MotherName);
      this.employeeForm.controls['spouse_name'].setValue(data.SpouseName);
      this.employeeForm.controls['date_of_marriage'].setValue(new Date(data.DateOfMarriage));
     
      this.employeeForm.controls['personal_phone'].setValue(data.PersonalPhone);
      this.employeeForm.controls['official_phone'].setValue(data.OfficialPhone);
      this.employeeForm.controls['personal_email'].setValue(data.PersonalEmail);
      this.employeeForm.controls['official_email'].setValue(data.OfficialEmail);
      this.employeeForm.controls['date_of_birth'].setValue(new Date(data.DateOfBirth));
      this.employeeForm.controls['identification_mark'].setValue(data.IdentificationMark);
      this.employeeForm.controls['passport_no'].setValue(data.PassportNo);
      this.employeeForm.controls['birth_id'].setValue(data.BirthId);
      this.employeeForm.controls['driving_license_no'].setValue(data.DrivingLicenseNo);
      //#DropDownLoad
      this.employeeForm.controls['title_enum_id'].setValue(data.Title_Enum_Id);
      this.employeeForm.controls['title_enum_name'].setValue(data.TitleName);
      this.employeeForm.controls['gender_enum_id'].setValue(data.GenderEnumId);
      this.employeeForm.controls['gender_enum_name'].setValue(data.GenderName);
      this.employeeForm.controls['religion_enum_id'].setValue(data.ReligionEnumId);
      this.employeeForm.controls['ReligionName'].setValue(data.ReligionName);
      this.employeeForm.controls['blood_group_enum_id'].setValue(data.BloodGroupEnumId);
      this.employeeForm.controls['BloodGroupName'].setValue(data.BloodGroupName);
      this.employeeForm.controls['residentcial_status_enum_id'].setValue(data.ResidentcialStatusEnumId);
      this.employeeForm.controls['ResidencialStatusName'].setValue(data.ResidencialStatusName);
      this.employeeForm.controls['marital_status_enum_id'].setValue(data.MaritalStatusEnumId);
      this.employeeForm.controls['marital_status_enum_name'].setValue(data.MaritalName);

      this.employeeForm.controls['nationality_id'].setValue(data.NationalityId);
      this.employeeForm.controls['country_of_birth_id'].setValue(data.CountryOfBirthId);
      this.employeeForm.controls['ethnicity_id'].setValue(data.EthnicityId);
      //this.employeeForm.controls['MaritalName'].setValue(data.MaritalName);
      this.employeeForm.controls['national_id'].setValue(data.NationalId);
      this.employeeForm.controls['employee_old_code'].setValue(data.EmployeeOldCode);

      this.employeeForm.controls['present_country_id'].setValue(data.PresentCountryId);
      this.onSelectByPresentCountryId(data.PresentCountryId);
      this.employeeForm.controls['present_district_id'].setValue(data.PresentDistrictId);
      this.employeeForm.controls['present_ps_area'].setValue(data.PresentPSArea);
      this.employeeForm.controls['present_house_no'].setValue(data.PresentHouseNo);
      this.employeeForm.controls['present_division_id'].setValue(data.PresentDivisionId);
      this.onSelectByPresentDivisionId(data.PresentDivisionId);
      this.employeeForm.controls['present_city'].setValue(data.PresentCity);
      this.employeeForm.controls['present_post_code'].setValue(data.PresentPostCode);
      this.employeeForm.controls['present_road_no'].setValue(data.PresentRoadNo);
      this.employeeForm.controls['present_flat_no'].setValue(data.PresentFlatNo);
      this.employeeForm.controls['present_address_note'].setValue(data.PresentAddressNote);
      this.employeeForm.controls['present_block'].setValue(data.PresentBlock);


      this.employeeForm.controls['permanent_country_id'].setValue(data.PermanentCountryId);
      this.onSelectByPermanentCountryId(data.PermanentCountryId);
      this.employeeForm.controls['permanent_district_id'].setValue(data.PermanentDistrictId);
      this.employeeForm.controls['permanent_ps_area'].setValue(data.PermanentPSArea);
      this.employeeForm.controls['permanent_house_no'].setValue(data.PermanentHouseNo);
      this.employeeForm.controls['permanent_division_id'].setValue(data.PermanentDivisionId);
      this.onSelectByPermanentDivisionId(data.PermanentDivisionId);
      this.employeeForm.controls['permanent_city'].setValue(data.PermanentCity);
      this.employeeForm.controls['permanent_post_code'].setValue(data.PermanentPostCode);
      this.employeeForm.controls['permanent_road_no'].setValue(data.PermanentRoadNo);
      this.employeeForm.controls['permanent_flat_no'].setValue(data.PermanentFlatNo);
      this.employeeForm.controls['permanent_address_note'].setValue(data.PermanentAddressNote);
      this.employeeForm.controls['permanent_block'].setValue(data.PermanentBlock);
      //# end Dropdownload
      this.photourllink = data.EmployeeImagePath;
      this.sigurllink = data.SignatureImagePath;

    });
   // this.displayBasic = true;
     // this.toggle();
      this.toggleGridDisplay();
  }

  deleteEmployee() {
    this.showDialog();
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let employeeId = this.rowData.employee_id;
    this.employeeService.deleteEmployee(employeeId).subscribe(data => {

      this.loadAllEmployees();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

    onFormSubmit() {
    debugger
    //for Image Upload
   
    const data = this.employeeForm.value;

    if (!(data.code)) {
      return this.notifyService.ShowNotification(2, "Please enter Code")
    }
    if (!(data.first_name)) {
      return this.notifyService.ShowNotification(2, "Please enter First Name")
    }
    if (!(data.sur_name)) {
      return this.notifyService.ShowNotification(2, "Please enter Sure Name")
    }
    if (!(data.marital_status_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Marital Status")
    }

    if (!(data.personal_phone)) {
      return this.notifyService.ShowNotification(2, "Please enter Personal Phone")
    } if (!(data.personal_email)) {
      return this.notifyService.ShowNotification(2, "Please enter Personal Email")
    } if (!(data.date_of_birth)) {
      return this.notifyService.ShowNotification(2, "Please enter Date Of Birth")
    } if (!(data.national_id)) {
      return this.notifyService.ShowNotification(2, "Please enter National Id")
    } if (!(data.nationality_id)) {
      return this.notifyService.ShowNotification(2, "Please select Nationality")
    } if (!(data.country_of_birth_id)) {
      return this.notifyService.ShowNotification(2, "Please select Country Of Birth")
    }
    if (!(data.ethnicity_id)) {
      return this.notifyService.ShowNotification(2, "Please select Ethnicity")
    }
    if (!(data.gender_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Gender")
    } if (!(data.mother_name)) {
      return this.notifyService.ShowNotification(2, "Please select Mother Name")
    } if (!(data.religion_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Religion")
    }  if (!(data.residentcial_status_enum_id)) {
      return this.notifyService.ShowNotification(2, "Please select Residentcial Status")
    } if (!(data.father_name)) {
      return this.notifyService.ShowNotification(2, "Please intput father name.")
    }
    let formData = new FormData();
    for (const key of Object.keys(this.employeeForm.value)) {
      const value = this.employeeForm.value[key];
      if (key == "date_of_marriage") {
        let date = new Date(value).toISOString();
        formData.append("date_of_marriage", date);
      }
      else if (key == "date_of_birth") {
        let date = new Date(value).toISOString();
        formData.append("date_of_birth", date);
      }
      else {

        formData.append(key, value);
      }
      //  formData.append(key, value);

    } //formData.append("user_type_enum_id", this.employeeForm.value.user_type_enum);
    //for Image Upload
    console.log(formData)


    if (this.isEmployeeEdit) {

      data.employeeId = this.rowData.EmployeeId;
      formData.append("employee_id", this.rowData.EmployeeId);
     
      this.employeeService.updateEmployee(formData).subscribe(result => {

        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllEmployees();
        this.isEmployeeEdit = false;
      });
    }
    else {
     
      this.employeeService.createEmployee(formData).subscribe(
        result => {
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.loadAllEmployees();
        }
      );
    }

    // this.displayBasic = false;

  }

  loadAllEmployees() {
    this.employeeService.getAllEmployee().subscribe(data => {
      console.log(data)
      this.employeeList = data;
    });
  }
  //exportPdf() {
  //  import("jspdf").then(jsPDF => {
  //    import("jspdf-autotable").then(x => {
  //      const doc = new jsPDF.default(0, 0);
  //      doc.autoTable(this.exportColumns, this.employeeList);
  //      doc.save('products.pdf');
  //    })
  //  })
  //}
  //  exportColumns(exportColumns: any, employeeList: any[]) {
  //      throw new Error('Method not implemented.');
  //  }

  //exportExcel() {
  //  import("xlsx").then(xlsx => {
  //    const worksheet = xlsx.utils.json_to_sheet(this.employeeList);
  //    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //    this.saveAsExcelFile(excelBuffer, "products");
  //  });
  //}
  //saveAsExcelFile(buffer: any, fileName: string): void {
  //  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //  let EXCEL_EXTENSION = '.xlsx';
  //  const data: Blob = new Blob([buffer], {
  //    type: EXCEL_TYPE
  //  });
  //  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //}
  //
  loadEmployeeTittlesdrpdwn() {
    this.employeeService.getEmployeeTittle().subscribe(data => {
      this.drpdwntitleList = data;
    });
  }
  loadEmployeeGenderdrpdwn() {
    this.employeeService.getEmployeeGender().subscribe(data => {
      this.drpdwngenderList = data;
    });
  }
  loadEmployeeReligiondrpdwn() {
    this.employeeService.getEmployeeReligion().subscribe(data => {
      this.drpdwnreligionList = data;
    });
  }
  loadEmployeeBloodGroupdrpdwn() {
    this.employeeService.getEmployeeBloodGroup().subscribe(data => {
      this.drpdwnbloodGroupList = data;
    });
  }
  loadEmployeeResidencialStatusdrpdwn() {
    this.employeeService.getResidencialStatus().subscribe(data => {
      this.drpdwnresidencialStatusList = data;
    });
  }

  loadEmployeeMaritalStatusdrpdwn() {
    this.employeeService.getMaritalStatus().subscribe(data => {
      this.drpdwnmaritalStatusList = data;
    });
  }

  loadEmployeeNationalitydrpdwn() {
    this.employeeService.getAllCountry().subscribe(data => {
      this.drpdwnNationalityList = data;
    });
  }
  loadCountryOfBirthdrpdwn() {
    this.employeeService.getAllCountry().subscribe(data => {
      this.drpdwnCountryOfBirthList = data;
    });
  }
  loadEthnicitydrpdwn() {
    this.employeeService.getAllCountry().subscribe(data => {
      this.drpdwnEthnicityList = data;
    });
  }
  //Address
  loadPresentCountrydrpdwn() {
    this.employeeService.getAllCountry().subscribe(data => {
      this.drpdwnPresentCountryList = data;
    });
    }
    resetForm() {
        this.employeeForm.reset();
        this.isEmployeeEdit = false;
        this.loadAllEmployees();
        this.employeedataSource = [];
    }
  //loadPresentDivisiondrpdwn() {
  //  this.employeeService.getAllDivision().subscribe(data => {
  //    this.drpdwnPresentDivisionList = data;
  //  });
  //}
  //loadPresentDistrictrpdwn() {
  //  this.employeeService.getAllDistrict().subscribe(data => {
  //    this.drpdwnPresentDistrictList = data;
  //  });
  //}
  loadPermanentCountrydrpdwn() {
    this.employeeService.getAllCountry().subscribe(data => {
      this.drpdwnPermanentCountryList = data;
    });
  }

  //loadPermanentDivisiondrpdwn() {
  //  this.employeeService.getAllDivision().subscribe(data => {
  //    this.drpdwnPermanentDivisionList = data;
  //  });
  //}

  //loadPermanentDistrictrpdwn() {
  //  this.employeeService.getAllDistrict().subscribe(data => {
  //    this.drpdwnPermanentDistrictList = data;
  //  });
  //}
  onSelectByPresentCountryId(countryId: Number) {
    if (countryId != null) {
      this.employeeService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.drpdwnPresentDivisionList = data;
      });
    }
    else
      this.drpdwnPresentDivisionList = null;
  }

  onSelectByPresentDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.employeeService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.drpdwnPresentDistrictList = data;
      });
    }
    else
      this.drpdwnPresentDistrictList = null;

  }
  onSelectByPermanentCountryId(countryId: Number) {
    if (countryId != null) {
      this.employeeService.getAllDivisionCboListByCountryId(countryId).subscribe(data => {
        this.drpdwnPermanentDivisionList = data;
      });
    }
    else
      this.drpdwnPermanentDivisionList = null;
  }

  onSelectByPermanentDivisionId(divisionId: Number) {
    if (divisionId != null) {
      this.employeeService.getAllDistrictCboListByDivisionId(divisionId).subscribe(data => {
        this.drpdwnPermanentDistrictList = data;
      });
    }
    else
      this.drpdwnPermanentDistrictList = null;

  }
  //#end Address

  employeeActiveInactive() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    //if (this.rowData.IsActive) {
    //  return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    //}
    let employeeId = this.rowData.EmployeeId;
    this.employeeService.employeeActivity(employeeId).subscribe(
      result => {
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.loadAllEmployees();
      }
    );

  }
  //resetForm() {
  //  this.employeeForm.reset();
  //  this.isEmployeeEdit = false;
  //  this.loadAllEmployees();
  //  this.employeedataSource = [];
  //}

  onSelectImage(event) {

    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photourllink = event.target.result

      }
      alert(this.photourllink)
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.employeeImage.nativeElement.innerText = file.name;
        this.employeeForm.patchValue({
          ImageUpload: file,
        });
      }

    }

  }
  onSelectSignature(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.sigurllink = event.target.result
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.employeeSignature.nativeElement.innerText = file.name;
        this.employeeForm.patchValue({
          SignatureUpload: file,
        });
      }
    }

  }

  onSelectFile(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.filellink = event.target.result
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
       // this.employeeNationalId.nativeElement.innerText = file.name;
        this.employeeForm.patchValue({
          NationalIdUpload: file,
        });
      }
    }
  }

}
