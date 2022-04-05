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
export class AttendancePolicyService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    create(rosterPolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/Create', rosterPolicy, httpOptions);

    }
    update(rosterPolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/Update', rosterPolicy, httpOptions);

    }
    approve(attendance_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/Approve', { attendance_policy_id }, httpOptions);

    }
    delete(attendance_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/Delete', { attendance_policy_id }, httpOptions);

    }
    copy(attendance_policy_id: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/Copy', {
            attendance_policy_id
        }, httpOptions);

    }
    createPolicyBenefit(attendancePolicyBenefit: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/CreatePolicyBenefit', attendancePolicyBenefit, httpOptions);

    }
    deletePolicyBenefit(attendance_policy_benefit_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/DeletePolicyBenefit', { attendance_policy_benefit_id }, httpOptions);

    }
    createPolicyDayOff(attendancePolicyDayoff: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/CreatePolicyDayOff', attendancePolicyDayoff, httpOptions);

    }
    deletePolicyDayOff(attendance_policy_dayoff_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/DeletePolicyDayOff', { attendance_policy_dayoff_id }, httpOptions);

    }
    createPolicyLeave(attendancePolicyLeave: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/CreatePolicyLeave', attendancePolicyLeave, httpOptions);

    }
    deletePolicyLeave(attendance_policy_leave_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/DeletePolicyLeave', { attendance_policy_leave_id }, httpOptions);

    }
    createPolicyShift(attendancePolicyShift: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/CreatePolicyShift', attendancePolicyShift, httpOptions);

    }
    deletePolicyShift(attendance_policy_shift_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'AttendancePolicy/DeletePolicyShift', { attendance_policy_shift_id }, httpOptions);

    }
    getAllAttendancePolicy(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicy/GetAllAttendancePolicy', httpOptions);
    }
    getAttendancePolicyById(attendance_policy_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicy/GetAttendancePolicyById?attendance_policy_id=' + attendance_policy_id, httpOptions);
    }
 
    getAttendancePolicyCode(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendancePolicy/GetAttendancePolicyCode', httpOptions);
    }

    getAllCalendarDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendanceCalendar/GetAllActiveAttendanceCalendar', httpOptions);
    }
    getAllAbsenteeismPolicyForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AbsenteeismPolicy/GetAllAbsenteeismPolicyForDP', httpOptions);
    }
    getAllLateEarlyPolicyForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LateEarlyPolicy/GetAllLateEarlyPolicyForDP', httpOptions);
    }
    getAllRosterPolicyForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'RosterPolicy/GetAllRosterPolicyForDP', httpOptions);
    }
    getAllAttBenefitPolicyForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'AttendanceBenefitPolicy/GetAllAttBenefitPolicyForDP', httpOptions);
    }

    getShiftForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'ShiftInformation/GetShiftForDP', httpOptions);
    }
    getAllLeavePolicy(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'LeavePolicy/GetAllLeavePolicy', httpOptions);
    }
    getDayOffTypeForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'DBEnum/GetDayOffTypeForDP', httpOptions);
    }
    getDayOffAlternativeForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'DBEnum/GetDayOffAlternativeForDP', httpOptions);
    }
    getEnumWeekDays(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'GlobalEnumAttendance/EnumWeekDays', httpOptions);
    }
}
