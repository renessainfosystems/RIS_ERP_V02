

export default class Employee {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
    throw new Error('Method not implemented.');
  }
  //employee_id?: number;
  //code: string;

  //for Dropdownload Property
  //Mr and Mrs
  title_enum_id?: number;
  title_enum_name?: string;
  //
  //Gender
  gender_enum_id?: number;
  gender_enum_name?: string;
  //
  //religion
  religion_enum_id?: number;
  religion_enum_name?: string;
  //
  //Blood Group
  blood_group_enum_id?: number;
  blood_group_enum_name?: string;
  //
  //Residencial Status
  residentcial_status_enum_id?: number;
  residentcial_status_enum_name?: string;
  //
  //#end dropdownload Property
}
