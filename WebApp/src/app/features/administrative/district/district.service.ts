import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import District from './district.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DistrictService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }


  getAllDistrict(): Observable<District[]> {

    return this.http.get<District[]>(this.ipconfig.base_IP + 'District/GetAllDistrict');

  }

  CreateDistrict(division: any): Observable<District> {

    return this.http.post<District>(this.ipconfig.base_IP + 'District/Create', division, httpOptions);

  }
  UpdateDistrict(division: any): Observable<District> {

    return this.http.post<District>(this.ipconfig.base_IP + 'District/Update', division, httpOptions);

  } 

  GetById(division_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'District/GetById?division_id=' + division_id, httpOptions);

  }

  getAllDivisionCbo(): Observable<District[]> {
    return this.http.get<District[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }
}
