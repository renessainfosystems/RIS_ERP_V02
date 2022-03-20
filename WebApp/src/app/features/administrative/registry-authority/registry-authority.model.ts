export default class RegistryAuthority {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  registry_authority_id?: Number;
  country_id?: Number;
  registry_authority_name?: string;
  registry_authority_short_name?: string;
  remarks?: string
  public id?: Number;
  public name?: string;
}
