

export default class CompanyGroup {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }

  group_name: string;
  group_short_name: string;
  countryObj: number;
  country_id: number;
  divisionObj?: number;
  division_id?: number;
  districtObj?: number;
  district_id?: number;
  currencyObj?: number;
  currency_id?: number;
  city?: string;
  ps_area?: string;
  post_code?: string;
  block?: string;
  road_no?: string;
  house_no?: string;
  flat_no?: string;
  address_note?: string;
  phone?: string;
  email?: string;
  web_url?: string;
  group_logo?: string;
  name_in_local_language?: string;
  address_in_local_language?: string;
  remarks?: string;
  id: number;
  name?: string;
  }
