import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
const httpOptionsForFileUpload = {
    headers: headers
};

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})
export class DealerListService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) {

    }

    createDealerVerification(dealerVerification: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerVerification/Create', dealerVerification, httpOptions);

    }
    updateDealerVerification(dealerVerification: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerVerification/Update', dealerVerification, httpOptionsForFileUpload);

    }
    deleteDealerVerification(dealer_verification_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'DealerVerification/Delete?dealer_verification_id=' + dealer_verification_id, httpOptions);

    }
    getAllDealerVerification(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerVerification/GetAllDealerVerification', httpOptions);

    }
    getDealerVerificationById(dealer_verification_id: number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerInfo/GetDealerVerificationById?dealer_verification_id=' + dealer_verification_id, httpOptions);
    }
       
    getAllDealerVerificationList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetAllDealerInfo', httpOptions);
    }

    getDealerVerificationByDealerId(dealer_info_id: number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerInfo/GetDealerVerificationByDealerId?dealer_info_id=' + dealer_info_id, httpOptions);
    }

    getAllDealerInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetAllDealerInfoForVerification', httpOptions);

    }

    getAllDepartmentCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Department/DepartmentCboList', httpOptions);
    }

    getAllEmployeeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Employee/GetEmployeeCboList', httpOptions);
    }
    // End Dealer Document Info ------***------
}
