
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import DocumentType from './document-type.model';
import { DocumentTypeService } from './document-type.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  documentTypeForm: any;
  allDocumentType: Observable<DocumentType[]>;
  selection = new SelectionModel<DocumentType>(true, []);
  documentTypeIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['RegulatorName', 'Remarks'];


  selectedCountry: DocumentType;
  allCountry: DocumentType[];

  selectedDocumentType: DocumentType;
  documentTypes: DocumentType[];
  first = 0;
  rows = 10;

  // for delete data modal
  display: boolean = false;
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    else
      this.display = true;
  }

  // for Insert and update data modal
   displayBasic: boolean = false;
   showBasicDialog() {
   this.displayBasic = true;
   this.resetForm();
  }


  constructor(private formbulider: FormBuilder, private DocumentTypeService: DocumentTypeService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.DocumentTypeService.getAllDocumentType().subscribe(data => this.documentTypes = data);

    this.documentTypeForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      document_type_name: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      remarks: ['']

    });
    this.loadAllCountryCboList();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.documentTypes ? this.first === (this.documentTypes.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.documentTypes ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.DocumentTypeService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  selectRow(Regulator) {
    this.rowData = Regulator;
  }

  loadDocumentTypeToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let documentTypeId = this.rowData.document_type_id;
    this.DocumentTypeService.GetDocumentTypeById(documentTypeId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.documentTypeIdUpdate = data.document_type_id;
      this.documentTypeForm.controls['countryObj'].setValue(data.country_id);
      this.documentTypeForm.controls['document_type_name'].setValue(data.document_type_name);
      this.documentTypeForm.controls['remarks'].setValue(data.remarks);
    });
    this.displayBasic = true;
  }

  deleteRegulatorInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let documentTypeId = this.rowData.document_type_id;
    this.DocumentTypeService.DeleteDocumentType(documentTypeId).subscribe(data => {
      this.massage = null;
      this.loadAllDocumentType();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }


  loadAllDocumentType() {
    this.DocumentTypeService.getAllDocumentType().subscribe(data => {
      this.documentTypes = data;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const documentTypedata = this.documentTypeForm.value;
    documentTypedata.country_id = documentTypedata.countryObj;
    this.CreateDocumentTypedata(documentTypedata);
    this.documentTypeForm.reset();
  }

  resetForm() {
    this.documentTypeForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllDocumentType();
  }

  CreateDocumentTypedata(documentTypedata: any) {
    if (this.documentTypeIdUpdate == null) {

      this.DocumentTypeService.CreateDocumentType(documentTypedata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllDocumentType();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.documentTypeIdUpdate = null;
          this.displayBasic = false;
        }
      );
    } else {
      documentTypedata.document_type_id = this.documentTypeIdUpdate;
      this.DocumentTypeService.UpdateDocumentType(documentTypedata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllDocumentType();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.documentTypeIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}


