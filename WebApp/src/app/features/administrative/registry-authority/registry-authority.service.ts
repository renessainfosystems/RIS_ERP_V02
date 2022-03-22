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

export class RegistryAuthorityService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllRegistryAuthority(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RegistryAuthority/GetAllByRawSql');

    }

    CreateRegistryAuthority(registry_authority: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RegistryAuthority/Create', registry_authority, httpOptions);

    }

    UpdateRegistryAuthority(registry_authority: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RegistryAuthority/Update', registry_authority, httpOptions);
    }

    DeleteRegistryAuthority(registry_authority_id: Number): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RegistryAuthority/Delete?registry_authority_id=' + registry_authority_id, httpOptions);
    }

    GetRegistryAuthorityById(registry_authority_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'RegistryAuthority/GetById?registry_authority_id=' + registry_authority_id, httpOptions);

    }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }

}
