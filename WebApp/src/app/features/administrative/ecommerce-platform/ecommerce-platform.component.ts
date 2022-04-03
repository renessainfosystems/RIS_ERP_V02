import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { SelectionModel } from '@angular/cdk/collections';
import { EcommercePlatformService } from './ecommerce-platform.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';




@Component({
    selector: 'app-ecommerce-platform',
    templateUrl: './ecommerce-platform.component.html',
    styleUrls: ['./ecommerce-platform.component.css'],
})
export class EcommercePlatformComponent implements OnInit {

    ecommercePlatformForm: FormGroup;
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
    allEcommercePlatform: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['EcommercePlatformName', 'Remarks'];
    isEcommercePlatformEdit: boolean = false;
    rowSelected: boolean = false;


    selectedCountry: any;
    allCountry: any[];

    selectedEcommercePlatform: any;
    ecommercePlatforms: any[];


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
    //displayBasic: boolean = false;
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


    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private EcommercePlatformService: EcommercePlatformService, private toastr: ToastrService, private notifyService: NotificationService) {

    }


    ngOnInit() {

        this.formInit();
        this.loadAllCountryCboList();
        this.loadAllEcommercePlatforms();

    }

    formInit() {
        this.ecommercePlatformForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            ecommerce_paltforms_name: [null, [Validators.required]],
            remarks: ['']
        });
    }

    loadAllCountryCboList() {
        this.EcommercePlatformService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }


    loadAllEcommercePlatforms() {
        this.EcommercePlatformService.getAllEcommercePlatform().subscribe(data => {
            this.ecommercePlatforms = data;
        });
    }

    loadEcommercePlatformToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let ecommerce_paltforms_id = this.rowData.ecommerce_paltforms_id;
        this.EcommercePlatformService.GetEcommercePlatformById(ecommerce_paltforms_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.ecommercePlatformForm.controls['ecommerce_paltforms_name'].setValue(data.ecommerce_paltforms_name);
            this.ecommercePlatformForm.controls['country_id'].setValue(data.country_id);
            this.ecommercePlatformForm.controls['remarks'].setValue(data.remarks);
            this.isEcommercePlatformEdit = true;
        });
        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.ecommercePlatformForm.controls;
    }

    onFormSubmit() {
        const ecommercePlatformdata = this.ecommercePlatformForm.value;
        if (!(ecommercePlatformdata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please Select Country")
        }
        if (!(ecommercePlatformdata.ecommerce_paltforms_name)) {
            return this.notifyService.ShowNotification(2, "Please input Ecommerce Paltforms Name ")
        }
        if (this.isEcommercePlatformEdit) {
            ecommercePlatformdata.ecommerce_paltforms_id = this.rowData.ecommerce_paltforms_id;
            this.EcommercePlatformService.UpdateEcommercePlatform(ecommercePlatformdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.ecommercePlatforms.splice(this.ecommercePlatforms.findIndex(item => item.ecommerce_paltforms_id === ecommercePlatformdata.ecommerce_paltforms_id), 1);
                    this.ecommercePlatforms.unshift(result.Data[0]);
                    this.selectedEcommercePlatform = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
        else {
            this.EcommercePlatformService.CreateEcommercePlatform(JSON.stringify(ecommercePlatformdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.ecommercePlatforms.unshift(result.Data[0]);
                    this.selectedEcommercePlatform = result.Data[0];
                    this.rowSelected = true;
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }

    }


    deleteModal(event: Event) {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        this.confirmationService.confirm({
            key: 'delete',
            target: event.target,
            message: 'Are you sure that you want to delete?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteEcommercePlatformInfo();
            },
            reject: () => {

            }
        });
    }

    deleteEcommercePlatformInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let ecommerce_paltforms_id = this.rowData.ecommerce_paltforms_id;
        this.EcommercePlatformService.DeleteEcommercePlatform(ecommerce_paltforms_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.ecommercePlatforms.splice(this.ecommercePlatforms.findIndex(item => item.ecommerce_paltforms_id === ecommerce_paltforms_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.rowData = null;
    }


    resetForm() {
        this.ecommercePlatformForm.reset();
        this.isEcommercePlatformEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }


}


