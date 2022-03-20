import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Competency from './competency.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CompetencyService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllCompetency(): Observable<Competency[]> {

    return this.http.get<Competency[]>(this.ipconfig.base_IP + 'Competency/GetAllCompetency');    
  }
  
  CreateCompetency(user:any): Observable<Competency> {

    return this.http.post<Competency>(this.ipconfig.base_IP + 'Competency/Create',user,httpOptions);

  }
  UpdateCompetency(user:any): Observable<Competency> {
  
    return this.http.post<Competency>(this.ipconfig.base_IP + 'Competency/Update',user,httpOptions);

  }
  DeleteCompetency(competency_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Competency/Delete?competency_id=' + competency_id, httpOptions);

  }

  GetCompetencyById(competency_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Competency/GetById?competency_id=' + competency_id, httpOptions);
  }   

}
