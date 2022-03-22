
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
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
    allDocumentType: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['associationName', 'Remarks'];
    isDocumentTypeEdit: boolean = false;
    rowSelected: boolean = false;

    selectedCountry: any;
    allCountry: any[];

    selectedDocumentType: any;
    documentTypes: any[];

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
        this.documentTypeForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.displayBasic = true;
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;
    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }


    constructor(private formbulider: FormBuilder, private DocumentTypeService: DocumentTypeService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {

        this.formInit();
        this.loadAllDocumentType();
        this.loadAllCountryCboList();
    }

    formInit() {
        this.documentTypeForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            document_type_name: [null, [Validators.required]],
            remarks: ['']
        });
    }


    loadAllCountryCboList() {
        this.DocumentTypeService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadAllDocumentType() {
        this.DocumentTypeService.getAllDocumentType().subscribe(data => {
            this.documentTypes = data;
        });
    }


    loadDocumentTypeToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let document_type_id = this.rowData.document_type_id;
        this.DocumentTypeService.GetDocumentTypeById(document_type_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.documentTypeForm.controls['country_id'].setValue(data.country_id);
            this.documentTypeForm.controls['document_type_name'].setValue(data.document_type_name);
            this.documentTypeForm.controls['remarks'].setValue(data.remarks);
            this.isDocumentTypeEdit = true;

        });
        this.displayBasic = true;
    }

    deleteRegulatorInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let document_type_id = this.rowData.document_type_id;
        this.DocumentTypeService.DeleteDocumentType(document_type_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.documentTypes.splice(this.documentTypes.findIndex(item => item.document_type_id === document_type_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
    }

    onFormSubmit() {
        const documentTypedata = this.documentTypeForm.value;
        if (!(documentTypedata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please Select Country")
        }
        if (!(documentTypedata.document_type_name)) {
            return this.notifyService.ShowNotification(2, "Please input document type name")
        }
        if (this.isDocumentTypeEdit) {
            documentTypedata.document_type_id = this.rowData.document_type_id;
            this.DocumentTypeService.UpdateDocumentType(documentTypedata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.documentTypes.splice(this.documentTypes.findIndex(item => item.document_type_id === documentTypedata.document_type_id), 1);
                    this.documentTypes.unshift(result.Data[0]);
                    this.selectedDocumentType = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                }
            });
        }
        else {
            this.DocumentTypeService.CreateDocumentType(JSON.stringify(documentTypedata)).subscribe(result => {
                debugger
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.documentTypes.unshift(result.Data[0]);
                    this.selectedDocumentType = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                }
            });
        }
    }

    resetForm() {
        this.documentTypeForm.reset();
        this.isDocumentTypeEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }

}


