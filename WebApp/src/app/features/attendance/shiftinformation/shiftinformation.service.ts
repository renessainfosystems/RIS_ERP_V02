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
export class ShiftinformationService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  getAllShift(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'ShiftInformation/GetAllShift', httpOptions);

  }
  GetAllShiftByFiltering(shiftFiltering): Observable<any[]> {

    return this.http.post<any[]>(this.ipconfig.base_IP + 'ShiftInformation/GetAllShiftByFiltering', shiftFiltering, httpOptions);

  }
  create(shiftInfo: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/Create', shiftInfo, httpOptions);

  }
  update(shiftInfo: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/Update', shiftInfo, httpOptions);

  }
  approve(shift_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/Approve', { shift_id }, httpOptions);

  }
  AddBreakDurationForShiftUpdate(shiftBreakDuration: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/AddBreakDurationForShiftUpdate', shiftBreakDuration, httpOptions);

  }
  RemoveBreakDurationForShiftUpdate(shift_break_duration_id: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/RemoveBreakDurationForShiftUpdate', { shift_break_duration_id }, httpOptions);

  }


  delete(shift_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftInformation/Delete', { shift_id }, httpOptions);

  }
  getShiftDurationSlabById(shift_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'ShiftInformation/GetShiftDurationSlabById?shift_id=' + shift_id, httpOptions);
  }
  getShiftById(shift_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'ShiftInformation/GetShiftById?shift_id=' + shift_id, httpOptions);
  }
  getAllActiveBreakForDP(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'ShiftBreak/GetAllActiveBreakForDP', httpOptions);
  }
  getAllActiveOTPolicyForDP(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetAllActiveOTPolicyForDP', httpOptions);
  }
  getActiveOTPolicyById(OT_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetActiveOTPolicyById?OT_policy_id=' + OT_policy_id, httpOptions);
  }
  getTimeZone(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'ShiftInformation/GetTimeZone', httpOptions);
  }
  getOTPolicySlabById(OT_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetOTPolicySlabById?OT_policy_id=' + OT_policy_id, httpOptions);
  }
  getShiftTypeEnum(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'GlobalEnumAttendance/ShiftTypeEnum', httpOptions);
  }
  

}
