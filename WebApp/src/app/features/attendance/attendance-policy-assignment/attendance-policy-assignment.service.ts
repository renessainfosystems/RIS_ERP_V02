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
export class AttendancePolicyAssignmentService {


    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    create(leavePolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/Create', leavePolicy, httpOptions);

    }
    update(leavePolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/Update', leavePolicy, httpOptions);

    }
    approve(attendance_policy_organogram_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/Approve', { attendance_policy_organogram_id }, httpOptions);

    }
   
    delete(attendance_policy_organogram_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/Delete', { attendance_policy_organogram_id }, httpOptions);

    }
    getAttendancePolicyOrganogramById(attendance_policy_organogram_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetAttendancePolicyOrganogramById?attendance_policy_organogram_id=' + attendance_policy_organogram_id, httpOptions);
    }

    getLeavePolicyCode(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetLeavePolicyCode', httpOptions);
    }
    getAllAttPolicyAssignment(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetAllAttPolicyAssignment', httpOptions);
    }
    getGroupNameById(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetGroupNameById', httpOptions);
    }

    getCompanyByOrganogram(company_group_id: number): Observable<any[]> {
        return this.http.post<any[]>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetCompanyByOrganogram', { company_group_id }, httpOptions);
    }

    getLocationByOrganogram(company_group_id: number, company_id: number): Observable<any[]> {
        return this.http.post<any[]>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetLocationByOrganogram', { company_group_id, company_id }, httpOptions);
    }
    getDepartmentByOrganogram(company_group_id: number, company_id: number, location_id: number): Observable<any[]> {
        return this.http.post<any[]>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetDepartmentByOrganogram', { company_group_id, company_id, location_id }, httpOptions);
    }
    getPositionByOrganogram(company_group_id: number, company_id: number, location_id: number, department_id:number): Observable<any[]> {
        return this.http.post<any[]>(this.ipconfig.base_IP + 'AttendancePolicyAssignment/GetPositionByOrganogram', { company_group_id, company_id, location_id, department_id }, httpOptions);
    }
}
