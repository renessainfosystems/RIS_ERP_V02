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

export class AssociationService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllAssociation(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'association/GetAllByRawSql');

    }

    CreateAssociation(association: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'association/Create', association, httpOptions);

    }

    UpdateAssociation(association: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'association/Update', association, httpOptions);
    }

    DeleteAssociation(association_id: Number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'association/Delete?association_id=' + association_id, httpOptions);
    }


    GetAssociationById(association_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'association/GetById?association_id=' + association_id, httpOptions);

    }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }

    getAllOrganizationTypeEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'GlobalEnumProcurement/OrganizationTypeEnum');

    }
}
