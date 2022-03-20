import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Currency from './currency.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllCurrency(): Observable<Currency[]> {

    return this.http.get<Currency[]>(this.ipconfig.base_IP + 'Currency/GetAllCurrency');    
  }
  
  CreateCurrency(currency:any): Observable<Currency> {

    return this.http.post<Currency>(this.ipconfig.base_IP + 'Currency/Create', currency,httpOptions);

  }

  UpdateCurrency(currency:any): Observable<Currency> {

    return this.http.post<Currency>(this.ipconfig.base_IP + 'Currency/Update', currency, httpOptions);

  }

  DeleteCurrency(currency_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Currency/Delete?currency_id=' + currency_id, httpOptions);

  }

  GetCurrencyById(currency_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Currency/GetById?currency_id=' + currency_id, httpOptions);
  }

  getAllCountryCboList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.ipconfig.base_IP + 'Country/CountryCboList');

  }

}
