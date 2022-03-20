import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import KeySkill from './key-skill.model';
import { KeySkillService } from './key-skill.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';

@Component({
  selector: 'app-key-skill',
  templateUrl: './key-skill.component.html',
  styleUrls: ['./key-skill.component.css'],  
})
export class KeySkillComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  keySkillForm: any;
  allKeySkill: Observable<KeySkill[]>;
  selection = new SelectionModel<KeySkill>(true, []);
  keySkillIdUpdate = null;
  companyCorporateId = null;
  massage = null;
  displayedColumns: string[] = ['KeySkillName', 'Remarks'];
  selectedCompanyCorporate: KeySkill;
  allCompanyCorporate: KeySkill[];


  selectedKeySkill: KeySkill;
  keySkills: KeySkill[];
  first = 0;
  rows = 10;

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
    this.displayBasic = true;
    this.resetForm();
  }


  constructor(private formbulider: FormBuilder, private KeySkillService: KeySkillService, private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.KeySkillService.getAllKeySkill().subscribe(data => this.keySkills = data);

    this.keySkillForm = this.formbulider.group({
      key_skill_name: [null, [Validators.required]],
      remarks: [null, [Validators.required]],

    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.keySkills ? this.first === (this.keySkills.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.keySkills ? this.first === 0 : true;
  }

  
  selectRow(keySkill) {
    this.rowData = keySkill;
  }

  loadKeySkillToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let keySkillId = this.rowData.key_skill_id;
    this.KeySkillService.GetKeySkillById(keySkillId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.keySkillIdUpdate = data.key_skill_id;
      this.companyCorporateId = data.company_corporate_id;
      this.keySkillForm.controls['key_skill_name'].setValue(data.key_skill_name);
      this.keySkillForm.controls['remarks'].setValue(data.remarks);

    });
    this.displayBasic = true;
  }

  deleteKeySkillInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let keySkillId = this.rowData.key_skill_id;
    this.KeySkillService.DeleteKeySkill(keySkillId).subscribe(data => {
      this.massage = null;
      this.loadAllKeySkills();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllKeySkills() {
    this.KeySkillService.getAllKeySkill().subscribe(data => {
      this.keySkills = data;


    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    const keySkilldata = this.keySkillForm.value;
    if (!(keySkilldata.key_skill_name)) {
      return this.notifyService.ShowNotification(2, "Please enter key skill name")
    }
    this.CreateKeySkill(keySkilldata);
    this.keySkillForm.reset();
  }

  resetForm() {
    this.keySkillForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllKeySkills();
  }
  
  CreateKeySkill(keySkilldata: any) {

    if (this.keySkillIdUpdate == null) {

      this.KeySkillService.CreateKeySkill(keySkilldata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllKeySkills();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
          this.keySkillIdUpdate = null;
          //this.keySkillForm.reset();
          this.displayBasic = false;
        }
      );
    } else {
      keySkilldata.key_skill_id = this.keySkillIdUpdate;
      keySkilldata.company_corporate_id = this.companyCorporateId;

      this.KeySkillService.UpdateKeySkill(keySkilldata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllKeySkills();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.keySkillIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }

}
