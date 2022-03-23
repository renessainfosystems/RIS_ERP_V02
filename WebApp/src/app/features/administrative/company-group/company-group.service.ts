import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import CompanyGroup from './company-group.model';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class CompanyGroupService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllCompanyGroup(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'CompanyGroup/GetAllCompanyGroup');
    }

    createCompanyGroup(companyGroup: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'CompanyGroup/Create', companyGroup, httpOptions);

    }
    updateCompanyGroup(companyGroup: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'CompanyGroup/Update', companyGroup, httpOptions);

    }
    deleteCompanyGroup(company_group_id: Number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'CompanyGroup/Delete?company_group_id=' + company_group_id, httpOptions);

    }

    getCompanyGroupById(company_group_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'CompanyGroup/GetById?company_group_id=' + company_group_id, httpOptions);
    }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<CompanyGroup[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }

    getAllDivisionCboListByCountryId(country_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
    }

    getAllDistrictCboListByDivisionId(division_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
    }
    getAllThanaCboListByDistrictId(district_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Thana/ThanaCboListByDistrictId?district_id=' + district_id, httpOptions);
    }
    getAllCurrencyCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Currency/CurrencyCboList');
    }
}
