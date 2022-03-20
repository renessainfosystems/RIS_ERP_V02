

export default class Company {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }

  company_code: string;
  company_name: string;
  company_short_name: string;
  company_prefix: string;
  companyGroupObj: number;
  company_group_id: number;
  countryObj: number;
  country_id: number;
  divisionObj?: number;
  division_id?: number;
  districtObj?: number;
  district_id?: number;
  currencyObj?: number;
  currency_id?: number;
  company_reg_no?: string;
  company_reg_date?: Date;
  company_reg_file_path?: string;
  company_tin_no?: string;
  company_tin_date?: string;
  company_tin_file_path?: string;
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
  logo?: string;
  slogan?: string;
  name_in_local_language?: string;
  address_in_local_language?: string;
  remarks?: string;
  id: number;
  name?: string;
  }
