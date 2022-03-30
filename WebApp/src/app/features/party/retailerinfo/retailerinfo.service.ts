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
export class RetailerInfoService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    createRetailerInfo(retailerInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerInfo/Create', retailerInfo, httpOptionsForFileUpload);

    }
    updateRetailerInfo(retailerInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerInfo/Update', retailerInfo, httpOptionsForFileUpload);

    }
    deleteRetailerInfo(retailer_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'RetailerInfo/Delete?retailer_info_id=' + retailer_info_id, httpOptions);

    }
    getAllRetailerInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerInfo/GetAllRetailerInfo', httpOptions);

    }
    getRetailerInfoById(retailer_info_id: number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'RetailerInfo/GetRetailerInfoById?retailer_info_id=' + retailer_info_id, httpOptions);
    }

    getAllContinent(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/ContinentEnum');

    }

    getAllZone(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Zone/ZoneCboList');
    }

    getAllCountry(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
    }

    getAllDivision(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Division/GetAllDivision');
    }
    getAllDistrict(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'District/GetAllDistrict');
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
    getAllDomicile(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/DomicileEnum');
    }
    getAllSecurityType(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/SecurityTypeEnum');
    }
    getAllPreferredMethod(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/PreferredMethodEnum');
    }
    getAllCurrencyCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Currency/CurrencyCboList');
    }

    getAllRegistryAuthorityCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'RegistryAuthority/RegistryAuthorityCboList', httpOptions);
    }

    getAllRegulatorCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Regulator/RegulatorCboList', httpOptions);
    }

    getAllOwnershipTypeCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'OwnershipType/OwnershipTypeCboList', httpOptions);
    }

    getAllBusinessActivitiesEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/BusinessActivitiesEnum');
    }

    getAllOrganaizationEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/OrganizationTypeEnum');
    }

    getAllIndustrySectorCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'IndustrySector/IndustrySectorCboList', httpOptions);
    }

    getAllIndustrySubSectorCboList(sector_id): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'IndustrySubSector/IndustrySubSectorCboListBySectorId?sector_id=' + sector_id, httpOptions);
    }

    getRetailerInfoCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerInfo/GetRetailerInfoCboList');
    }

    getReligionEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/ReligionEnum');
    }

    getGenderEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/GenderEnum');
    }

    getBloodGroupEnum(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'PartyEnum/BloodGroupEnum');
    }

    // Start Retailer Contact Info  ------***------
    createRetailerContactInfo(retailerContactInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerContactInfo/Create', retailerContactInfo, httpOptionsForFileUpload);

    }
    updateRetailerContactInfo(retailerContactInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerContactInfo/Update', retailerContactInfo, httpOptionsForFileUpload);

    }
    deleteRetailerContactInfo(retailer_contact_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'RetailerContactInfo/Delete?retailer_contact_info_id=' + retailer_contact_info_id, httpOptions);

    }
    getAllRetailerContactInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerContactInfo/GetAllRetailerContactInfo', httpOptions);

    }
    getAllContactInfoByRetailerId(retailer_info_id: Number): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerContactInfo/GetContactInfoByRetailerId?retailer_info_id=' + retailer_info_id, httpOptions);

    }
    getRetailerContactInfoById(retailer_contact_info_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'RetailerContactInfo/GetRetailerContactInfoById?retailer_contact_info_id=' + retailer_contact_info_id, httpOptions);
    }
    // End Retailer Contact Info ------***------

    // Start Retailer Location Info  ------***------
    createRetailerLocationInfo(retailerLocationInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerLocationInfo/Create', retailerLocationInfo, httpOptionsForFileUpload);

    }
    updateRetailerLocationInfo(retailerLocationInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'RetailerLocationInfo/Update', retailerLocationInfo, httpOptionsForFileUpload);

    }
    deleteRetailerLocationInfo(retailer_location_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'RetailerLocationInfo/Delete?retailer_location_info_id=' + retailer_location_info_id, httpOptions);

    }
    getAllLocationInfoByRetailerId(retailer_info_id: Number): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerLocationInfo/GetLocationInfoByRetailerId?retailer_info_id=' + retailer_info_id, httpOptions);

    }
    getAllRetailerLocationInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'RetailerLocationInfo/GetAllRetailerLocationInfo', httpOptions);

    }
    getRetailerLocationInfoById(retailer_location_info_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'RetailerLocationInfo/GetRetailerLocationInfoById?retailer_location_info_id=' + retailer_location_info_id, httpOptions);
    }

    getDealerInfoCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetDealerInfoCboList');
    }
}
