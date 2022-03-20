import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import IndustrySector from './industry-sector.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class IndustrySectorService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllIndustrySector(): Observable<IndustrySector[]> {

    return this.http.get<IndustrySector[]>(this.ipconfig.base_IP + 'IndustrySector/GetAllIndustrySector');    
  }
  
  CreateIndustrySector(industry_sector:any): Observable<IndustrySector> {

    return this.http.post<IndustrySector>(this.ipconfig.base_IP + 'IndustrySector/Create', industry_sector,httpOptions);

  }
  UpdateIndustrySector(industry_sector:any): Observable<IndustrySector> {

    return this.http.post<IndustrySector>(this.ipconfig.base_IP + 'IndustrySector/Update', industry_sector, httpOptions);

  }
  DeleteIndustrySector(industry_sector_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'IndustrySector/Delete?industry_sector_id=' + industry_sector_id, httpOptions);

  }

  GetIndustrySectorById(industry_sector_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'IndustrySector/GetById?industry_sector_id=' + industry_sector_id, httpOptions);
  }

}
