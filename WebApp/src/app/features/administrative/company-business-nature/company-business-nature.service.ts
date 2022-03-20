import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import CompanyBusinessNature from './company-business-nature.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CompanyBusinessNatureService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllCompanyBusinessNature(): Observable<CompanyBusinessNature[]> {

    return this.http.get<CompanyBusinessNature[]>(this.ipconfig.base_IP + 'CompanyBusinessNature/GetAllCompanyBusinessNature');
  }

  CreateCompanyBusinessNature(company_business_nature: any): Observable<CompanyBusinessNature> {

    return this.http.post<CompanyBusinessNature>(this.ipconfig.base_IP + 'CompanyBusinessNature/Create', company_business_nature, httpOptions);

  }
  UpdateCompanyBusinessNature(company_business_nature:any): Observable<CompanyBusinessNature> {

    return this.http.post<CompanyBusinessNature>(this.ipconfig.base_IP + 'CompanyBusinessNature/Update', company_business_nature, httpOptions);

  }
  DeleteCompanyBusinessNature(company_business_nature_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'CompanyBusinessNature/Delete?company_business_nature_id=' + company_business_nature_id, httpOptions);

  }

  GetCompanyBusinessNatureById(company_business_nature_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'CompanyBusinessNature/GetById?company_business_nature_id=' + company_business_nature_id, httpOptions);
  }

  getAllCompanyBusinessNatureEnum(): Observable<CompanyBusinessNature[]> {
    return this.http.get<CompanyBusinessNature[]>(this.ipconfig.base_IP + 'AdministrativeEnum/CompanyBusinessNatureEnum');

  }

}
