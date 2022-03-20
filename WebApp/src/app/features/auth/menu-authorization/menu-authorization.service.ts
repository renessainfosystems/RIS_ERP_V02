import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import RoleModel from './menu-authorization.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MenuAuthorizationService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

  GetAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.ipconfig.base_IP + 'AuthorizationRole/GetAllRoles',httpOptions);

  }
  GetRoleById(authorization_role_id: number): Observable<any> {


    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/GetRoleById?authorization_role_id=' + authorization_role_id, httpOptions);

  }
  Create(authorizationRole:any): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/Create', authorizationRole, httpOptions);

  }

  Update(authorizationRole: any): Observable<any> {

    return this.http.put<any>(this.ipconfig.base_IP + 'AuthorizationRole/Update', authorizationRole, httpOptions);

  }

  Delete(authorization_role_id: number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/Delete', {
     authorization_role_id
    }, httpOptions);

  }

  Activity(authorization_role_id:number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/AuthorizationRoleActivity?authorization_role_id=' + authorization_role_id , httpOptions);

  }

  GetTreeMenuWithEvents(authorization_role_id: number): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'AuthorizationRole/GetTreeMenuWithEvents?authorization_role_id=' + authorization_role_id, httpOptions);

  }

  GetMenuAndRoleWiseEvent(menu_id:number,authorization_role_id: number): Observable<any[]> {

    return this.http.post<any[]>(this.ipconfig.base_IP + 'AuthorizationRole/GetMenuAndRoleWiseEvent?menu_id=' + menu_id + '&authorization_role_id=' + authorization_role_id, httpOptions);

  }

  AddPermission(menu_id: number, authorization_role_menu_events_id:number, authorization_role_id:number, menu_event_id:number): Observable<any> {

    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/AddPermission', {
      menu_id,
      authorization_role_menu_events_id, authorization_role_id, menu_event_id
    }, httpOptions);

  }

  RemovePermission(menu_id: number, authorization_role_menu_events_id: number, authorization_role_id: number, menu_event_id: number): Observable<any> {


    return this.http.post<any>(this.ipconfig.base_IP + 'AuthorizationRole/RemovePermission', {
      menu_id,
      authorization_role_menu_events_id, authorization_role_id, menu_event_id
    }, httpOptions);
  }

}
