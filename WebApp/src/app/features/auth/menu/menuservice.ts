import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import EventModel from './EventModel';





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }



  getMenuTree(): Observable<any[]> {

    return this.http.get<any[]>(this.ipconfig.base_IP + 'Menu/GetMenuTree');


  }

  CreateMenu(menu: any): Observable<any> {
    console.log(menu)
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/Create', menu, httpOptions);

  }
  getMenuByMenuId(menu_id): Observable<any> {
   
    
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/GetMenuByMenuId?menuId=' + menu_id, httpOptions);

  }
  

  UpdateMenu(menu: any): Observable<any> {

    return this.http.put<any>(this.ipconfig.base_IP + 'Menu/Update', menu, httpOptions);

  }

  MenuActivity(menu_id: Number, menu_parent_id: Number): Observable<any> {
 
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/MenuActivity?menu_id=' + menu_id + '&menu_parent_id=' + menu_parent_id, httpOptions);

  }
  MenuSorting(menu_id:any, menu_parent_id, is_upper_sorting): Observable<any> {


    return this.http.post(this.ipconfig.base_IP + 'Menu/MenuSorting?menu_id=' + menu_id + '&menu_parent_id=' + menu_parent_id +'&is_upper_sorting=' + is_upper_sorting, httpOptions);

  }
  DeleteMenuEvent(menu_id, menu_event_id): Observable<any> {
    
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/DeleteMenuEvent', { menu_id, menu_event_id }, httpOptions);

  }
  DeleteMenu(menu_id,menu_parent_id): Observable<any> {
 
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/Delete', {
      menu_id,
      menu_parent_id
    }, httpOptions);

  }
  CreateMenuEvent(menu_id, event_enum_id): Observable<any> {
   
    return this.http.post<any>(this.ipconfig.base_IP + 'Menu/CreateMenuEvent', { menu_id, event_enum_id}, httpOptions);

  }
  
  getAllEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.ipconfig.base_IP + 'GlobalEnum/AuthorizationEventEnum');

  }

  UploadImage(File: any): Observable<any> {

     return this.http.post<any>(this.ipconfig.base_IP + 'Menu/Upload', File);

  }

}
