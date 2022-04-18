import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { DealerListService } from './dealerlist.service';

@Component({
    selector: 'app-dealerlist',
    templateUrl: './dealerlist.component.html',
    styleUrls: ['./dealerlist.component.scss']
})
export class DealerlistComponent implements OnInit {
    dealerinfoList: any[];
    gridDisplay = false;
    selecteddealerinfo: any;
    first = 0;
    rows = 10;
    allDepartment: any[];
    allEmployee: any[];
    dealerassignForm: FormGroup;
    submitted = false;
    dataSaved: boolean;
    delearVarificationUpdate: any;
    isDealerVerificationEdit: any;
    dealerVerificationList: any;
    selectedVerification: any;
    rowDataVerification: any;
    onRowUnselectData: any;
    dealerVerificationIndex: any;
    rowData: any;
    rowSelected: boolean;

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private dealerlistService: DealerListService) {

    }

    ngOnInit(): void {
        this.dealerlistService.getAllDealerInfo().subscribe(data => this.dealerinfoList = data);

        this.dealerassignForm = this.formbulider.group({
            dealer_info_id: [''],
            department_id: ['', [Validators.required]],
            employee_id: ['', [Validators.required]],
        });

        //Load Dropdown
        this.loadAllDepartmentCboList();
        this.loadAllEmployeeCboList();

    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;

    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }

    loadAllDepartmentCboList() {
        this.dealerlistService.getAllDepartmentCboList().subscribe(data => {
            this.allDepartment = data;
        });
    }

    loadAllEmployeeCboList() {
        this.dealerlistService.getAllEmployeeCboList().subscribe(data => {
            this.allEmployee = data;
        });
    }

    get d(): { [key: string]: AbstractControl } {
        return this.dealerassignForm.controls;

    }

    SaveDealerVerification() {
        debugger
        this.submitted = true;
        const data = this.dealerassignForm.value;

        if (this.dealerassignForm.invalid) {
            return;
        }

        let formData = new FormData();
        for (const key of Object.keys(this.dealerassignForm.value)) {
            const value = this.dealerassignForm.value[key];
            if ((value == "") || (value == null) || (value == undefined)) {

            }            
            else {

                formData.append(key, value);
            }
        }


        var arr = [];
        var object = {};
        formData.forEach(function (value, key) {
            arr[key] = value;
            //fd.append(key, value);
        });

        var json = JSON.stringify(arr);
        console.log(object)

        if (this.isDealerVerificationEdit) {
            data.dealerinfoId = this.rowData.DealerInfoId;
            formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerlistService.updateDealerVerification(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                if (result.MessageType == 1) {
                    this.dealerVerificationList.splice(this.dealerVerificationList.findIndex(item => item.DealerCreditInfoId === data.dealerCreditinfoId), 1);
                    this.dealerVerificationList.unshift(result.Data);
                    this.selectedVerification = result.Data;
                    this.rowDataVerification = result.Data;
                    this.onRowUnselectData(event);
                    this.dealerVerificationIndex();
                    this.isDealerVerificationEdit = false;
                    this.submitted = false;
                    this.dealerassignForm.reset();
                    this.ngOnInit();
                }
            });
            //this.gridDisplayCredit = false;
            //this.formDisplayCredit = true;
        }
        else {
            formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerlistService.createDealerVerification(formData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                if (result.MessageType == 1) {
                    this.dealerVerificationList.splice(this.dealerVerificationList.findIndex(item => item.DealerCreditInfoId === data.dealerCreditinfoId), 1);
                    this.dealerVerificationList.unshift(result.Data);
                    this.selectedVerification = result.Data;
                    this.rowDataVerification = result.Data;
                    this.onRowUnselectData(event);
                    this.dealerVerificationIndex();
                    this.isDealerVerificationEdit = false;
                    this.submitted = false;
                    this.dealerassignForm.reset();
                    this.ngOnInit();
                }
            });
            //this.gridDisplayCredit = false;
            //this.formDisplayCredit = true;
        }

    }
}


