import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Zone from './zone.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ZoneService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllZone(): Observable<Zone[]> {

    return this.http.get<Zone[]>(this.ipconfig.base_IP + 'Zone/GetAllZone');    
  }
  
  createZone(user:any): Observable<Zone> {

    return this.http.post<Zone>(this.ipconfig.base_IP + 'Zone/Create',user,httpOptions);

  }
  updateZone(user:any): Observable<Zone> {
  
    return this.http.post<Zone>(this.ipconfig.base_IP + 'Zone/Update',user,httpOptions);

  }
  deleteZone(zone_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Zone/Delete?zone_id=' + zone_id, httpOptions);
  }

  getZoneById(zone_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Zone/GetById?zone_id=' + zone_id, httpOptions);
  }

  getAllCountryCboList(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }
  
}
