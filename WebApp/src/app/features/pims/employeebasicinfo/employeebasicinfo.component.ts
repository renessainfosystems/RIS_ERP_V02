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

    submitted = false;

    officialFormSubmitted = false;
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
    employeeForm: FormGroup;//FormName
    employeeOfficialForm: FormGroup;
    employeeList: any[];//List Employee
    employeedataSource: any[];//single employee
    selectedemployee: any;// Selected Employee
     //Employee Official
    locationList: any[];
    departmentList: any[];
    positionList: any[];
    designationList: any[];
    jobdomicileList: any[];
    serviceTypeList: any[];
    confirmationSatusList: any[];
    workActionList: any[];
    jobLocationList: any[];

    isEmployeeEdit: boolean = false;
    nodeSelected: boolean = false;
    //declare dropdown List Property
    drpdwntitleList: Employee[];//Title Dropdown List    
    drpdwngenderList: Employee[];//Gender Dropdown List    
    drpdwnreligionList: Employee[];//Religion Dropdown List    
    drpdwnbloodGroupList: Employee[];//BloodGroup Dropdown List   
    drpdwnresidencialStatusList: Employee[];//ResidencialStatus Dropdown List    
    drpdwnmaritalStatusList: Employee[];//Marital Status Dropdown List
    drpdwnNationalityList: Employee[];//Nationality Dropdown List     
    drpdwnCountryOfBirthList: Employee[];//Country Of Birth Dropdown List    
    drpdwnEthnicityList: Employee[];//Country Of Birth Dropdown List     
    drpdwnPresentCountryList: Employee[];//Present Country Dropdown List    
    drpdwnPresentDivisionList: Employee[];//Present Division Dropdown List    
    drpdwnPresentDistrictList: Employee[];//Present District Dropdown List     
    drpdwnPermanentCountryList: Employee[];//Permanent Country Dropdown List    
    drpdwnPermanentDivisionList: Employee[];//Present Division Dropdown List   
    drpdwnPermanentDistrictList: Employee[];//Present District Dropdown List
   

    index: number = 0;
    //end dropdown List prperty
    rowData: any;
    // for delete data modal
    display: boolean = false;
    rowSelected: boolean = false;
    selected = true;

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
    get form(): { [key: string]: AbstractControl } {
        return this.employeeOfficialForm.controls;
    }
    get f(): { [key: string]: AbstractControl } {
        return this.employeeForm.controls;
    }
   
    onGeneral(): void {
      
        this.submitted = true;
        if (this.employeeForm.invalid ) {
            return;
        }
        const data = this.employeeForm.value;
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
    onNext(): void {

        const data = this.employeeForm.value;

        if (this.isEmployeeEdit) {
            if (!(data.present_country_id)) {
                return this.notifyService.ShowNotification(2, "Please select present country.")
            }
            if (!(data.present_division_id)) {
                return this.notifyService.ShowNotification(2, "Please select present division.")
            }
            if (!(data.present_district_id)) {
                return this.notifyService.ShowNotification(2, "Please select present district.")
            }
            if (!(data.present_district_id)) {
                return this.notifyService.ShowNotification(2, "Please select present district.")
            }
            if (data.present_city=="") {
                return this.notifyService.ShowNotification(2, "Please input present city.")
            } if (data.present_ps_area=="") {
                return this.notifyService.ShowNotification(2, "Please input ps area.")
            }
            //if (this.isEmployeeEdit == true) {
                this.onFormSubmit();
                this.openNext();
            //}
        }

       
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
        this.toggleGridDisplay();
    }


    constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private employeeService: EmployeeService, private toastr: ToastrService) { }

    clear() {
        this.employeeForm = this.formbulider.group({
            code: ['', [Validators.required]],
            first_name: ['', [Validators.required]],
            middle_name: [''],
            sur_name: ['', [Validators.required]],
            father_name: ['', [Validators.required]],
            mother_name: ['', [Validators.required]],
            spouse_name: [''],
            date_of_marriage: [null],
            personal_phone: ['', [Validators.required]],
            official_phone: [''],
            personal_email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            official_email: [''],
            date_of_birth: ['', [Validators.required]],
            identification_mark: [''],
            passport_no: [''],
            birth_id: [''],
            driving_license_no: [''],
            //drownlist field
            title_enum_id: ['', [Validators.required]],
            gender_enum_id: ['', [Validators.required]],
            religion_enum_id: ['', [Validators.required]],
            ReligionName: [''],
            blood_group_enum_id: ['', [Validators.required]],
            residentcial_status_enum_id: ['', [Validators.required]],
            marital_status_enum_id: ['', [Validators.required]],
            national_id: ['', [Validators.required]],
            employee_old_code: [''],
            nationality_id: ['', [Validators.required]],
            NationalityName: [''],
            country_of_birth_id: ['', [Validators.required]],
            CountryOfBirthName: [''],
            ethnicity_id: ['', [Validators.required]],
            EthnicityName: [''],

            present_country_id: [0],
            employee_id: [0],
            present_division_id: [0],
            present_district_id: [0],
            present_ps_area: [''],
            present_city: [''],
            present_post_code: [''],
            present_block: [''],
            present_road_no: [''],
            present_house_no: [''],
            present_flat_no: [''],
            present_address_note: [''],

            permanent_country_id: [0],
            permanent_division_id: [0],
            permanent_district_id: [0],
            permanent_city: [''],
            permanent_ps_area: [''],
            permanent_post_code: [''],
            permanent_block: [''],
            permanent_road_no: [''],
            permanent_house_no: [''],
            permanent_flat_no: [''],
            permanent_address_note: [''],

            ImageUpload: new FormControl(null),
            SignatureUpload: new FormControl(null)

        });
       
    }
    ngOnInit(): void {
        this.clear();
        this.employeeOfficialForm = this.formbulider.group({
            employee_id: [0],
            location_id: [null, [Validators.required]],
            company_group_id: [0],
            designation_id: [null, [Validators.required]],
            company_id: [0],
            department_id: [null, [Validators.required]],
            position_id: [null, [Validators.required]],
            date_of_confirmation: [null, [Validators.required]],
            organogram_detail_id: 0,
            job_domicile_id: [null, [Validators.required]],
            service_type_id: [null, [Validators.required]],
            confirmation_status_id: [null, [Validators.required]],
            working_action_id: [null, [Validators.required]],
            job_location_id: [null, [Validators.required]],
            date_of_join: [null, [Validators.required]],

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
        this.loadLocation();

        //Employee Official
        this.loadJobDomicile();
        this.loadDesignation();
        this.loadServiceType();
        this.loadWorkAction();
        this.loadJobLocation();
        this.loadConfirmationStatus();
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
  
    sameAddress(event) {
        if (event.checked) {
          
            const data = this.employeeForm.value;
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
 
    loadEmployeeToEdit() {

        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        let employeeId = this.rowData.EmployeeId;
        this.employeeService.getEmployeeById(employeeId).subscribe(data => {
            
            if (data != null) {
                this.isEmployeeEdit = true;
            }
          
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

            this.employeeForm.controls['gender_enum_id'].setValue(data.GenderEnumId);

            this.employeeForm.controls['religion_enum_id'].setValue(data.ReligionEnumId);

            this.employeeForm.controls['blood_group_enum_id'].setValue(data.BloodGroupEnumId);

            this.employeeForm.controls['residentcial_status_enum_id'].setValue(data.ResidentcialStatusEnumId);

            this.employeeForm.controls['marital_status_enum_id'].setValue(data.MaritalStatusEnumId);


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
    onOfficialFormSubmit() {
        
        const data = this.employeeOfficialForm.value;
        console.log(data)
        this.officialFormSubmitted = true;

        if (this.employeeOfficialForm.invalid) {

            return;
        }
        data.date_of_join = new Date((data.date_of_join)).toLocaleString();
        data.date_of_confirmation = new Date((data.date_of_confirmation)).toLocaleString();
        this.employeeService.createEmployeeOfficial(data).subscribe(
            result => {
                if (result.MessageType == 1) {
                    this.resetForm();
                   
                }
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

            });
    }

    onFormSubmit() {
      
        //for Image Upload
        const data = this.employeeForm.value;

        if (this.isEmployeeEdit) {
            if (!(data.present_country_id)) {
                return this.notifyService.ShowNotification(2, "Please select present country.")
            }
            if (!(data.present_division_id)) {
                return this.notifyService.ShowNotification(2, "Please select present division.")
            }
            if (!(data.present_district_id)) {
                return this.notifyService.ShowNotification(2, "Please select present district.")
            }
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
           

        }
        if (this.isEmployeeEdit) {
            debugger
            if (this.rowData != undefined) {
                data.employeeId = this.rowData.EmployeeId;
                formData.append("employee_id", this.rowData.EmployeeId);
            }
           

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
                    this.isEmployeeEdit = true;
                    // //result.Data[0].organogram_id
                    debugger
                    if (this.rowData != undefined) {
                        this.rowData.EmployeeId = result.Data[0].employee_id;
                    }                   
                    this.employeeList = result.Data[0];                    
                    this.employeeForm.controls['employee_id'].setValue(result.Data[0].employee_id);
                   // this.loadAllEmployees();
                }
            );
           
        }
    }

    loadAllEmployees() {
        this.employeeService.getAllEmployee().subscribe(data => {
            
            this.employeeList = data;
        });
    }
 
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
        //this.employeeForm.reset();
        this.isEmployeeEdit = false;
        this.loadAllEmployees();
        this.employeedataSource = [];
    }

    loadPermanentCountrydrpdwn() {
        this.employeeService.getAllCountry().subscribe(data => {
            this.drpdwnPermanentCountryList = data;
        });
    }

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
       
        let employeeId = this.rowData.EmployeeId;
        this.employeeService.employeeActivity(employeeId).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                this.loadAllEmployees();
            }
        );

    }
    

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
    loadLocation() {

        this.employeeService.getLocationByOrganogram().subscribe(data => {
            this.locationList = data;
        });
    }
    onSelectLocation(location_id: number) {

        if (location_id != null) {

            this.employeeService.getDepartmentByOrganogram(location_id).subscribe(data => {
                this.departmentList = data;
            });
        }
        else
            this.departmentList = null;
    }
    onSelectDepartment(department_id: number) {

        let location_id = this.employeeOfficialForm.get('location_id')?.value;

        if (department_id != null) {

            this.employeeService.getPositionByOrganogram(location_id, department_id).subscribe(data => {
                this.positionList = data;
            });
        }
        else
            this.positionList = null;
    }

    loadDesignation() {
        this.employeeService.getAllDesignation().subscribe(data => {
            this.designationList = data;
        });

    }

    loadJobDomicile() {
        this.employeeService.getJobDomicile().subscribe(data => {
            this.jobdomicileList = data;
        });

    }
    loadJobLocation() {
        this.employeeService.getJobLocation().subscribe(data => {
            this.jobLocationList = data;
        });

    }
    loadServiceType() {
        this.employeeService.getServiceType().subscribe(data => {
            this.serviceTypeList = data;
        });

    }
    loadWorkAction() {
        this.employeeService.getWorkAction().subscribe(data => {
            this.workActionList = data;
        });

    }

    loadConfirmationStatus() {
        this.employeeService.getConfirmationStatus().subscribe(data => {
            this.confirmationSatusList = data;
        });

    }
}
