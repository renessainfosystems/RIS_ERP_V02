
export default class District {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  district_id?: number;
  division_id?: number;
  district_code?: string;
  district_name?: string;
  district_short_name?: string;
  name_in_local_language?: string;
  short_name_in_local_language?: string;
  remarks?: string;
  districtObj?: number;
  //public country_id?: Number;
  //public country_name?: string;
}
