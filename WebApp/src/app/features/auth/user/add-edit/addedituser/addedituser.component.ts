import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.css']
})
export class AddedituserComponent implements OnInit {

@Input() childdata = "child page";

  constructor() { }



  ngOnInit(): void {


    
  }

  



}
