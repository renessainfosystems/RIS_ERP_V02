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

export class BankBranchService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllBankBranch(): Observable<any[]> {

      return this.http.get<any[]>(this.ipconfig.base_IP + 'BankBranch/GetAllBankBranchs');
  }

    CreateBankBranch(bankBranch: any): Observable<any> {
        return this.http.post<any>(this.ipconfig.base_IP + 'BankBranch/Create', bankBranch,httpOptions);
  }

    UpdateBankBranch(bankBranch: any): Observable<any> {
 
        return this.http.post<any>(this.ipconfig.base_IP + 'BankBranch/Update', bankBranch,httpOptions);
  }


  DeleteBankBranch(bank_branch_id: Number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'BankBranch/Delete', { bank_branch_id }, httpOptions);

  }

  GetBankBranchById(bank_branch_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'BankBranch/GetAllBankBranchByBankBranchId?bank_branch_id=' + bank_branch_id, httpOptions);
  }

  getAllBankCboList(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'Bank/BankCboList', httpOptions);

  }


    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

    getAllDivisionCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }

    getAllDistrictCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }

    getAllDivisionCboListByCountryId(country_id): Observable<any[]> {
      return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/DivisionCboListByCountryId?country_id=' + country_id, httpOptions);
  }
    getAllDistrictCboListByDivisionId(division_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'District/DistrictCboListByDivisionId?division_id=' + division_id, httpOptions);
  }
}
