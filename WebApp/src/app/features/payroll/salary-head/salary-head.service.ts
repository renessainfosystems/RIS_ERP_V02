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
export class SalaryHeadService {


  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  getAllSalaryHead(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'SalaryHead/GetAllSalaryHead', httpOptions);

  }
  create(salaryHead: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'SalaryHead/Create', salaryHead, httpOptions);

  }
  update(salaryHead: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'SalaryHead/Update', salaryHead, httpOptions);

  }
  delete(salary_head_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'SalaryHead/Delete', { salary_head_id }, httpOptions);

  }

  getSalaryHeadById(salary_head_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'SalaryHead/GetSalaryHeadById?salary_head_id=' + salary_head_id, httpOptions);
  }
  getSalaryHeadTypeForDP(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'PayrollDBEnum/GetSalaryHeadTypeForDP', httpOptions);

  }
}
