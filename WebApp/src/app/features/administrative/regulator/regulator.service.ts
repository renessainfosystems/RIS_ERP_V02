import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class RegulatorService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllRegulator(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'Regulator/GetAllByRawSql');

  }

  CreateRegulator(regulator: any): Observable<any> {
      return this.http.post<any>(this.ipconfig.base_IP + 'Regulator/Create', regulator, httpOptions);
  }

    UpdateRegulator(regulator: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'Regulator/Update', regulator, httpOptions);
  }

  DeleteRegulator(regulator_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Regulator/Delete?regulator_id=' + regulator_id, httpOptions);
  }

  GetRegulatorById(regulator_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Regulator/GetById?regulator_id=' + regulator_id, httpOptions);

  }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

}
