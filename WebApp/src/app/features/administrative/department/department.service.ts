import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Department from './department.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllDepartment(): Observable<Department[]> {

    return this.http.get<Department[]>(this.ipconfig.base_IP + 'Department/GetAllDepartment');    
  }
  
  CreateDepartment(department:any): Observable<Department> {

    return this.http.post<Department>(this.ipconfig.base_IP + 'Department/Create', department,httpOptions);

  }
  UpdateDepartment(department:any): Observable<Department> {
  
    return this.http.post<Department>(this.ipconfig.base_IP + 'Department/Update', department,httpOptions);

  }
  DeleteDepartment(department_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Department/Delete?department_id=' + department_id, httpOptions);

  }

  GetDepartmentById(department_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Department/GetById?department_id=' + department_id, httpOptions);
  }
  getAllDepartmentTypeEnum(): Observable<Department[]> {
      return this.http.get<Department[]>(this.ipconfig.base_IP + 'AdministrativeDBEnum/DepartmentTypeCboList');

  }
}
