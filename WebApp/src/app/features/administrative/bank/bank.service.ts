import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Bank from './bank.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class BankService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }


  getAllBank(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'Bank/GetAllBanks', httpOptions);
  }

  CreateBank(bank: any): Observable<Bank> {
    console.log(bank)
    return this.http.post<Bank>(this.ipconfig.base_IP + 'Bank/Create', bank,httpOptions);
  }

  UpdateBank(bank: any): Observable<Bank> {
 
    return this.http.post<Bank>(this.ipconfig.base_IP + 'Bank/Update',bank,httpOptions);
  }
  

  DeleteBank(bank_id: Number): Observable<any> {
    return this.http.post<any>(this.ipconfig.base_IP + 'Bank/Delete', { bank_id }, httpOptions);

  }

  //DeleteUser(user_info_id: Number): Observable<any> {

  //  return this.http.post<any>(this.ipconfig.base_IP + 'User/Delete', { user_info_id }, httpOptions);

  //}



  GetBankById(bank_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Bank/GetBankById?bank_id=' + bank_id, httpOptions);
  }

  getAllCountryCboList(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

  getAllDivisionCboList(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }

  getAllDistrictCboList(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }

  getAllDivisionCboListByCountryId(country_id): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }
  getAllDistrictCboListByDivisionId(division_id): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }
}
