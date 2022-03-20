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
export class LateEarlyPolicyService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
 

  create(lateEarlyPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/Create', lateEarlyPolicy, httpOptions);

  }
  update(lateEarlyPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/Update', lateEarlyPolicy, httpOptions);

  }
  approve(late_early_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/Approve', { late_early_policy_id }, httpOptions);

  }
  delete(late_early_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/Delete', { late_early_policy_id }, httpOptions);

  }
  getLateEarlyPolicyById(late_early_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'LateEarlyPolicy/GetLateEarlyPolicyById?late_early_policy_id=' + late_early_policy_id, httpOptions);
  }

  getLateEarlyPolicyCode(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'LateEarlyPolicy/GetLateEarlyPolicyCode', httpOptions);
  }


  getLateEarlyPolicyDetailsById(late_early_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'LateEarlyPolicy/GetLateEarlyPolicyDetailsById?late_early_policy_id=' + late_early_policy_id, httpOptions);
  }
  getAllLateEarlyPolicy(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'LateEarlyPolicy/GetAllLateEarlyPolicy', httpOptions);
  }

  getDeductionSalaryHeadForDP(): Observable<any[]> {
    let salary_head_type_id = 3;
    return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadForDP?salary_head_type_id=' + salary_head_type_id, httpOptions);

  }
  getPrimarySalaryHeadForDP(): Observable<any[]> {
    let salary_head_type_id = 1;
    return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadForDP?salary_head_type_id=' + salary_head_type_id, httpOptions);

  }
  addLateEarlyDetailsForUpdate(lateEarlyPolicyDetail: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/AddLateEarlyDetailsForUpdate', lateEarlyPolicyDetail, httpOptions);

  }
  removeLateEarlyDetailsForUpdate(lep_detail_id: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'LateEarlyPolicy/RemoveLateEarlyDetailsForUpdate', { lep_detail_id }, httpOptions);

  }
}
