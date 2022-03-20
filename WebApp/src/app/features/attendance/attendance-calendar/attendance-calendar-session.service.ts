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
export class AttendanceCalendarSessionService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  getAllActiveCalendar(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AttendanceCalendar/GetAllActiveAttendanceCalendar',httpOptions);

  }
  getAllHoliday(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'Holiday/GetAllHoliday',httpOptions);

  }
  CreateAttendanceCalendarSession(attendanceCalendarSession: any): Observable<any> {
 
    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/Create', attendanceCalendarSession, httpOptions);

  }
  updateAttendanceCalendarSession(attendanceCalendarSession: any): Observable<any> {

    return this.http.put<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/Update', attendanceCalendarSession, httpOptions);

  }
  addHolidayForSessionUpdate(acs_id: any, holiday_id: any,session_start_date:any, session_end_date:any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/AddHolidayForSessionUpdate', { acs_id, holiday_id,session_start_date, session_end_date }, httpOptions);

  }
  removeHolidayForSessionUpdate(acs_id: any, holiday_id: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/RemoveHolidayForSessionUpdate', { acs_id, holiday_id }, httpOptions);

  }
  getAllCalendarSessions(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AttendanceCalendarSession/GetAllCalendarSessions', httpOptions);

  }

  DeleteCalendarHoliday(menu_id, menu_event_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/DeleteMenuEvent', { menu_id, menu_event_id }, httpOptions);

  }
  DeleteCalendarSession(acs_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/Delete', {
      acs_id
    }, httpOptions);

  }
  CopyCalendarSession(acs_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendarSession/CopyCalendarSession', {
      acs_id
    }, httpOptions);

  }
  getCalendarHolidaySessionById(acs_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AttendanceCalendarSession/GetCalendarHolidaySessionById?acs_id=' + acs_id, httpOptions);
  }
}
