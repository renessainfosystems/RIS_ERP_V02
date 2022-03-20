import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
//import employeeType from './employeetype.model';
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const httpOptionsForFileUpload = {
  headers: headers
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  createEmployee(employee: FormData): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Employee/Create', employee, httpOptionsForFileUpload);

  }
  updateEmployee(employee: FormData): Observable<any> {
    
    return this.http.post<any>(this.ipconfig.base_IP + 'Employee/Update', employee, httpOptionsForFileUpload);

  }
  deleteEmployee(employeeId: number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Employee/Delete?employeeId=' + employeeId, httpOptions);

  }
  getAllEmployee(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'Employee/GetAllEmployee',httpOptions);

  }
  getEmployeeById(employeeId: Number): Observable<any> {
    return this.http.get(this.ipconfig.base_IP + 'Employee/GetEmployeeById?employeeId=' + employeeId, httpOptions);
  }

  getEmployeeTittle(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeTittleEnum', httpOptions);
  }
  getEmployeeGender(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeGenderEnum', httpOptions);
  }
  getEmployeeReligion(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeReligionEnum', httpOptions);
  }
  getEmployeeBloodGroup(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/EmployeeBloodGroupEnum', httpOptions);
  }
  getResidencialStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/ResidencialStatusEnum', httpOptions);
  }
  getMaritalStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumEmployee/MaritalStatusEnum', httpOptions);
  }

  getAllCountry(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }
  employeeActivity(employee_id: Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Employee/EmployeeActivity?employee_id=' + employee_id, httpOptions);
  }
  getAllDivision(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/GetAllDivision');
  }
  getAllDistrict(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'District/GetAllDistrict');
  }
  getAllDivisionCboListByCountryId(country_id): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }

  getAllDistrictCboListByDivisionId(division_id): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }
}
