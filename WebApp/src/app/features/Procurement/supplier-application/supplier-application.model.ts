
export default class SupplierApplication {
    CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
        throw new Error('Method not implemented.');
    }
    MessageType(MessageType: any, CurrentMessage: any) {
        throw new Error('Method not implemented.');
    }
    // supplier_id?: Number;

    //Basic
    supplier_code: string;
    legal_name?: string;
    short_name?: string;
    year_established: Date;
    domicile_enum_id: number;
    registryAuthorityObj: number;
    registry_authority_id: number;
    regulatorObj: number;
    regulator_id: number;
    ownershipTypeObj: number;
    ownership_type_id: number;
    name_in_local_language: string;
    address_in_local_language: string;
    /*supplier_logo: string;*/

    countryObj: number;
    country_id: number;
    divisionObj: number;
    division_id: number;
    districtObj: number;
    district_id: number;
    city: string;
    ps_area: string;
    post_code: string;
    block: string;
    road_no: string;
    house_no: string;
    flat_no: string;
    email: string;
    mobile_no: string;
    phone_no: string;
    pabx: string;


    // Business
    business_activity_enum_id: number;
    sectorObj: number;
    sector_id: number;
    sector_name: string;
    subSectorObj: number;
    sub_sector_id: number;
    management_staff_no: number;
    nonmanagement_staff_no: number;
    permanent_worker_no: number;
    casual_worker_no: number;
    ecommerce_platforms_id?: boolean;

    public id?: Number;
    public name?: string;
}
