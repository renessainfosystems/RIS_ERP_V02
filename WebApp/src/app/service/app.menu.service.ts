import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPConfiguration } from '../core/services/IP-configuration.service';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class MenuService {

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
       this.resetSource.next(true);
    }

   
    getTreeMenuForSidebar(): Observable<any[]> {

        return this.http.get<any[]>(this.ipconfig.base_IP + 'Menu/GetTreeMenuForSidebar', httpOptions);

    }
}
