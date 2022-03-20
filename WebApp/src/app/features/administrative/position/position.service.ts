import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Position from './position.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllPosition(): Observable<Position[]> {

    return this.http.get<Position[]>(this.ipconfig.base_IP + 'Position/GetAllPosition');    
  }
  
  CreatePosition(user:any): Observable<Position> {

    return this.http.post<Position>(this.ipconfig.base_IP + 'Position/Create',user,httpOptions);

  }
  UpdatePosition(user:any): Observable<Position> {
  
    return this.http.post<Position>(this.ipconfig.base_IP + 'Position/Update',user,httpOptions);

  }
  DeletePosition(position_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Position/Delete?position_id=' + position_id, httpOptions);

  }

  GetPositionById(position_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Position/GetById?position_id=' + position_id, httpOptions);
  }

}
