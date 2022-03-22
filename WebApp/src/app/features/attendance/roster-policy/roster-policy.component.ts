import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { RosterPolicyService } from './roster-policy.service';

@Component({
  selector: 'app-roster-policy',
  templateUrl: './roster-policy.component.html',
  styleUrls: ['./roster-policy.component.scss']
})
export class RosterPolicyComponent implements OnInit {
    rosterPolicyForm: FormGroup;
    submitted = false;
    selectedPolicy: any;
    rosterPolicies: any[];
    selectedRostercycle: any;
    allRosterCycle: any[];
    rosterDetails: any[] = [];
    selectedShift: any;
    selectedNextShift: any;
    allShifts: any[];
    rowData: any;
    rowSelected: boolean = false;
    isRosterEdit: boolean = false;
    displayApprove: boolean = false;
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
    // for delete data modal
    display: boolean = false;
    showDialog() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        else
            this.display = true;
    }
    constructor(private formbulider: FormBuilder, private RosterPolicyService: RosterPolicyService, private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.rosterPolicyForm = this.formbulider.group({
   
            roster_policy_name: [null, [Validators.required]],
            next_shift_id: [null, [Validators.required]],
            shift_id: [null, [Validators.required]],
            roster_cycle: [null, [Validators.required]],
            

        });
        this.loadAllRosterPolicy();
        this.loadAllShift();
        this.loadAllRosterCycle();
    }
    onRowSelect(event) {
        this.rowSelected = true;
        this.rowData = event.data;


    }
    onRowUnselect(event) {
        this.rowSelected = false;
        this.rowData = null;


    }
    approveConfirm() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved");
        }
        else
            this.displayApprove = true;
    }
    showBasicDialog() {
        // this.displayBasic = true;
        this.toggleGridDisplay();
        this.rosterPolicyForm.reset();
    }
    //for validation messate -----------

    get f(): { [key: string]: AbstractControl } {
        return this.rosterPolicyForm.controls;
    }
    loadAllRosterPolicy() {
        this.RosterPolicyService.getAllRosterPolicy().subscribe(data => {
            this.rosterPolicies = data;
        });
    }
    loadAllShift() {
        this.RosterPolicyService.getShiftForDP().subscribe(data => {
            this.allShifts = data;
        });
    }
    loadAllRosterCycle() {

        this.allRosterCycle = [
            { name: '7', roster_cycle: 7 },
            { name: '10', roster_cycle: 10 },
            { name: '15', roster_cycle: 15 },
            { name: '30', roster_cycle: 30 }
        ];
    }
    addRosterDetails() {
        this.submitted = true;

        if (this.rosterPolicyForm.invalid) {
            return;
        }
        let roster_policy_name = this.rosterPolicyForm.get('roster_policy_name')?.value;
        let shift_id = this.rosterPolicyForm.get('shift_id')?.value.shift_id;

        let shift_name = (this.rosterPolicyForm.get('shift_id')?.value.shift_name);
        let next_shift_id = this.rosterPolicyForm.get('next_shift_id')?.value.shift_id;

        let next_shift_name = (this.rosterPolicyForm.get('next_shift_id')?.value.shift_name)
        
        if (shift_id === next_shift_id) {
            return this.notifyService.ShowNotification(2, "Shift and Next Shift can't be same");
        }
        if (this.dataExist(shift_id, next_shift_id)) {
            return this.notifyService.ShowNotification(2, "Selected shift already added")
        }

        const rosterDetailsObj = {
            shift_id: shift_id,
            next_shift_id: next_shift_id,
            roster_policy_id: 0,
            roster_policy_detail_id:0,
            shift_name: shift_name,
            next_shift_name: next_shift_name
        }


        if (this.isRosterEdit) {
           
            let roster_policy_id = this.rowData.roster_policy_id;
            rosterDetailsObj.roster_policy_id = roster_policy_id;
            alert(roster_policy_id)

            this.RosterPolicyService.createRosterDetails(rosterDetailsObj).subscribe(data => {
                console.log(data.Data[0])
                if (data.MessageType == 1) {
                  this.rosterPolicies.unshift(data.Data[0]);
                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {

      

            this.rosterDetails.push(rosterDetailsObj);
        }
    }

    // ...

    dataExist(shift_id, next_shift_id) {

        return this.rosterDetails.some(function (el) {
            return el.shift_id === shift_id && el.next_shift_id === next_shift_id;
        });
    }
    removeEvent(a, row) {
        if (this.isRosterEdit) {
            let roster_policy_id = this.rowData.roster_policy_id;


            this.RosterPolicyService.deleteRosterDetails(row.roster_policy_detail_id).subscribe(data => {

                if (data.MessageType == 1) {
                    this.rosterPolicies.splice(this.rosterPolicies.findIndex(item => item.roster_policy_detail_id === row.roster_policy_detail_id), 1);

                }
                this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
            });
        }
        else {
            this.rosterDetails = this.rosterDetails.slice(0, a).concat(this.rosterDetails.slice(a + 1));
        }


    }

    loadRosterPolicyToEdit() {


        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }

        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't edit this.");
        }
        //this.resetForm();
        let roster_policy_id = this.rowData.roster_policy_id;

        this.RosterPolicyService.getRosterDetailsById(roster_policy_id).subscribe(res => {

            this.rosterDetails=res;

        });

        this.RosterPolicyService.getRosterPolicyById(roster_policy_id).subscribe(data => {

            this.rosterPolicyForm.controls['roster_policy_name'].setValue(data.roster_policy_name);
            this.rosterPolicyForm.controls['roster_cycle'].setValue(data.roster_cycle);
            this.isRosterEdit = true;
        });

        this.toggleGridDisplay();
    }

    deleteRoster() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }


        if (this.rowData.ApprovedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved, you can't delete this.");
        }

        let roster_policy_id = this.rowData.roster_policy_id;
        this.RosterPolicyService.delete(roster_policy_id).subscribe(data => {


            if (data.MessageType == 1) {
                this.rosterPolicies.splice(this.rosterPolicies.findIndex(item => item.roster_policy_id === roster_policy_id), 1);
            }
            this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
        });
        //this.display = false;
    }
    policyApprove() {
        if (this.rowData == null) {
            return this.notifyService.ShowNotification(3, 'Please select row');
        }
        if (this.rowData.approvedBy) {
            return this.notifyService.ShowNotification(3, "This policy already approved.");
        }
        let roster_policy_id = this.rowData.roster_policy_id;
        this.RosterPolicyService.approve(roster_policy_id).subscribe(
            result => {
                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    this.rosterPolicies.splice(this.rosterPolicies.findIndex(item => item.roster_policy_id === roster_policy_id), 1);
                    this.rosterPolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.displayApprove = false;
                }
            }
        );
    }

    saveRosterPolicy() {
        const data = this.rosterPolicyForm.value;
      
        this.submitted = true;

        if (this.rosterPolicyForm.invalid) {
            return;
        }
        if (this.isRosterEdit) {

            data.roster_policy_id = this.rowData.roster_policy_id;
            this.RosterPolicyService.update(data).subscribe(result => {

                this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
                if (result.MessageType == 1) {
                    //this.clear();
                    this.rosterPolicies.splice(this.rosterPolicies.findIndex(item => item.roster_policy_id === data.roster_policy_id), 1);
                    this.rosterPolicies.unshift(result.Data[0]);
                    this.selectedPolicy = result.Data[0];
                    this.rowSelected = true;
                    this.rowData = result.Data[0];
                    this.toggleFormDisplay();
                }


            });
        }
        else {

            data.rosterDetails = this.rosterDetails;
            this.RosterPolicyService.create(JSON.stringify(data)).subscribe(
                result => {
                    if (result.MessageType == 1) {
                        //this.clear();
                        this.rosterPolicies.unshift(result.Data[0]);
                        this.selectedPolicy = result.Data[0];
                        this.rowSelected = true;
                        this.rowData = result.Data[0];
                        this.toggleFormDisplay();
                    }
                    this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);

                }
            );
        }



    }
}
