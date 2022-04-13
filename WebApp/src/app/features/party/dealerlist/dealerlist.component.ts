import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
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
    dealerassignForm: any;
    submitted = false;

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private dealerlistService: DealerListService) {

    }

    ngOnInit(): void {
        this.dealerlistService.getAllDealerInfoList().subscribe(data => this.dealerinfoList = data);


        //Load Dropdown
        this.loadAllDepartmentCboList();
        this.loadAllEmployeeCboList();

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

    onSaveDealerInfoAssign(): void {
        this.submitted = true;
    }

}
