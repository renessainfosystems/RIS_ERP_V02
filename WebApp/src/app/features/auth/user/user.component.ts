import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { SelectionModel } from '@angular/cdk/collections';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import User from './user.model';
import { UserService } from './user.service';
import UserTypeModel from './usertype.model';

import { Router } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



let url1 = './test.component.html';
// let url2 = './user.component.html';

@Component({
  selector: 'app-test',
  // templateUrl: './user.component.html',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 15rem;
      }
    `
  ]
})


export class UserComponent implements OnInit {
  @ViewChild('userImage', {
    static: true
  }) userImage;
  @ViewChild('userSignature', {
    static: true
  }) userSignature;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  userRowData: any;
  nodeSelected: boolean = false;
  dataSaved = false;
  userForm: any;
  allUsers: Observable<User[]>;

  selection = new SelectionModel<User>(true, []);
  userIdUpdate = null;
  massage = null;
  selectUser: User;
  CountryId = null;
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;


  displayedColumns: string[] = [ 'UserName', 'LoginId', 'MobileNo', 'EmailAddress',  'Edit', 'Delete'];


  // start child page
mainpage ="user page";



  // end child page


  val4: string;
  val5:string;
  value3: string;
  value5: string;
// start user type *********

  user_type: UserTypeModel[];
  selectusertype: UserTypeModel;
// end user type *********


  users: User[];
  first = 0;
  rows = 10;

// for search
  disabled: boolean = true;
  value1: string;

  // for modal

  displayModal: boolean;

  displayBasic: boolean;
  display: boolean = false;
  showBasicDialog() {
    this.clear();
    this.userIdUpdate = null;
    this.displayBasic = true;
  }



    // for photo and signature upload

  photourllink: string ="assets/images/user-photo1.png";
  selectFile(event){
      if(event.target.files){
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any)=>{
          this.photourllink = event.target.result
        }
      }
    }

  sigurllink: string = "assets/images/user-signature1.png";
  selectSig(event) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.sigurllink = event.target.result
      }
    }
  }

  constructor(private router: Router,private formbulider: FormBuilder, private UserService: UserService , private notifyService: NotificationService) {
    

    // start user type ----------

    this.UserService.GetAllUserTypeEnum().subscribe(data => {
      this.user_type = data;
    });
  
    // end user type ----------

  }

  clear() {
    this.userForm = this.formbulider.group({
      employee_name: [''],
      national_id: [''],
      phone_no: [''],
      remarks: [''],
      confirm_password: [''],
      employee_official: [''],
      user_type_enum: [''],
      user_name: [''],
      login_id: [''],
      email_address: [''],
      mobile_no: [''],
      password: [''],
      ImageUpload: new FormControl(''),
      SignatureUpload: new FormControl('')
    });

  }
  ngOnInit() {

    this.userForm = this.formbulider.group({
      employee_name:['', [Validators.required]],
      national_id:['', [Validators.required]],
      phone_no:['', [Validators.required]],
      remarks:['', [Validators.required]],
      confirm_password:['', [Validators.required]],
      employee_official:['', [Validators.required]],
      user_type_enum: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      login_id: ['', [Validators.required]],
      email_address: ['', [Validators.email]],
      mobile_no: ['', [Validators.required]],
      password: ['', [Validators.required]],
      ImageUpload: new FormControl('', [Validators.required]),
      SignatureUpload: new FormControl('', [Validators.required])
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
    return this.users ? this.first === (this.users.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.users ? this.first === 0 : true;
  }


  deleteUserInfo() {
    if (!this.nodeSelected || this.userRowData == null) {
      return this.notifyService.ShowNotification(2, "Please select one row");

    }

    let user_info_id = this.userRowData.UserInfoId;

    if (confirm("Are you sure to delete items ")) {
      this.UserService.DeleteUser(user_info_id).subscribe(data => {

        this.loadAllUsers();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      })
    }



   

  }
 

  loadUserToEdit() {
    if (!this.nodeSelected || this.userRowData == null) {
      return this.notifyService.ShowNotification(2, "Please select one row");

    }

    let user_info_id = this.userRowData.UserInfoId;
    this.UserService.GetUserById(user_info_id).subscribe(data => {
      
       this.massage = null;
       this.dataSaved = false;
       this.userIdUpdate = data.UserInfoId;
       this.userForm.controls['user_name'].setValue(data.UserName);
       this.userForm.controls['login_id'].setValue(data.LoginId);
       this.userForm.controls['email_address'].setValue(data.EmailAddress);
      this.userForm.controls['mobile_no'].setValue(data.MobileNo);
      this.userForm.controls['national_id'].setValue(data.NationalId);
      this.userForm.controls['password'].setValue(data.Password);
      this.userForm.controls['confirm_password'].setValue(data.Password);
      this.userForm.controls['remarks'].setValue(data.Remarks);
      this.userForm.controls['phone_no'].setValue(data.PhoneNo);
      this.userForm.controls['user_type_enum'].setValue(data.UserTypeEnumId);
      this.photourllink = data.UserImagePath;
      this.sigurllink = data.SignatureImagePath;
 
      this.displayBasic = true;
    });

  }

  loadAllUsers() {
    let user_info_search = (<HTMLInputElement>document.getElementById("user_info_search")).value;

    this.UserService.getAllUser(user_info_search).subscribe(data => {
  
      this.users = data;


    });
  }
  selectUserRow(country) {
    this.userRowData = country;
  }
  onRowSelect(event) {

    this.nodeSelected = true;
    this.userRowData = event.data;


  }
  onRowUnselect(event) {
    this.nodeSelected = false;
    this.userRowData = null;

  }

  onFormSubmit1() {
    this.dataSaved = false;
    const userdata = this.userForm.value;
    this.CreateUser(userdata);
    this.userForm.reset();
  }

  resetForm() {
    this.userForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllUsers();
  }

  searchUserInfo() {

    this.loadAllUsers();
  }
  onFormSubmit() {

    let formData = new FormData();

    for (const key of Object.keys(this.userForm.value)) {
      const value = this.userForm.value[key];
      formData.append(key, value);

    } formData.append("user_type_enum_id", this.userForm.value.user_type_enum);

    if (this.userIdUpdate == null) {
  
      this.UserService.CreateUser(formData).subscribe(data => {
        this.loadAllUsers();
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
        this.userIdUpdate = null;
      });
   
    }
    else {
     // console.log(formData)
      formData.append("user_info_id", this.userIdUpdate);
    
        this.UserService.UpdateUser(formData).subscribe(data => {
          this.loadAllUsers();
          
        this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage);
   
      });

    }

  }
  userActivity() {


    if (!this.nodeSelected || this.userRowData == null) {
      return this.notifyService.ShowNotification(2, "Please select one row");

    }

    let user_info_id = this.userRowData.UserInfoId;


    this.UserService.UserActivity(user_info_id).subscribe(data => {
      this.loadAllUsers();

      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });


  }



  userPermission() {
    if (!this.nodeSelected || this.userRowData == null) {
      return this.notifyService.ShowNotification(2, 'Please select one row');

    }
    this.router.navigate(['/user-menu-permission', { 'data': (this.userRowData.UserInfoId), object: this.userRowData.UserName}]);
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
        this.userImage.nativeElement.innerText = file.name;
        this.userForm.patchValue({
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
        this.userSignature.nativeElement.innerText = file.name;
        this.userForm.patchValue({
          SignatureUpload: file,
        });
      }
    }
    
  }

  CreateUser(userdata: any) {

    if (this.userIdUpdate == null) {

      this.UserService.CreateUser(userdata).subscribe(
        result => {
          this.dataSaved = true;
          
          this.loadAllUsers();
          this.userIdUpdate = null;
          this.userForm.reset();
        }
      );
    } else {
   userdata.user_info_id=this.userIdUpdate;

      this.UserService.UpdateUser(userdata).subscribe(result => {
        this.dataSaved = true;
       
        this.loadAllUsers();
        this.userIdUpdate = null;
        this.userForm.reset();

      });
    }
  }


  }
