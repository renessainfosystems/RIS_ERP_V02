import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import Currency from './currency.model';
import { CurrencyService } from './currency.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../service/CommonMessage/notification.service';



@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  
})
export class CurrencyComponent implements OnInit {

  rowData: any;
  dataSaved = false;
  currencyForm: any;
  allCurrency: Observable<Currency[]>;
  selection = new SelectionModel<Currency>(true, []);
  currencyIdUpdate = null;
  massage = null;
  displayedColumns: string[] = ['CurrencyName', 'Remarks'];

  selectedCountry: Currency;
  allCountry: Currency[];

  selectedCurrency: Currency;
  currencys: Currency[];
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


  constructor(private formbulider: FormBuilder, private CurrencyService: CurrencyService,  private toastr: ToastrService, private notifyService: NotificationService) {

  }

  ngOnInit(): void {

    this.CurrencyService.getAllCurrency().subscribe(data => this.currencys = data);

    this.currencyForm = this.formbulider.group({
      countryObj: [null, [Validators.required]],
      currency_name: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      issue_organization: [null, [Validators.required]],
      symbol: [null, [Validators.required]],

    });
    this.loadAllCountryCboList();
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
    return this.currencys ? this.first === (this.currencys.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.currencys ? this.first === 0 : true;
  }

  loadAllCountryCboList() {
    this.CurrencyService.getAllCountryCboList().subscribe(data => {
      this.allCountry = data;
    });
  }

  
  selectRow(currency) {
    this.rowData = currency;
  }

  loadCurrencyToEdit() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let currencyId = this.rowData.currency_id;
    this.CurrencyService.GetCurrencyById(currencyId).subscribe(data => {
      this.massage = null;
      this.dataSaved = false;
      this.currencyIdUpdate = data.currency_id;
      this.currencyForm.controls['countryObj'].setValue(data.country_id);
      this.currencyForm.controls['currency_name'].setValue(data.currency_name);
      this.currencyForm.controls['issue_organization'].setValue(data.issue_organization);
      this.currencyForm.controls['symbol'].setValue(data.symbol);

    });
    this.displayBasic = true;
  }

  deleteCurrencyInfo() {
    if (this.rowData == null) {
      return this.notifyService.ShowNotification(3, 'Please select row');
    }
    let currencyId = this.rowData.currency_id;
    this.CurrencyService.DeleteCurrency(currencyId).subscribe(data => {
      this.massage = null;
      this.loadAllCurrencys();
      this.notifyService.ShowNotification(data.MessageType, data.CurrentMessage)
    });
    this.display = false;
  }

  loadAllCurrencys() {
    this.CurrencyService.getAllCurrency().subscribe(data => {
      this.currencys = data;


    });
  }

  onFormSubmit() {    
    this.dataSaved = false;
    const currencydata = this.currencyForm.value;    
    this.currencyFormValidation(currencydata);    
    currencydata.country_id = currencydata.countryObj;
    this.CreateCurrency(currencydata);
    
  }

  currencyFormValidation(currencydata) {
    if (currencydata.countryObj == null) {
      return this.notifyService.ShowNotification(3, 'Country is required');
    }
    else if (currencydata.currency_name == null) {
      return this.notifyService.ShowNotification(3, 'Currency name is required');
    }
    else if (currencydata.issue_organization == null) {
      return this.notifyService.ShowNotification(3, 'Issue Organization is required');
    }
    else if (currencydata.symbol == null) {
      return this.notifyService.ShowNotification(3, 'Symbol name is required');
    }
  }

  resetForm() {
    this.currencyForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadAllCurrencys();
  }
  
  CreateCurrency(currencydata: any) {

    if (this.currencyIdUpdate == null) {

      this.CurrencyService.CreateCurrency(currencydata).subscribe(
        result => {
          this.dataSaved = true;
          this.loadAllCurrencys();
          this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);          
          this.currencyIdUpdate = null;          
          //this.resetForm();
          this.displayBasic = true;
        }
      );
    } else {
      currencydata.currency_id = this.currencyIdUpdate;

      this.CurrencyService.UpdateCurrency(currencydata).subscribe(result => {
        this.dataSaved = true;
        this.loadAllCurrencys();
        this.notifyService.ShowNotification(result.MessageType, result.CurrentMessage);
        this.currencyIdUpdate = null;
        this.displayBasic = false;
      });
    }
  }


}

