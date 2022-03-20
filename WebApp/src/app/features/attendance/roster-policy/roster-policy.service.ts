import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})
export class RosterPolicyService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }
}
