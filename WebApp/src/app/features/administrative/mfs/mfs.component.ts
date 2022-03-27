import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MfsService } from './mfs.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';


@Component({
    selector: 'app-mfs',
    templateUrl: './mfs.component.html',
    styleUrls: ['./mfs.component.css']
})
export class MfsComponent implements OnInit {
    mfsForm: FormGroup;
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
    allMfs: Observable<any[]>;
    selection = new SelectionModel<any>(true, []);
    massage = null;
    displayedColumns: string[] = ['associationName', 'Remarks'];
    isMfsEdit: boolean = false;
    rowSelected: boolean = false;

    selectedCountry: any;
    allCountry: any[];

    selectedMfs: any;
    mfss: any[];

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

    constructor(private formbulider: FormBuilder, private MfsService: MfsService, private toastr: ToastrService, private notifyService: NotificationService) {

    }

    ngOnInit() {

        this.formInit();
        this.loadAllMfs();
        this.loadAllCountryCboList();

    }

    formInit() {
        this.mfsForm = this.formbulider.group({
            country_id: [null, [Validators.required]],
            mfs_name: [null, [Validators.required]],
            remarks: ['']

        });
    }


    loadAllCountryCboList() {
        this.MfsService.getAllCountryCboList().subscribe(data => {
            this.allCountry = data;
        });
    }

    loadAllMfs() {
        this.MfsService.getAllMfs().subscribe(data => {
            this.mfss = data;
        });
    }

    loadMfsToEdit() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let mfs_id = this.rowData.mfs_id;
        this.MfsService.GetMfsById(mfs_id).subscribe(data => {
            this.massage = null;
            this.dataSaved = false;
            this.mfsForm.controls['country_id'].setValue(data.country_id);
            this.mfsForm.controls['mfs_name'].setValue(data.mfs_name);
            this.mfsForm.controls['remarks'].setValue(data.remarks);
            this.isMfsEdit = true;
        });
        this.toggleGridDisplay();
    }

    //for validation messate -----------
    get f(): { [key: string]: AbstractControl } {
        return this.mfsForm.controls;
    }

    onFormSubmit() {
        const mfsdata = this.mfsForm.value;
        if (!(mfsdata.country_id)) {
            return this.notifyService.ShowNotification(2, "Please Select Country")
        }
        if (!(mfsdata.mfs_name)) {
            return this.notifyService.ShowNotification(2, "Please Select Country Name")
        }
        if (this.isMfsEdit) {
            mfsdata.mfs_id = this.rowData.mfs_id;
            this.MfsService.UpdateMfs(mfsdata).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.mfss.splice(this.mfss.findIndex(item => item.mfs_id === mfsdata.mfs_id), 1);
                    this.mfss.unshift(result.Data[0]);
                    this.selectedMfs = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
        else {
            this.MfsService.CreateMfs(JSON.stringify(mfsdata)).subscribe(result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.clear();
                    this.mfss.unshift(result.Data[0]);
                    this.selectedMfs = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                    this.submitted = false;
                }
            });
        }
    }

    deleteMfsInfo() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        let mfs_id = this.rowData.mfs_id;
        this.MfsService.DeleteMfs(mfs_id).subscribe(data => {
            debugger
            if (data.MessageType == 2) {
                this.mfss.splice(this.mfss.findIndex(item => item.mfs_id === mfs_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        this.display = false;
        this.resetForm();
    }

    resetForm() {
        this.mfsForm.reset();
        this.isMfsEdit = false;
        this.formInit();
    }

    clear() {
        this.resetForm();
    }
}

