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
export class AttendanceCalendarService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
  createCalendar(attendanceCalendar: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendar/Create', attendanceCalendar, httpOptions);

  }
  updateCalendar(attendanceCalendar: any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AttendanceCalendar/Update', attendanceCalendar, httpOptions);

  }
  deleteCalendar(attendance_calendar_id: number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'AttendanceCalendar/Delete', { attendance_calendar_id},httpOptions);

  }
  getAllCalendar(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AttendanceCalendar/GetAllAttendanceCalendar');

  }
  getCalendarById(holiday_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'AttendanceCalendar/GetAttendanceCalendarById?holiday_id=' + holiday_id, httpOptions);
  }
}
