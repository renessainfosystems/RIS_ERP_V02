import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import HolidayType from './holidaytype.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  createHoliday(holiday: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Holiday/Create', holiday, httpOptions);

  }
  updateHoliday(holiday: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Holiday/Update', holiday, httpOptions);

  }
  deleteHoliday(holiday_id: number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Holiday/Delete?holiday_id='+holiday_id, httpOptions);

  }
  getAllHoliday(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'Holiday/GetAllHoliday',httpOptions);

  }
  getHolidayById(holiday_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Holiday/GetById?holiday_id=' + holiday_id, httpOptions);
  }

  getHolidayTypeList(): Observable<HolidayType[]> {
    return this.http.get<HolidayType[]>(this.ipconfig.base_IP + 'GlobalEnumAttendance/HolidayTypeEnum', httpOptions);
  }
  public getmonthlistJSON(): Observable<any> {
    return this.http.get("./assets/monthlist.json");
  }
  public getdayNumberListJSON(): Observable<any> {
    return this.http.get("./assets/dayNumberList.json");
  }
}
