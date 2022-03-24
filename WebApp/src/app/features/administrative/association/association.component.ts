import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { AssociationService } from './association.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
    styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

    associationForm: FormGroup;
    submitted = false;

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormClose() {
        this.toggleFormDisplay();
    }
    //end grid and form show hide ********************

    rowData: any;
    dataSaved = false;
    allassociation: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['associationName', 'Remarks'];
    isAssociationEdit: boolean = false;
    rowSelected: boolean = false;

    selectedOrganizationType: any;
    allOrganizationType: any[];

    selectedCountry: any;
    allCountry: any[];

    selectedAssociation: any;
    associations: any[];


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
        this.resetForm();
        this.toggleGridDisplay();
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;
    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }


    constructor(private formbulider: FormBuilder, private AssociationService: AssociationService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {

        this.formInit();
        this.loadAllassociations();
        this.loadAllOrganizationTypeEnum();
        this.loadAllCountryCboList();
    }

    formInit() {
        this.associationForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            association_name: [null, [Validators.required]],
            abbreviation: [null, [Validators.required]],
            organization_type_id_enum: [null, [Validators.required]],
            remarks: ['']

        });
    }

    loadAllassociations() {
        this.AssociationService.getAllAssociation().subscribe(data => {
            this.associations = data;
        });
    }

    loadAllCountryCboList() {
        this.AssociationService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadAllOrganizationTypeEnum() {
        this.AssociationService.getAllOrganizationTypeEnum().subscribe(data => {
            this.allOrganizationType = data;
        });
    }

    loadassociationToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let association_id = this.rowData.association_id;
        this.AssociationService.GetAssociationById(association_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.associationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
            this.associationForm.controls['country_id'].setValue(data.country_id);
            this.associationForm.controls['association_name'].setValue(data.association_name);
            this.associationForm.controls['abbreviation'].setValue(data.abbreviation);
            this.associationForm.controls['remarks'].setValue(data.remarks);
            this.isAssociationEdit = true;
        });
        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.associationForm.controls;
    }


    onFormSubmit() {
        //for validation message -----------
        this.submitted = true;
        const associationdata = this.associationForm.value;

        if ((associationdata.country_id === null)) {
            return;
        }
        else if (associationdata.organization_type_id_enum === null) {
            return;
        }
        else if (associationdata.association_name === null) {
            return;
        }
        if (this.associationForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        if (this.isAssociationEdit) {
            associationdata.association_id = this.rowData.association_id;
            this.AssociationService.UpdateAssociation(associationdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.associations.splice(this.associations.findIndex(item => item.association_id === associationdata.association_id), 1);
                    this.associations.unshift(result.Data[0]);
                    this.selectedAssociation = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
        else {
            this.AssociationService.CreateAssociation(JSON.stringify(associationdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.associations.unshift(result.Data[0]);
                    this.selectedAssociation = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayBasic = false;
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
    }

    deleteRegistryAuthorityInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let association_id = this.rowData.association_id;
        this.AssociationService.DeleteAssociation(association_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.associations.splice(this.associations.findIndex(item => item.association_id === association_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.resetForm();
    }

    resetForm() {
        this.associationForm.reset();
        this.isAssociationEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }
}


