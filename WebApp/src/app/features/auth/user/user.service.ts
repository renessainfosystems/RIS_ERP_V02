import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import User from './user.model';
import UserTypeModel from './usertype.model';

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const httpOptionsForFileUpload = {
  headers: headers
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllUser(user_info_search: string): Observable<any[]> {

    return this.http.post<any[]>(this.ipconfig.base_IP + 'User/GetAllUsers?user_info_search=' + user_info_search ,httpOptions);


  }

  CreateUser(data: FormData): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'User/Create', data, httpOptionsForFileUpload);

  }
  UpdateUser(data: FormData): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.ipconfig.base_IP + 'User/Update', data, httpOptionsForFileUpload);

  }



  DeleteUser(user_info_id: Number): Observable<any> {
   
    return this.http.post<any>(this.ipconfig.base_IP + 'User/Delete', {user_info_id},httpOptions);

  }

  GetUserById(user_info_id:Number): Observable<any> {
   
    return this.http.get(this.ipconfig.base_IP + 'User/GetUserbyId?user_info_id='+user_info_id,httpOptions);

    
  }
  GetAllUserTypeEnum(): Observable<UserTypeModel[]> {
    return this.http.get<UserTypeModel[]>(this.ipconfig.base_IP + 'GlobalEnum/UserTypeEnum', httpOptions);

  }
  UserActivity(user_info_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'User/UserActivity?user_info_id=' + user_info_id, httpOptions);

  }
}
