import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import VatCircle from './vat-circle.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class VatCircleService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllVatCircle(): Observable<VatCircle[]> {

    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'VatCircle/GetAllVatCircle');    
  }
  
  CreateVatCircle(vatCircle:any): Observable<VatCircle> {

    return this.http.post<VatCircle>(this.ipconfig.base_IP + 'VatCircle/Create', vatCircle,httpOptions);

  }
  UpdateVatCircle(vatCircle:any): Observable<VatCircle> {
  
    return this.http.post<VatCircle>(this.ipconfig.base_IP + 'VatCircle/Update', vatCircle,httpOptions);

  }
  

  DeleteVatCircle(vat_circle_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'VatCircle/Delete?vat_circle_id=' + vat_circle_id, httpOptions);

  }

  GetVatCircleById(vat_circle_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'VatCircle/GetById?vat_circle_id=' + vat_circle_id, httpOptions);
  }

  getAllVatDivisionCboList(): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'VatDivision/VatDivisionCboList');
  }

  getAllCountryCboList(): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

  getAllDivisionCboList(): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }

  getAllDistrictCboList(): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }

  getAllDivisionCboListByCountryId(country_id): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }
  getAllDistrictCboListByDivisionId(division_id): Observable<VatCircle[]> {
    return this.http.get<VatCircle[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }
}
