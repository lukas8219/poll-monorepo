import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private alert : AlertService) { }

  ngOnInit(): void {
  }

  openAlert(){
    this.alert.alert('This is an alert')
  }

}
