import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../../core/services/IP-configuration.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsermenupermissionService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  

  AddUserWiseRole(user_info_id: number, authorization_role_id: number, is_role_wise_event: boolean): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'UserMenuPermission/AddUserWiseRole', { user_info_id, authorization_role_id, is_role_wise_event }, httpOptions);

  }




  GetTreeMenuWithEvents(authorization_role_id: number): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'UserMenuPermission/GetTreeMenuWithEvents?authorization_role_id=' + authorization_role_id, httpOptions);

  }

  GetTreeMenuWithEventsByUserInfoId(user_info_id: number): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'UserMenuPermission/GetTreeMenuWithEventsByUserInfoId?user_info_id=' + user_info_id, httpOptions);

  }
  
  GetMenuAndRoleWiseEventByUserInfoId(menu_id: number, user_info_id: any): Observable<any[]> {
   
    return this.http.post<any[]>(this.ipconfig.base_IP + 'UserMenuPermission/GetMenuAndRoleWiseEventByUserInfoId?menu_id=' + menu_id + '&user_info_id=' + user_info_id, httpOptions);

  }
  GetMenuAndRoleWiseEvent(menu_id: number, authorization_role_id: number): Observable<any[]> {

    return this.http.post<any[]>(this.ipconfig.base_IP + 'UserMenuPermission/GetMenuAndRoleWiseEvent?menu_id=' + menu_id + '&authorization_role_id=' + authorization_role_id, httpOptions);

  }

  AddUserMenuPermission(menu_id: number, user_menu_authorization_event_id: number, user_info_id: number, menu_event_id: number, is_role_wise_event: boolean): Observable<any> {
    
    return this.http.post<any>(this.ipconfig.base_IP + 'UserMenuPermission/AddUserMenuPermission', {
      menu_id,
      user_menu_authorization_event_id, user_info_id, menu_event_id,is_role_wise_event
    }, httpOptions);

  }

  RemoveUserMenuPermission(menu_id: number, user_menu_authorization_event_id: number, user_info_id: number, menu_event_id: number, is_role_wise_event: boolean): Observable<any> {


    return this.http.post<any>(this.ipconfig.base_IP + 'UserMenuPermission/RemoveUserMenuPermission', {
      menu_id,
      user_menu_authorization_event_id, user_info_id, menu_event_id, is_role_wise_event
    }, httpOptions);
  }

  GetAllActiveRole(): Observable<any[]> {
    return this.http.get<any[]>(this.ipconfig.base_IP + 'UserMenuPermission/GetAuthorizationRole', httpOptions);

  }
  GetRoleByUserId(user_info_id: any): Observable<any> {

    return this.http.get<any>(this.ipconfig.base_IP + 'UserMenuPermission/GetRoleByUserId?user_info_id=' + user_info_id, httpOptions);

  }


}
