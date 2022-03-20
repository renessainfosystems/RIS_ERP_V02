import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import OwnershipType from './ownership-type.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OwnershipTypeService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllOwnershipType(): Observable<OwnershipType[]> {

    return this.http.get<OwnershipType[]>(this.ipconfig.base_IP + 'OwnershipType/GetAllOwnershipType');    
  }
  
  CreateOwnershipType(ownership_type:any): Observable<OwnershipType> {

    return this.http.post<OwnershipType>(this.ipconfig.base_IP + 'OwnershipType/Create', ownership_type,httpOptions);

  }
  UpdateOwnershipType(ownership_type:any): Observable<OwnershipType> {

    return this.http.post<OwnershipType>(this.ipconfig.base_IP + 'OwnershipType/Update', ownership_type, httpOptions);

  }
  DeleteOwnershipType(ownership_type_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'OwnershipType/Delete?ownership_type_id=' + ownership_type_id, httpOptions);

  }

  GetOwnershipTypeById(ownership_type_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OwnershipType/GetById?ownership_type_id=' + ownership_type_id, httpOptions);
  }
   
}
