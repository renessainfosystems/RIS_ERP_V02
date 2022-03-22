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
export class RosterPolicyService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    create(rosterPolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/Create', rosterPolicy, httpOptions);

    }
    update(rosterPolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/Update', rosterPolicy, httpOptions);

    }
    approve(roster_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/Approve', { roster_policy_id }, httpOptions);

    }
    delete(roster_policy_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/Delete', { roster_policy_id }, httpOptions);

    }
    createRosterDetails(rosterPolicy: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/CreateRosterDetails', rosterPolicy, httpOptions);

    }
    deleteRosterDetails(roster_policy_detail_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RosterPolicy/DeleteRosterDetails', { roster_policy_detail_id }, httpOptions);

    }
    getAllRosterPolicy(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'RosterPolicy/GetAllRosterPolicy', httpOptions);
    }
    getRosterPolicyById(roster_policy_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'RosterPolicy/GetRosterPolicyById?roster_policy_id=' + roster_policy_id, httpOptions);
    }
    getRosterDetailsById(roster_policy_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'RosterPolicy/GetRosterDetailsById?roster_policy_id=' + roster_policy_id, httpOptions);
    }
    getShiftForDP(): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'ShiftInformation/GetShiftForDP', httpOptions);
    }
}
