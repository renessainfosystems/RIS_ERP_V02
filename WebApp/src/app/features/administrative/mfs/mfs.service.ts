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

export class MfsService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


  getAllMfs(): Observable<any[]> {
      return this.http.get<any[]>(this.ipconfig.base_IP + 'Mfs/GetAllByRawSql');
    }


  CreateMfs(mfs: any): Observable<any> {
    return this.http.post<any>(this.ipconfig.base_IP + 'Mfs/Create', mfs, httpOptions);
  }

  UpdateMfs(mfs: any): Observable<any> {
    return this.http.post<any>(this.ipconfig.base_IP + 'Mfs/Update', mfs, httpOptions);
  }

  DeleteMfs(mfs_id: Number): Observable<any> {
    return this.http.post(this.ipconfig.base_IP + 'Mfs/Delete?mfs_id=' + mfs_id, httpOptions);
  }


  GetMfsById(mfs_id: Number): Observable<any> {
    return this.http.get(this.ipconfig.base_IP + 'Mfs/GetById?mfs_id=' + mfs_id, httpOptions);
  }

  getAllCountryCboList(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

}
