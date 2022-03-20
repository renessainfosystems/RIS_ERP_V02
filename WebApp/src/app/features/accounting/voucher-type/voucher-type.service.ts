import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import VoucherType from './voucher-type.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class VoucherTypeService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllVoucherType(): Observable<VoucherType[]> {

    return this.http.get<VoucherType[]>(this.ipconfig.base_IP + 'VoucherType/GetAllVoucherType');    
  }
  
  CreateVoucherType(voucher_type:any): Observable<VoucherType> {

    return this.http.post<VoucherType>(this.ipconfig.base_IP + 'VoucherType/Create', voucher_type,httpOptions);

  }
  UpdateVoucherType(voucher_type:any): Observable<VoucherType> {

    return this.http.post<VoucherType>(this.ipconfig.base_IP + 'VoucherType/Update', voucher_type, httpOptions);

  }
  DeleteVoucherType(voucher_type_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'VoucherType/Delete?voucher_type_id=' + voucher_type_id, httpOptions);

  }

  GetVoucherTypeById(voucher_type_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'VoucherType/GetById?voucher_type_id=' + voucher_type_id, httpOptions);
  }

}
