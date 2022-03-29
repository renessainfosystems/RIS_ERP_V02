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
export class LeavePolicyService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    create(leavePolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'LeavePolicy/Create', leavePolicy, httpOptions);

    }
    update(leavePolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'LeavePolicy/Update', leavePolicy, httpOptions);

    }
    approve(leave_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'LeavePolicy/Approve', { leave_policy_id }, httpOptions);

    }
    Copy(leave_policy_id: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'LeavePolicy/Copy', {
            leave_policy_id
        }, httpOptions);

    }
    delete(leave_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'LeavePolicy/Delete', { leave_policy_id }, httpOptions);

    }
    getLeavePolicyById(leave_policy_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LeavePolicy/GetLeavePolicyById?leave_policy_id=' + leave_policy_id, httpOptions);
    }

    getLeavePolicyCode(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LeavePolicy/GetLeavePolicyCode', httpOptions);
    }
    getAllLeavePolicy(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LeavePolicy/GetAllLeavePolicy', httpOptions);
    }
    getLeavePolicyByName(policy_or_leave_name: string): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LeavePolicy/GetLeavePolicyByName?policy_or_leave_name='+policy_or_leave_name, httpOptions);
    }
    getPrimarySalaryHeadForDP(): Observable<any[]> {
        let salary_head_type_id = 1;
        return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadForDP?salary_head_type_id=' + salary_head_type_id, httpOptions);

    }
    getAllLeaveHeadForDP(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'LeaveHead/GetAllLeaveHead', httpOptions);

    }
}
