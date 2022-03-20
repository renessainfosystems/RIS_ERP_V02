import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Division from './division.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DivisionService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


  getAllDivision(): Observable<Division[]> {

    return this.http.get<Division[]>(this.ipconfig.base_IP + 'Division/GetAllDivision');

  }

  CreateDivision(division: any): Observable<Division> {

    return this.http.post<Division>(this.ipconfig.base_IP + 'Division/Create', division, httpOptions);

  }
  UpdateDivision(division: any): Observable<Division> {

    return this.http.post<Division>(this.ipconfig.base_IP + 'Division/Update', division, httpOptions);

  } 

  GetById(division_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Division/GetById?division_id=' + division_id, httpOptions);

  }

  getAllCountryCbo(): Observable<Division[]> {
    return this.http.get<Division[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }
}
