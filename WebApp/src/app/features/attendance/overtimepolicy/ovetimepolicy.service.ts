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
export class OvetimepolicyService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  getAllOTPolicy(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'OvertimePolicy/GetAllOTPolicy', httpOptions);

  }
  create(oTPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/Create', oTPolicy, httpOptions);

  }
  update(oTPolicy: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/Update', oTPolicy, httpOptions);

  }
  approve(OT_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/Approve', { OT_policy_id }, httpOptions);

  }
  addOTSlabForOTUpdate(oTPolicySlab: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/AddOTSlabForOTUpdate', oTPolicySlab, httpOptions);

  }
  removeOTSlabForOTUpdate(OT_policy_slab_id: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/RemoveOTSlabForOTUpdate', { OT_policy_slab_id }, httpOptions);

  }
 

  delete(OT_policy_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'OvertimePolicy/Delete', { OT_policy_id }, httpOptions);

  }

  getOTPolicySlabById(OT_policy_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'OvertimePolicy/GetOTPolicySlabById?OT_policy_id=' + OT_policy_id, httpOptions);
  }
  otPolicyActivity(OT_policy_id: Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'OvertimePolicy/OTPolicyActivity?OT_policy_id=' + OT_policy_id, httpOptions);
  }
}
