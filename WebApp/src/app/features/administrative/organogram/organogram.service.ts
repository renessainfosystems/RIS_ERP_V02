import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
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
export class OrganogramService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  createOrganogram(Organogram: any): Observable<any> {

      return this.http.post<any>(this.ipconfig.base_IP + 'Organogram/Create', Organogram, httpOptions);

  }
    updateOrganogram(Organogram: any): Observable<any> {
    
        return this.http.post<any>(this.ipconfig.base_IP + 'Organogram/Update', Organogram, httpOptions);

  }
  deleteOrganogram(OrganogramId: number): Observable<any> {

      return this.http.post(this.ipconfig.base_IP + 'Organogram/Delete?OrganogramId=' + OrganogramId, httpOptions);

  }
  getAllOrganogram(): Observable<any[]> {

      return this.http.get<any[]>(this.ipconfig.base_IP + 'Organogram/GetAllOrganogram',httpOptions);

    }
    getAllActiveOrganogram(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Organogram/GetAllActiveOrganogram', httpOptions);
    }
  getOrganogramById(OrganogramId: Number): Observable<any> {
      return this.http.get(this.ipconfig.base_IP + 'Organogram/GetOrganogramById?OrganogramId=' + OrganogramId, httpOptions);
  }

  //getOrganogramTittle(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/OrganogramTittleEnum', httpOptions);
  //}
  //getOrganogramGender(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/OrganogramGenderEnum', httpOptions);
  //}
  //getOrganogramReligion(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/OrganogramReligionEnum', httpOptions);
  //}
  //getOrganogramBloodGroup(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/OrganogramBloodGroupEnum', httpOptions);
  //}
  //getResidencialStatus(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/ResidencialStatusEnum', httpOptions);
  //}
  //getMaritalStatus(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumOrganogram/MaritalStatusEnum', httpOptions);
  //}

  //getAllCountry(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  //}
  OrganogramActivity(Organogram_id: Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Organogram/OrganogramActivity?Organogram_id=' + Organogram_id, httpOptions);
    }

    getAllDepartment(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'Department/GetDepartmentByTypes', httpOptions);
    }
    GetDepartmentByTypeId(Type_id: Number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'Department/GetDepartmentByTypeId?Department_Type_id=' + Type_id, httpOptions);
    }
  //getAllDivision(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/GetAllDivision');
  //}
  //getAllDistrict(): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'District/GetAllDistrict');
  //}
  //getAllDivisionCboListByCountryId(country_id): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  //}

  //getAllDistrictCboListByDivisionId(division_id): Observable<any[]> {
  //  return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  //}
}
