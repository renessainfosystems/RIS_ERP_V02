import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import VatCommissionerate from './vat-commissionerate.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class VatCommissionerateService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllVatCommissionerate(): Observable<VatCommissionerate[]> {

    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'VatCommissionerate/GetAllVatCommissionerate');    
  }
  
  CreateVatCommissionerate(user:any): Observable<VatCommissionerate> {

    return this.http.post<VatCommissionerate>(this.ipconfig.base_IP + 'VatCommissionerate/Create',user,httpOptions);

  }
  UpdateVatCommissionerate(user:any): Observable<VatCommissionerate> {
  
    return this.http.post<VatCommissionerate>(this.ipconfig.base_IP + 'VatCommissionerate/Update',user,httpOptions);

  }
  DeleteVatCommissionerate(vat_commissionerate_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'VatCommissionerate/Delete?vat_commissionerate_id=' + vat_commissionerate_id, httpOptions);
  }

  GetVatCommissionerateById(vat_commissionerate_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'VatCommissionerate/GetById?vat_commissionerate_id=' + vat_commissionerate_id, httpOptions);
  }

  getAllCountryCboList(): Observable<VatCommissionerate[]> {
    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

  getAllDivisionCboList(): Observable<VatCommissionerate[]> {
    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }

  getAllDivisionCboListByCountryId(country_id): Observable<VatCommissionerate[]> {
    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }

  getAllDistrictCboList(): Observable<VatCommissionerate[]> {
    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }
  getAllDistrictCboListByDivisionId(division_id): Observable<VatCommissionerate[]> {
    return this.http.get<VatCommissionerate[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }

}
