import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Company from './company.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllCompany(): Observable<Company[]> {

    return this.http.get<Company[]>(this.ipconfig.base_IP + 'Company/GetAllCompany');    
  }
  
  createCompany(company:any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Company/Create', company,httpOptions);

  }
  updateCompany(company:any): Observable<any> {
  
    return this.http.post<any>(this.ipconfig.base_IP + 'Company/Update', company,httpOptions);

  }
  deleteCompany(company_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Company/Delete?company_id=' + company_id, httpOptions);

  }

  getCompanyById(company_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Company/GetById?company_id=' + company_id, httpOptions);
  }

  getAllCountryCboList(): Observable<Company[]> {
    return this.http.get<Company[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

  getAllDivisionCboListByCountryId(country_id): Observable<Company[]> {
    return this.http.get<Company[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }

  getAllDistrictCboListByDivisionId(division_id): Observable<Company[]> {
    return this.http.get<Company[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }

  getAllCurrencyCboList(): Observable<Company[]> {
    return this.http.get<Company[]>(this.ipconfig.base_IP + 'Currency/CurrencyCboList');
  }

  getAllCompanyGroupCboList(): Observable<Company[]> {
    return this.http.get<Company[]>(this.ipconfig.base_IP + 'CompanyGroup/CompanyGroupCboList');
  }
}
