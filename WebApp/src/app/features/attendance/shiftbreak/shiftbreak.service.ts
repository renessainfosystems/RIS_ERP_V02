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
export class ShiftbreakService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  createShiftBreak(shiftBreak: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftBreak/Create', shiftBreak, httpOptions);

  }
  ShiftBreakActivity(shift_break_head_id: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'ShiftBreak/ShiftBreakActivity?shift_break_head_id=' + shift_break_head_id, httpOptions);

  }
  deleteShiftBreak(shiftBreak_id: number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'ShiftBreak/Delete?shiftBreak_id=' + shiftBreak_id, httpOptions);

  }
  getAllShiftBreak(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'ShiftBreak/GetAllShiftBreak',httpOptions);

  }
  getShiftBreakById(shiftBreak_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'ShiftBreak/GetById?shiftBreak_id=' + shiftBreak_id, httpOptions);
  }
}
