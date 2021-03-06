import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPConfiguration } from '../../../core/services/IP-configuration.service';
import DocumentType from './document-type.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeService {

  constructor(private http: HttpClient, private ipconfig: IPConfiguration) { }


  getAllDocumentType(): Observable<any[]> {

      return this.http.get<any[]>(this.ipconfig.base_IP + 'DocumentType/GetAllByRawSql');

  }

    CreateDocumentType(documentType: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DocumentType/Create', documentType, httpOptions);

  }
    UpdateDocumentType(document_type_id: any): Observable<any> {

        return this.http.post<any>(this.ipconfig.base_IP + 'DocumentType/Update', document_type_id, httpOptions);

  }

  DeleteDocumentType(document_type_id: Number): Observable<any> {

    return this.http.post(this.ipconfig.base_IP + 'DocumentType/Delete?document_type_id=' + document_type_id, httpOptions);
  }


  GetDocumentTypeById(document_type_id: Number): Observable<any> {

    return this.http.get(this.ipconfig.base_IP + 'DocumentType/GetById?document_type_id=' + document_type_id, httpOptions);

  }

    getAllCountryCboList(): Observable<any[]> {
        return this.http.get<any[]>(this.ipconfig.base_IP + 'Country/CountryCboList');
  }

}
