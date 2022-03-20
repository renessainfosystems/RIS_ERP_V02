
export default class Country {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  countryObj: number;
  country_id: number;
  continent_enum_id: number;
  country_code: string;
  country_name: string;
  country_short_name: string;
  name_in_local_language?: string;
  short_name_in_local_language?: string;
  remarks?: string
}


