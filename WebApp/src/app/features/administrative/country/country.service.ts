import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import ContinentModel from './ContinentModel';
import Country from './country.model';
import District from './district.model';
import Division from './division.model';
import Thana from './thana.model';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  //start country api
  getAllCountry(): Observable<Country[]> {

    return this.http.get<Country[]>(this.ipconfig.base_IP + 'Country/GetAllCountry');

  }

  CreateCountry(country: any): Observable<Country> {

    return this.http.post<Country>(this.ipconfig.base_IP + 'Country/Create', country, httpOptions);

  }
  UpdateCountry(country: any): Observable<Country> {

    return this.http.post<Country>(this.ipconfig.base_IP + 'Country/Update', country, httpOptions);

  } 

  GetByCountryId(country_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Country/GetById?country_id=' + country_id, httpOptions);

  }

  DeleteCountry(country_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Country/Delete?country_id=' + country_id, httpOptions);

  }

  getAllContinentEnum(): Observable<ContinentModel[]> {
    return this.http.get<ContinentModel[]>(this.ipconfig.base_IP + 'AdministrativeEnum/ContinentEnum');

  }

  //end country api

  //start division api

  getAllDivision(): Observable<Division[]> {

    return this.http.get<Division[]>(this.ipconfig.base_IP + 'Division/GetAllDivision');

  }

  CreateDivision(division: any): Observable<Division> {

    return this.http.post<Division>(this.ipconfig.base_IP + 'Division/Create', division, httpOptions);

  }
  UpdateDivision(division: any): Observable<Division> {

    return this.http.post<Division>(this.ipconfig.base_IP + 'Division/Update', division, httpOptions);

  }

  GetByDivisionId(division_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Division/GetById?division_id=' + division_id, httpOptions);

  }

  DeleteDivision(division_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Division/Delete?division_id=' + division_id, httpOptions);

  }

  getAllCountryCbo(): Observable<Division[]> {
    return this.http.get<Division[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }
  //end division api

  //end district api
  getAllDistrict(): Observable<District[]> {

    return this.http.get<District[]>(this.ipconfig.base_IP + 'District/GetAllDistrict');

  }

  CreateDistrict(district: any): Observable<District> {

    return this.http.post<District>(this.ipconfig.base_IP + 'District/Create', district, httpOptions);

  }
  UpdateDistrict(district: any): Observable<District> {

    return this.http.post<District>(this.ipconfig.base_IP + 'District/Update', district, httpOptions);

  }

  GetByDistrictId(district_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'District/GetById?district_id=' + district_id, httpOptions);

  }

  DeleteDistrict(district_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'District/Delete?district_id=' + district_id, httpOptions);

  }

  getAllDivisionCbo(): Observable<District[]> {
    return this.http.get<District[]>(this.ipconfig.base_IP + 'Division/DivisionCboList');
  }
  //end district api


  //end thana api
  getAllThana(): Observable<Thana[]> {

    return this.http.get<Thana[]>(this.ipconfig.base_IP + 'Thana/GetAllThana');

  }

  CreateThana(thana: any): Observable<Thana> {

    return this.http.post<Thana>(this.ipconfig.base_IP + 'Thana/Create', thana, httpOptions);

  }
  UpdateThana(thana: any): Observable<Thana> {

    return this.http.post<Thana>(this.ipconfig.base_IP + 'Thana/Update', thana, httpOptions);

  }

  GetByThanaId(thana_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Thana/GetById?thana_id=' + thana_id, httpOptions);

  }

  DeleteThana(thana_id): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'Thana/Delete?thana_id=' + thana_id, httpOptions);

  }

  getAllDistrictCbo(): Observable<Thana[]> {
    return this.http.get<Thana[]>(this.ipconfig.base_IP + 'District/DistrictCboList');
  }
  //end thana api
}
