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
export class DealerInfoService {

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    createDealerInfo(dealerInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerInfo/Create', dealerInfo, httpOptionsForFileUpload);

    }
    updateDealerInfo(dealerInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerInfo/Update', dealerInfo, httpOptionsForFileUpload);

    }
    deleteDealerInfo(dealer_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'DealerInfo/Delete?dealer_info_id=' + dealer_info_id, httpOptions);

    }
    getAllDealerInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetAllDealerInfo', httpOptions);

    }
    getDealerInfoById(dealer_info_id: number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerInfo/GetDealerInfoById?dealer_info_id=' + dealer_info_id, httpOptions);
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

    getDealerInfoCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerInfo/GetDealerInfoCboList');
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

    // Start Dealer Contact Info  ------***------
    createDealerContactInfo(dealerContactInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerContactInfo/Create', dealerContactInfo, httpOptionsForFileUpload);

    }
    updateDealerContactInfo(dealerContactInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerContactInfo/Update', dealerContactInfo, httpOptionsForFileUpload);

    }
    deleteDealerContactInfo(dealer_contact_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'DealerContactInfo/Delete?dealer_contact_info_id=' + dealer_contact_info_id, httpOptions);

    }
    getAllDealerContactInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerContactInfo/GetAllDealerContactInfo', httpOptions);

    }
    getAllContactInfoByDealerId(dealer_info_id: Number): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerContactInfo/GetContactInfoByDealerId?dealer_info_id=' + dealer_info_id, httpOptions);

    }
    getDealerContactInfoById(dealer_contact_info_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerContactInfo/GetDealerContactInfoById?dealer_contact_info_id=' + dealer_contact_info_id, httpOptions);
    }
    // End Dealer Contact Info ------***------

    // Start Dealer Location Info  ------***------
    createDealerLocationInfo(dealerLocationInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerLocationInfo/Create', dealerLocationInfo, httpOptionsForFileUpload);

    }
    updateDealerLocationInfo(dealerLocationInfo: FormData): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DealerLocationInfo/Update', dealerLocationInfo, httpOptionsForFileUpload);

    }
    deleteDealerLocationInfo(dealer_location_info_id: number): Observable<any> {

        return this.http.post(this.ipconfig.base_IP + 'DealerLocationInfo/Delete?dealer_contact_info_id=' + dealer_location_info_id, httpOptions);

    }
    getAllLocationInfoByDealerId(dealer_info_id: Number): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerLocationInfo/GetLocationInfoByDealerId?dealer_info_id=' + dealer_info_id, httpOptions);

    }
    getAllDealerLocationInfo(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'DealerLocationInfo/GetAllDealerLocationInfo', httpOptions);

    }
    getDealerLocationInfoById(dealer_location_info_id: Number): Observable<any> {
        return this.http.get(this.ipconfig.base_IP + 'DealerLocationInfo/GetDealerLocationInfoById?dealer_location_info_id=' + dealer_location_info_id, httpOptions);
    }
}
