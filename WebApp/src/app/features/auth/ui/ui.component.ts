import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  date6: Date;
  dates: Date[];
  minDate: Date;

  maxDate: Date;
  rangeDates: Date[];

  photourllink: string ="assets/images/logo-icon.png";
  selectFile(event){
      if(event.target.files){
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event:any)=>{
          this.photourllink = event.target.result;
          

        }
      }
    }
// file upload end


  value1: string;


  collapsed = true;

 
  constructor() {

  }
    ngOnInit(): void {

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  
  

  }

    



 toggle() {
    if (this.collapsed) {
      this.collapsed = false;
    }
    else {
      this.collapsed = true;
    }

  }



    // for file upload
    onSelectImage(event) {

    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.photourllink = event.target.result
        
      }
     
    }
  
  }
    // for file upload end

    
}
