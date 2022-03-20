import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


  ResetPassword(resetdata: any): Observable<any> {
    
    return this.http.post<any>(this.ipconfig.base_IP + 'ForgetPassword/ResetPassword',
      resetdata
      
    , httpOptions);
  }
}
