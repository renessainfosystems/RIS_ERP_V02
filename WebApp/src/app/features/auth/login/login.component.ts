import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';


import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/authentication.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    value4: string;
    value1: string;
  value3: string;

   displayModal: boolean;
     showModalDialog() {
        this.displayModal = true;
    }
public loginform:FormGroup
  public forgotForm: FormGroup

  errorMessage = '';

  constructor(private notifyService: NotificationService,private authService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router,private formBuilder: FormBuilder) {

    this.loginform = this.formBuilder.group({
      login_User: '',
      password:''
    });
    this.forgotForm = this.formBuilder.group({
      email: '',
      
    });
   }

  ngOnInit(): void {

  }

  loginUser() {

   // const { login_User, password } = this.loginform;

    this.authService.login(this.loginform.get('login_User')?.value, this.loginform.get('password')?.value).subscribe(
      data => {

        this.tokenStorage.saveToken(data.Token);

        this.tokenStorage.saveUser(data);

            this.router.navigate(['/AppMainComponent']);



      },
      err => {
        this.errorMessage = err.error.message;

      }
    );
  }

  forgotPassword() {
    this.authService.ForgotPassword(this.forgotForm.get('email')?.value).subscribe(data => {

    //  this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
      if (data.MessageType==1) {
        this.displayModal = false;
      }
    });
    
  }
    reloadPage(): void {
      window.location.reload();
    }
}
