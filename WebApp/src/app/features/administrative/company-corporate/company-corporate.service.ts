import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import CompanyCorporate from './company-corporate.model';
let headers = new HttpHeaders();
const httpOptionsForFileUpload = {
    headers: headers
};
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class CompanyCorporateService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


    getAllCompanyCorporate(): Observable<CompanyCorporate[]> {

        return this.http.get<CompanyCorporate[]>(this.ipconfig.base_IP + 'CompanyCorporate/GetAllCompanyCorporate');
    }

    createCompanyCorporate(companyCorporate: FormData): Observable<CompanyCorporate> {

        return this.http.post<CompanyCorporate>(this.ipconfig.base_IP + 'CompanyCorporate/Create', companyCorporate, httpOptionsForFileUpload);

    }
    updateCompanyCorporate(companyCorporate: FormData): Observable<CompanyCorporate> {

        return this.http.post<CompanyCorporate>(this.ipconfig.base_IP + 'CompanyCorporate/Update', companyCorporate, httpOptionsForFileUpload);

    }
    deleteCompanyCorporate(company_corporate_id: Number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'CompanyCorporate/Delete?company_corporate_id=' + company_corporate_id, httpOptions);

    }

    getCompanyCorporateById(company_corporate_id: Number): Observable<any> {

        return this.http.get(this.ipconfig.base_IP + 'CompanyCorporate/GetById?company_corporate_id=' + company_corporate_id, httpOptions);
    }

    getAllCountryCboList(): Observable<CompanyCorporate[]> {
        return this.http.get<CompanyCorporate[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }

    getAllDivisionCboListByCountryId(country_id): Observable<CompanyCorporate[]> {
        return this.http.get<CompanyCorporate[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
    }

    getAllDistrictCboListByDivisionId(division_id): Observable<CompanyCorporate[]> {
        return this.http.get<CompanyCorporate[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
    }


}
