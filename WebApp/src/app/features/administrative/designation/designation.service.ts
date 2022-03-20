import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Designation from './designation.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DesignationService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllDesignation(): Observable<Designation[]> {

    return this.http.get<Designation[]>(this.ipconfig.base_IP + 'Designation/GetAllDesignation');    
  }
  
  CreateDesignation(designation:any): Observable<Designation> {

    return this.http.post<Designation>(this.ipconfig.base_IP + 'Designation/Create', designation,httpOptions);

  }
  UpdateDesignation(designation:any): Observable<Designation> {
  
    return this.http.post<Designation>(this.ipconfig.base_IP + 'Designation/Update', designation,httpOptions);

  }
  DeleteDesignation(designation_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Designation/Delete?designation_id=' + designation_id, httpOptions);

  }

  GetDesignationById(designation_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Designation/GetById?designation_id=' + designation_id, httpOptions);
  }

}
