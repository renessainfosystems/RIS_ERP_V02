import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import IndustrySubSector from './industry-sub-sector.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class IndustrySubSectorService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllIndustrySubSector(): Observable<IndustrySubSector[]> {

    return this.http.get<IndustrySubSector[]>(this.ipconfig.base_IP + 'IndustrySubSector/GetAllIndustrySubSector');    
  }
  
  CreateIndustrySubSector(industry_sub_sector:any): Observable<IndustrySubSector> {

    return this.http.post<IndustrySubSector>(this.ipconfig.base_IP + 'IndustrySubSector/Create', industry_sub_sector,httpOptions);

  }
  UpdateIndustrySubSector(industry_sub_sector:any): Observable<IndustrySubSector> {

    return this.http.post<IndustrySubSector>(this.ipconfig.base_IP + 'IndustrySubSector/Update', industry_sub_sector, httpOptions);

  }
  DeleteIndustrySubSector(industry_sub_sector_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'IndustrySubSector/Delete?industry_sub_sector_id=' + industry_sub_sector_id, httpOptions);

  }

  GetIndustrySubSectorById(industry_sub_sector_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'IndustrySubSector/GetById?industry_sub_sector_id=' + industry_sub_sector_id, httpOptions);
  }

  getAllIndustrySectorCboList(): Observable<IndustrySubSector[]> {
    return this.http.get<IndustrySubSector[]>(this.ipconfig.base_IP + 'IndustrySector/IndustrySectorCboList');

  }

}
