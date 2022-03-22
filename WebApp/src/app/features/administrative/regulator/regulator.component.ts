import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

    rowData: any;
    dataSaved = false;
    regulatorForm: any;
    allRegulator: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['associationName', 'Remarks'];
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
    displayBasic: boolean = false;
    showBasicDialog() {
        this.regulatorForm.reset();
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


    constructor(private formbulider: FormBuilder, private RegulatorService: RegulatorService, private toastr: ToastrService, private notifyService: NotificationService) {

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
        this.displayBasic = true;
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
    }


    loadAllRegulators() {
        this.RegulatorService.getAllRegulator().subscribe(data => {
            this.regulators = data;
        });
    }

    onFormSubmit() {
        const regulatordata = this.regulatorForm.value;
        if (!(regulatordata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please Select Country")
        }
        if (!(regulatordata.regulator_name)) {
            return this.notifyService.ShowNotification(2, "Please Input Regulator Name")
        }
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
                    this.displayBasic = false;
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
                    this.displayBasic = false;
                }
            });
        }
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

