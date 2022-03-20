

export default class BankBranch {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }

  bank_branch_name: string;
  bank_branch_short_name: string;
  bank_branch_routing: string;
  bankObj: number;
  BankId: number;
  BankName: string;
  bank_branch_contact_number: string;
  bank_branch_email: string;



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
  is_branch?: boolean;

  //is_active?: boolean;


  id?: string;
  name?: string;
  }


