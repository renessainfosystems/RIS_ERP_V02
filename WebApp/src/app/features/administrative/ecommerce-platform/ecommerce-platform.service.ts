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

export class EcommercePlatformService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllEcommercePlatform(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'EcommercePlatform/GetAllByRawSql');

    }

    CreateEcommercePlatform(ecommerce_platforms: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'EcommercePlatform/Create', ecommerce_platforms, httpOptions);

    }

    UpdateEcommercePlatform(ecommerce_platforms: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'EcommercePlatform/Update', ecommerce_platforms, httpOptions);
    }

    DeleteEcommercePlatform(ecommerce_platforms_id: Number): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'EcommercePlatform/Delete?ecommerce_platforms_id=' + ecommerce_platforms_id, httpOptions);
    }

    GetEcommercePlatformById(ecommerce_platforms_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'EcommercePlatform/GetById?ecommerce_platforms_id=' + ecommerce_platforms_id, httpOptions);
    }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }


}
