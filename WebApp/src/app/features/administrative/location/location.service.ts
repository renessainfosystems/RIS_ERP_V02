import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import Location from './location.model';
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

export class LocationService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
    getAllLocation(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'Location/GetAllLocation');
  }
  
    createLocation(location: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'Location/Create', location, httpOptionsForFileUpload);

  }
    updateLocation(location: FormData): Observable<any> {
  
        return this.http.post<any>(this.ipconfig.base_IP + 'Location/Update', location, httpOptionsForFileUpload);

  }
  deleteLocation(location_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'Location/Delete?location_id=' + location_id, httpOptions);

  }

  getLocationById(location_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'Location/GetById?location_id=' + location_id, httpOptions);
  }

    getAllCountryCboList(): Observable<any[]> {
    return this.http.get<Location[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
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
    getVatApplicableEnumCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'AdministrativeEnum/VatApplicableEnum');
  }

  
}
