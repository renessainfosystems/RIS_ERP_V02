import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../service/CommonMessage/notification.service';
import { SalaryHeadService } from './salary-head.service';

@Component({
  selector: 'app-salary-head',
  templateUrl: './salary-head.component.html',
  styleUrls: ['./salary-head.component.css']
})
export class SalaryHeadComponent implements OnInit {

  salaryHeadForm: any;
  salaryHeads: any[];
  selectedSalaryHead: any;
  salaryHeadTypes: any[];
  selectedSalaryHeadType: any;
  requiredFor: any[];
  selectedrequiredFor: any;
  salaryHeadEdit: boolean = false;
  rowData: any;
  // for delete data modal
  display: boolean = false;
  rowSelected: boolean = false;
  collapsed = true;
  collapsedList = false;
  header: any = "New Salary Head";
  showDialog() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    if (this.rowData.ApprovedBy) {
      return this.notifyService.ShowNotification(3, "This policy already approved,you can't edit this policy");
    }
    else
      this.display = true;
  }
  constructor(private formbulider: FormBuilder, private notifyService: NotificationService, private salaryHeadService: SalaryHeadService) { }

  ngOnInit() {
    this.salaryHeadForm = this.formbulider.group({
      salary_head_name: [null, [Validators.required]],
      salary_head_short_name: [null, [Validators.required]],
      salary_head_type_id: ['', [Validators.required]],
      sorting_priority: ['', [Validators.required]],
      name_in_local_language: ['', [Validators.required]],
      remarks: ['', [Validators.required]]

    });
    this.loadSalaryHead();
    this.loadSalaryHeadType();
   
  }
  onRowSelect(event) {
    this.rowSelected = true;
    this.rowData = event.data;

  }
  onRowUnselect(event) {
    this.rowSelected = false;
    this.rowData = null;


  }
  btnNew() {
    this.resetForm();
    this.toggle();
  }
  loadSalaryHead() {
    this.salaryHeadService.getAllSalaryHead().subscribe(data => {

      this.salaryHeads = data;

    });
  }
  loadSalaryHeadType() {
    this.salaryHeadService.getSalaryHeadTypeForDP().subscribe(data => {

      this.salaryHeadTypes = data;

    });
  }

  deleteSalaryHead() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }


    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

    let salary_head_id = this.rowData.salary_head_id;
    this.salaryHeadService.delete(salary_head_id).subscribe(data => {
      if (data.MessageType == 1) {
        this.salaryHeads.splice(this.salaryHeads.findIndex(item => item.salary_head_id === salary_head_id), 1);
      }
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }
  

  loadSalaryHeadToEdit() {


    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }

   
    this.resetForm();
    this.salaryHeadService.getSalaryHeadById(this.rowData.salary_head_id).subscribe(data => {

   
      this.salaryHeadForm.controls['salary_head_name'].setValue(data.salary_head_name);
      this.salaryHeadForm.controls['salary_head_short_name'].setValue(data.salary_head_short_name);
      this.salaryHeadForm.controls['salary_head_type_id'].setValue(data.salary_head_type_id);
      this.salaryHeadForm.controls['sorting_priority'].setValue(data.sorting_priority);
      this.salaryHeadForm.controls['name_in_local_language'].setValue(data.name_in_local_language);
      this.salaryHeadForm.controls['remarks'].setValue(data.remarks);
    this.salaryHeadEdit = true;
    });
    this.header = "Edit Salary Head";

    this.toggle();
    //this.displayBasic = true;
  }
  saveSalaryHead() {
    const data = this.salaryHeadForm.value;

    if (!(data.salary_head_name)) {
      return this.notifyService.ShowNotification(2, "Please enter salary head name")
    }
    if (!(data.salary_head_short_name)) {
      return this.notifyService.ShowNotification(2, "Please enter salary head short name")
    }
    if (!(data.salary_head_type_id)) {
      return this.notifyService.ShowNotification(2, "Please select salary head type")
    }
    if (!(data.sorting_priority)) {
      return this.notifyService.ShowNotification(2, "Please enter sorting priority")
    }


    if (this.salaryHeadEdit) {

      data.salary_head_id = this.rowData.salary_head_id;
      this.salaryHeadService.update(data).subscribe(result => {

        
        if (result.MessageType == 1) {
          this.clear();
          this.salaryHeads.splice(this.salaryHeads.findIndex(item => item.salary_head_id === data.salary_head_id), 1);
          this.salaryHeads.unshift(result.Data);
          this.selectedSalaryHead = result.Data;
          this.rowSelected = true;
          this.rowData = result.Data;
        }
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
      
      });
    }
    else {

      this.salaryHeadService.create(data).subscribe(
        result => {
          if (result.MessageType == 1) {
            this.clear();
            this.salaryHeads.unshift(result.Data);
            this.selectedSalaryHead = result.Data;
            this.rowSelected = true;
            this.rowData = result.Data;
          }
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
         
        }
      );
    }

    // this.displayBasic = false;

  }
  toggle() {
    if (this.collapsed) {
      this.collapsed = false;
      this.collapsedList = true;
    }
    else {
      this.collapsed = true;
      this.collapsedList = false;
    }

  }
  resetForm() {
    this.salaryHeadForm.reset();
    this.salaryHeadEdit = false;
    this.header = "New Salary Head";

  }
  clear() {
    this.resetForm();
    this.toggle();
  }

}
