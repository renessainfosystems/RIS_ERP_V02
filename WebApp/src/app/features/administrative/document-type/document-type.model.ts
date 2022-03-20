
export default class DocumentType {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  supplier_id?: Number;
  legal_name?: string;
  short_name?: string;
  year_established?: string;
  domicile_enum_id: number;

  registryAuthorityObj: number;
  registry_authority_id?: number;
  regulatorObj: number;
  regulator_id?: number;
  ownershipTypeObj: number;
  ownership_type_id?: number;
  countryObj: number;
  country_id?: number;


  city: string;
  ps_area: string;
  post_code: string;
  block: string;
  road_no: string;
  house_no: string;
  flat_no: string;
  address_note: string;
  remarks?: string;


  public id?: Number;
  public name?: string;
}
