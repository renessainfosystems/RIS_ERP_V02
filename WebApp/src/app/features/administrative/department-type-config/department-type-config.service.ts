import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import DepartmentTypeConfig from './department-type-config.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DepartmentTypeConfigService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllDepartmentTypeConfig(): Observable<DepartmentTypeConfig[]> {

    return this.http.get<DepartmentTypeConfig[]>(this.ipconfig.base_IP + 'DepartmentTypeConfig/GetAllDepartmentTypeConfig');    
  }
  
  CreateDepartmentTypeConfig(user:any): Observable<DepartmentTypeConfig> {

    return this.http.post<DepartmentTypeConfig>(this.ipconfig.base_IP + 'DepartmentTypeConfig/Create',user,httpOptions);

  }
  UpdateDepartmentTypeConfig(user:any): Observable<DepartmentTypeConfig> {
  
    return this.http.post<DepartmentTypeConfig>(this.ipconfig.base_IP + 'DepartmentTypeConfig/Update',user,httpOptions);

  }
  DeleteDepartmentTypeConfig(department_type_config_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'DepartmentTypeConfig/Delete?department_type_config_id=' + department_type_config_id, httpOptions);

  }

  GetDepartmentTypeConfigById(department_type_config_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'DepartmentTypeConfig/GetById?department_type_config_id=' + department_type_config_id, httpOptions);
  }

  getAllDepartmentTypeFunctionalityEnum(): Observable<DepartmentTypeConfig[]> {
    return this.http.get<DepartmentTypeConfig[]>(this.ipconfig.base_IP + 'AdministrativeEnum/DepartmentTypeConfigEnum');
  }
  getAllDepartmentTypeEnum(): Observable<DepartmentTypeConfig[]> {
    return this.http.get<DepartmentTypeConfig[]>(this.ipconfig.base_IP + 'GlobalEnum/DepartmentTypeEnum');
  }
}
