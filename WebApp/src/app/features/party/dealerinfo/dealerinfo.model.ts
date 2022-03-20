

export default class DealerInfo {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  
  //for Dropdownload Property
 
  //Continent
  continent_enum_id?: number;
  continent_enum_name?: string;
  
  //Domicile
  domicile_enum_id?: number;
  domicile_enum_name?: string;

  //SecurityType
  security_type_enum_id?: number;
  security_type_enum_name?: string;

  //Prefered Method
  prefered_method_enum_id?: number;
  prefered_method_enum_name?: string;

  //Busineess Type
  business_type_enum_id?: any;
  business_type_enum_name?: string;

  //Organazation Type
  organazation_type_enum_id?: number;
  organazation_type_enum_name?: string;

  //#end dropdownload Property
}
