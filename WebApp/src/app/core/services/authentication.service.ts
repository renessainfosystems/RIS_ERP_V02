import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { IPConfiguration } from './IP-configuration.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  login(login_User: string, password: string): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Authenticate/login', {
      login_User,
      password
    }, httpOptions);
  }

  ForgotPassword(email: string): Observable<any> {
   
    return this.http.post(this.ipconfig.base_IP + 'ForgetPassword/ForgotPassword', {
      email,
      
    });
  }
}
