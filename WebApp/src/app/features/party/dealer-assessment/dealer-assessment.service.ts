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
export class DealerAssessmentService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) {

    }

    getAllDealerVerification(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerVerification/GetAllDealerVerification', httpOptions);
    }
    // End Dealer Document Info ------***------
}
