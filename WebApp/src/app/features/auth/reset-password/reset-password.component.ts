import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { ResetPasswordService } from './reset-password-service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpasswordForm: any;
  queryString: any;
  urlParams: any;
  constructor( private notifyService: NotificationService,private ResetPasswordService: ResetPasswordService, private formbulider: FormBuilder, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.resetpasswordForm = this.formbulider.group({
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    

    });

   // let code = new URLSearchParams(window.location.search).get('user_info_id');


  }

  resetPassword() {
    const resetdata = this.resetpasswordForm.value;
    resetdata.UserInfoId = this.route.snapshot.paramMap.get('user_info_id')
    resetdata.Token = this.route.snapshot.paramMap.get('token')
    console.log(resetdata)
    this.ResetPasswordService.ResetPassword(resetdata).subscribe(data => {

      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

    });
  }


}
