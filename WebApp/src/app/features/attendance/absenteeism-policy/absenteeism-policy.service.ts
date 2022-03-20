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
export class AbsenteeismPolicyService {


  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  getAllAbsenteeismPolicy(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AbsenteeismPolicy/GetAllAbsenteeismPolicy', httpOptions);

  }

  create(absenteeismPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AbsenteeismPolicy/Create', absenteeismPolicy, httpOptions);

  }
  update(absenteeismPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AbsenteeismPolicy/Update', absenteeismPolicy, httpOptions);

  }
  approve(absenteeism_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AbsenteeismPolicy/Approve', { absenteeism_policy_id }, httpOptions);

  }
  delete(absenteeism_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AbsenteeismPolicy/Delete', { absenteeism_policy_id }, httpOptions);

  }
  getPolicyById(absenteeism_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AbsenteeismPolicy/GetAbsenteeismPolicyById?absenteeism_policy_id=' + absenteeism_policy_id, httpOptions);
  }
  getPolicyCode(): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AbsenteeismPolicy/GetAbsenteeismPolicyCode', httpOptions);
  }

  getSalaryHeadForDP(): Observable<any[]> {
    let salary_head_type_id = 3;
    return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadForDP?salary_head_type_id=' + salary_head_type_id, httpOptions);
  }
}
