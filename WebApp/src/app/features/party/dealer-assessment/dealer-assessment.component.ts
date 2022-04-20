import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { DealerAssessmentService } from './dealer-assessment.service';

@Component({
  selector: 'app-dealer-assessment',
  templateUrl: './dealer-assessment.component.html',
  styleUrls: ['./dealer-assessment.component.scss']
})
export class DealerAssessmentComponent implements OnInit {
    dealerAssessmentList: any[];
    selecteddealerAssessment: any;
    gridDisplay = false;
    rowData: any;
    rowSelected: boolean;

    constructor(private formbulider: FormBuilder, private confirmationService: ConfirmationService, private router: Router, private dealerAssessmentService: DealerAssessmentService, private toastr: ToastrService, private notifyService: NotificationService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.dealerAssessmentService.getAllDealerVerification().subscribe(data => this.dealerAssessmentList = data);
    }

    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;

    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;
    }

}
