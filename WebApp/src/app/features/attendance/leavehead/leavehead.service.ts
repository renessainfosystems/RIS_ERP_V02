import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LeaveheadService {


  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  getAllLeaveHead(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'LeaveHead/GetAllLeaveHead', httpOptions);

  }
  create(leaveHead: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LeaveHead/Create', leaveHead, httpOptions);

  }
  update(leaveHead: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LeaveHead/Update', leaveHead, httpOptions);

  }
  delete(leave_head_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LeaveHead/Delete', { leave_head_id }, httpOptions);

  }
  getLeaveTypeEnumList(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumAttendance/LeaveTypeEnum', httpOptions);
  }
  getGenderEnumList(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumAttendance/GenderEnum', httpOptions);
  }

}
