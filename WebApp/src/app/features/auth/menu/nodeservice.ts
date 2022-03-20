import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getFilesystem() {
    return this.http.get<any>('assets/filesystem.json')
      .toPromise()
      .then(res => <any[]>res.data);
  }


}
