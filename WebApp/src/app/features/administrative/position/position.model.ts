

export default class Position {
  CurrentMessage(MessageType: (MessageType: any, CurrentMessage: any) => void, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  MessageType(MessageType: any, CurrentMessage: any) {
      throw new Error('Method not implemented.');
  }
  position_id?: Number;
  position_code:string;
  position_name:string;
  position_short_name:string;
  name_in_local_language:string;
  remarks?: string;
  created_datetime: Date;
  updated_datetime?: Date;
  db_server_date_time: Date;
  created_user_id: Number;
  updated_user_id?: Number;
  }
