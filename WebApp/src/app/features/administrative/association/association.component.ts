import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import association from './association.model';
import { AssociationService } from './association.service';
import OrganizationType from './OrganizationTypeModel'
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
    selector: 'app-association',
    templateUrl: './association.component.html',
    styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

    rowData: any;
    dataSaved = false;
    associationForm: any;
    allassociation: Observable<association[]>;
    selection = new SelectionModel<association>(true, []);
    associationIdUpdate = null;
    massage = null;
    displayedColumns: string[] = ['associationName', 'Remarks'];


    selectedOrganizationType: OrganizationType;
    allOrganizationType: OrganizationType[];

    selectedCountry: association;
    allCountry: association[];

    selectedassociation: association;
    associations: association[];
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
        this.associationForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.displayBasic = true;
    }


    constructor(private formbulider: FormBuilder, private AssociationService: AssociationService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit(): void {

        this.AssociationService.getAllAssociation().subscribe(data => this.associations = data);

        this.associationForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            association_name: [null, [Validators.required]],
            abbreviation: [null, [Validators.required]],
            organization_type_id_enum: [null, [Validators.required]],
            remarks: ['']

        });
        this.loadAllOrganizationTypeEnum();
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
        return this.associations ? this.first === (this.associations.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.associations ? this.first === 0 : true;
    }

    loadAllCountryCboList() {
        this.AssociationService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }


    selectRow(association) {
        this.rowData = association;
    }

    loadassociationToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let associationId = this.rowData.association_id;
        this.AssociationService.GetAssociationById(associationId).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.associationIdUpdate = data.association_id;
            this.associationForm.controls['organization_type_id_enum'].setValue(data.organization_type_id_enum);
            this.associationForm.controls['country_id'].setValue(data.country_id);
            this.associationForm.controls['association_name'].setValue(data.association_name);
            this.associationForm.controls['abbreviation'].setValue(data.abbreviation);
            this.associationForm.controls['remarks'].setValue(data.remarks);

        });
        this.displayBasic = true;
    }


    deleteRegistryAuthorityInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let associationId = this.rowData.association_id;
        this.AssociationService.DeleteAssociation(associationId).subscribe(data => {
            this.massage = null;
            this.loadAllassociations();
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.resetForm();
    }


    loadAllOrganizationTypeEnum() {
        this.AssociationService.getAllOrganizationTypeEnum().subscribe(data => {
            this.allOrganizationType = data;
        });
    }


    loadAllassociations() {
        this.AssociationService.getAllAssociation().subscribe(data => {
            this.associations = data;
        });
    }

    onFormSubmit() {
        const associationdata = this.associationForm.value;
        if (!(associationdata.organization_type_id_enum)) {
            return this.notifyService.ShowNotification(2, "Please Select Organization")
        }
        if (!(associationdata.association_name)) {
            return this.notifyService.ShowNotification(2, "Please Input Association Name")
        }
        if (!(associationdata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please Select Country")
        }
        else {
            this.dataSaved = false;
            this.Createassociation(associationdata);
        }
    }

    resetForm() {
        this.associationForm.reset();
        this.massage = null;
        this.dataSaved = false;
        this.loadAllassociations();
    }

    Createassociation(associationdata: any) {
        if (this.associationIdUpdate == null) {
            this.AssociationService.CreateAssociation(associationdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.dataSaved = true;
                    this.associations.unshift(result.Data);
                    this.associationIdUpdate = null;
                    this.displayBasic = false;
                }
            });
        }
        else {
            associationdata.association_id = this.associationIdUpdate;
            this.AssociationService.UpdateAssociation(associationdata).subscribe(result => {
                debugger
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.dataSaved = true;
                    this.associations.unshift(result.Data);
                    this.associationIdUpdate = null;
                    this.displayBasic = false;
                }
            });
        }
    }

    //if(this.isBenefitPolicyEdit) {

    //    data.late_early_policy_id = this.rowData.late_early_policy_id;
    //    this.LateEarlyPolicyService.update(data).subscribe(result => {

    //        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
    //        if (result.MessageType == 1) {
    //            this.clear();
    //            this.lateEarlyPolicies.splice(this.lateEarlyPolicies.findIndex(item => item.late_early_policy_id === data.late_early_policy_id), 1);
    //            this.lateEarlyPolicies.unshift(result.Data[0]);
    //            this.selectedPolicy = result.Data[0];
    //            this.rowSelected = true;
    //            this.rowData = result.Data[0];
    //        }


    //    });
    //}

}

