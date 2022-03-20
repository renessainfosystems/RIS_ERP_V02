import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import KeySkill from './key-skill.model';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class KeySkillService {

  constructor(private http: HttpClient,private ipconfig: IPConfiguration) { }

  
  getAllKeySkill(): Observable<KeySkill[]> {

    return this.http.get<KeySkill[]>(this.ipconfig.base_IP + 'KeySkill/GetAllKeySkill');    
  }
  
  CreateKeySkill(user:any): Observable<KeySkill> {

    return this.http.post<KeySkill>(this.ipconfig.base_IP + 'KeySkill/Create',user,httpOptions);

  }
  UpdateKeySkill(user:any): Observable<KeySkill> {
  
    return this.http.post<KeySkill>(this.ipconfig.base_IP + 'KeySkill/Update',user,httpOptions);

  }
  DeleteKeySkill(key_skill_id:Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'KeySkill/Delete?key_skill_id=' + key_skill_id, httpOptions);

  }

  GetKeySkillById(key_skill_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'KeySkill/GetById?key_skill_id=' + key_skill_id, httpOptions);
  }

}
