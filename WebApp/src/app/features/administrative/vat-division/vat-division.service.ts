import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import VatDivision from './vat-division.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class VatDivisionService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllVatDivision(): Observable<VatDivision[]> {

    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'VatDivision/GetAllVatDivision');    
  }
  
  CreateVatDivision(user:any): Observable<VatDivision> {

    return this.http.post<VatDivision>(this.ipconfig.base_IP + 'VatDivision/Create',user,httpOptions);

  }
  UpdateVatDivision(user:any): Observable<VatDivision> {
  
    return this.http.post<VatDivision>(this.ipconfig.base_IP + 'VatDivision/Update',user,httpOptions);

  }
  DeleteVatDivision(vat_division_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'VatDivision/Delete?vat_division_id=' + vat_division_id, httpOptions);
  }

  GetVatDivisionById(vat_division_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'VatDivision/GetById?vat_division_id=' + vat_division_id, httpOptions);
  }

  getAllVatComissionerateCboList(): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'VatCommissionerate/VatCommissionerateCboList');
  }

  getAllCountryCboList(): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

  getAllDivisionCboList(): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }

  getAllDistrictCboList(): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }

  getAllDivisionCboListByCountryId(country_id): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }
  getAllDistrictCboListByDivisionId(division_id): Observable<VatDivision[]> {
    return this.http.get<VatDivision[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }
}
