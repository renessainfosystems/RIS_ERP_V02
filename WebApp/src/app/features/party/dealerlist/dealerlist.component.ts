import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { DealerListService } from './dealerlist.service';

import { ActivatedRoute, Router } from '@angular/router';


//import { Component, OnInit, ViewChild } from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
//import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
//import { Observable } from 'rxjs';
//import { ConfirmationService } from 'primeng/api';
//import { SelectionModel } from '@angular/cdk/collections';
//import { ToastrService } from 'ngx-toastr';
//import SupplierApplication from './supplier-application.model';
//import { SupplierApplicationService } from './supplier-application.service';
//import { NotificationService } from '../../../service/CommonMessage/notification.service';


//import { ActivatedRoute, Router } from '@angular/router';
//import { take } from 'rxjs/operators';


@Component({
    selector: 'app-dealerlist',
    templateUrl: './dealerlist.component.html',
    styleUrls: ['./dealerlist.component.scss']
})
export class DealerlistComponent implements OnInit {

    //productDialog: boolean;

    //products: Product[];

    //product: Product;

    //selectedProducts: Product[];

    //submitted: boolean;

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
    dealerVerificationList = [];


    selectedVerification: any;
    rowDataVerification: any;
    onRowUnselectData: any;
    dealerVerificationIndex: any;
    rowData: any;
    rowSelected: boolean;

    //constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private dealerlistService: DealerListService) {

    //}


    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private router: Router, private dealerlistService: DealerListService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {

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
        const dealerassignData = this.dealerassignForm.value;

        for (let i = 0; i < this.selecteddealerinfo.length; i++) {
            let dealerInfoId = this.selecteddealerinfo[i].DealerInfoId;
            let deptId = this.dealerassignForm.value.department_id;
            let employeeId = this.dealerassignForm.value.employee_id;
            const dealerAssignObj = { dealer_info_id: dealerInfoId, department_id: deptId, employee_id: employeeId}
            this.dealerVerificationList.push(dealerAssignObj);
        }
        dealerassignData.DealerAssignSession = this.dealerVerificationList;



        if (this.isDealerVerificationEdit) {
            //data.dealerinfoId = this.rowData.DealerInfoId;
            //formData.append("dealer_info_id", this.rowData.DealerInfoId);
            this.dealerlistService.updateDealerVerification(dealerassignData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                //if (result.MessageType == 1) {
                //    this.dealerVerificationList.splice(this.dealerVerificationList.findIndex(item => item.dealerInfoId === dealerassignData.dealerInfoId), 1);
                //    this.dealerVerificationList.unshift(result.Data);
                //    this.selectedVerification = result.Data;
                //    this.rowDataVerification = result.Data;
                //    this.onRowUnselectData(event);
                //    this.dealerVerificationIndex();
                //    this.isDealerVerificationEdit = false;
                //    this.submitted = false;
                //    this.dealerassignForm.reset();
                //    this.ngOnInit();
                //}
            });
            //this.gridDisplayCredit = false;
            //this.formDisplayCredit = true;
        }
        else {
    /*        formData.append("dealer_info_id", this.rowData.DealerInfoId);*/
            this.dealerlistService.createDealerVerification(dealerassignData).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                //if (result.MessageType == 1) {
                //    this.dealerVerificationList.splice(this.dealerVerificationList.findIndex(item => item.dealerInfoId === dealerassignData.dealerInfoId), 1);
                //    this.dealerVerificationList.unshift(result.Data);
                //    this.selectedVerification = result.Data;
                //    this.rowDataVerification = result.Data;
                //    this.onRowUnselectData(event);
                //    this.dealerVerificationIndex();
                //    this.isDealerVerificationEdit = false;
                //    this.submitted = false;
                //    this.dealerassignForm.reset();
                //    this.ngOnInit();
                //}
            });
            //this.gridDisplayCredit = false;
            //this.formDisplayCredit = true;
        }

    }

    findIndexById(id: string): number {
        debugger
        let index = -1;
        for (let i = 0; i < this.dealerinfoList.length; i++) {
            if (this.dealerinfoList[i].DealerInfoId === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}


