import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private notifyService: NotificationService, private dealerlistService: DealerListService) {

    }

    ngOnInit(): void {
        this.dealerlistService.getAllDealerInfoList().subscribe(data => this.dealerinfoList = data);

  }

}
