

export default class Bank {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
/*  bank_id: number;*/
  bank_name: string;
  bank_short_name: string;
  bank_swift_code: string;
  bank_email: string;
  bank_web_url: string;



  countryObj: number;
  country_id?: number;

  divisionObj: number;
  division_id?: number;

  districtObj: number;
  district_id?: number;


  city:string;
  ps_area:string;
  post_code:string;
  block:string;
  road_no:string;
  house_no:string;
  flat_no:string;
  address_note:string;
  remarks?: string;
  is_bank?: boolean;
  is_local?: boolean;
  //is_active?: boolean;


  id?: string;
  name?: string;
  }


