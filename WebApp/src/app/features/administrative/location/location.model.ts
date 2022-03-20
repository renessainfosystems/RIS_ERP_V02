

export default class Location {
    CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
        throw new Error('Method not implemented.');
    }
    MessageType(MessageType: any, CurrentMessage: any) {
        throw new Error('Method not implemented.');
    }

    location_code: null;
    location_name: string;
    location_short_name: string;
    location_prefix: string;
    country_id: number;
    division_id: number;
    district_id: number;
    thana_id: number;
    vatApplicableObj: number;
    vat_applicable_type_enum_name: string;
    vat_applicable_type_enum_id: number;
    location_reg_no: string;
    location_reg_date: Date;
    location_reg_file_path: string;
    city: string;
    ps_area: string;
    post_code: string;
    block: string;
    road_no: string;
    house_no: string;
    flat_no: string;
    address_note: string;
    phone: string;
    email: string;
    web_url: string;
    name_in_local_language: string;
    address_in_local_language: string;
    remarks: string;
}
