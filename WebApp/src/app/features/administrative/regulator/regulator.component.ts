import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { SelectionModel } from '@angular/cdk/collections';
import { RegulatorService } from './regulator.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
    selector: 'app-regulator',
    templateUrl: './regulator.component.html',
    styleUrls: ['./regulator.component.css'],
})
export class RegulatorComponent implements OnInit {

    regulatorForm: FormGroup;
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
    allRegulator: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['regulatorName', 'Remarks'];
    isRegulatorEdit: boolean = false;
    rowSelected: boolean = false;

    selectedCountry: any;
    allCountry: any[];

    selectedRegulator: any;
    regulators: any[];

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


    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private RegulatorService: RegulatorService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {
        this.formInit();
        this.loadAllRegulators();
        this.loadAllCountryCboList();
    }

    formInit() {
        this.regulatorForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            regulator_name: [null, [Validators.required]],           
            remarks: ['']

        });
    }

    loadAllRegulators() {
        this.RegulatorService.getAllRegulator().subscribe(data => {
            this.regulators = data;
        });
    }

    loadAllCountryCboList() {
        this.RegulatorService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadRegulatorToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let regulator_id = this.rowData.regulator_id;
        this.RegulatorService.GetRegulatorById(regulator_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.regulatorForm.controls['country_id'].setValue(data.country_id);
            this.regulatorForm.controls['regulator_name'].setValue(data.regulator_name);
            this.regulatorForm.controls['remarks'].setValue(data.remarks);
            this.isRegulatorEdit = true;
        });
        this.toggleGridDisplay();
    }



    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.regulatorForm.controls;
    }

    onFormSubmit() {
        //for validation message -----------
        this.submitted = true;
        const regulatordata = this.regulatorForm.value;

        if ((regulatordata.country_id === null)) {
            return;
        }
        else if (regulatordata.regulator_name === null) {
            return;
        }
        if (this.regulatorForm.invalid) {
            return;
        }
        //end validation messate -----------

        this.dataSaved = false;
        if (this.isRegulatorEdit) {
            regulatordata.regulator_id = this.rowData.regulator_id;
            this.RegulatorService.UpdateRegulator(regulatordata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.regulators.splice(this.regulators.findIndex(item => item.regulator_id === regulatordata.regulator_id), 1);
                    this.regulators.unshift(result.Data[0]);
                    this.selectedRegulator = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
        else {
            this.RegulatorService.CreateRegulator(JSON.stringify(regulatordata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.regulators.unshift(result.Data[0]);
                    this.selectedRegulator = result.Data[0];
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
                this.deleteRegulatorInfo();
            },
            reject: () => {

            }
        });
    }

    deleteRegulatorInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let regulator_id = this.rowData.regulator_id;
        this.RegulatorService.DeleteRegulator(regulator_id).subscribe(data => {
            if (data.MessageType == 2) {
                this.regulators.splice(this.regulators.findIndex(item => item.regulator_id === regulator_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)

        });
        this.display = false;
        this.rowData = null;
    }

    resetForm() {
        this.regulatorForm.reset();
        this.isRegulatorEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }

}

