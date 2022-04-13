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
       
    getAllDealerInfoList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetAllDealerInfo', httpOptions);
    }

    getDealerInfoListById(dealer_info_id: number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerInfo/GetDealerInfoById?dealer_info_id=' + dealer_info_id, httpOptions);
    }

    getAllDepartmentCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Department/DepartmentCboList', httpOptions);
    }

    getAllEmployeeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Employee/GetEmployeeCboList', httpOptions);
    }
    // End Dealer Document Info ------***------
}
