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
export class AttendancebenefitpolicyService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  getAllAttendanceBenefitPolicy(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/GetAllAttendanceBenefitPolicy', httpOptions);

  }

  create(attendanceBenefitPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/Create', attendanceBenefitPolicy, httpOptions);

  }
  update(attendanceBenefitPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/Update', attendanceBenefitPolicy, httpOptions);

  }
  approve(abp_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/Approve', { abp_id }, httpOptions);

  }
  delete(abp_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/Delete', { abp_id }, httpOptions);

  }
  getPolicyById(abp_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/GetAttendanceBenefitPolicyById?abp_id=' + abp_id, httpOptions);
  }
  getBenefitPolicyCode(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/GetBenefitPolicyCode', httpOptions);
  }
  getAllActiveOTPolicyForDP(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetAllActiveOTPolicyForDP', httpOptions);
  }
  getActiveOTPolicyById(OT_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetActiveOTPolicyById?OT_policy_id=' + OT_policy_id, httpOptions);
  }

  getOTPolicySlabById(OT_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetOTPolicySlabById?OT_policy_id=' + OT_policy_id, httpOptions);
  }
  getEnumBenefitTypeOnWork(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'GlobalEnumAttendance/EnumBenefitTypeOnWork', httpOptions);
  }
  getAllHolidayForDP(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'Holiday/GetHolidayListForDP', httpOptions);

  }
  getAllLeaveHeadForDP(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'LeaveHead/GetAllLeaveHeadForDP', httpOptions);

  }
  getSalaryHeadForDP(): Observable<any[]> {
    let salary_head_type_id = 3;
    return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadForDP?salary_head_type_id=' + salary_head_type_id, httpOptions);
  }

}
