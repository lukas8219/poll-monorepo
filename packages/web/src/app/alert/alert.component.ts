import { Component, OnInit } from '@angular/core';
import { AlertService } from '../service/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private alertService : AlertService) { }

  ngOnInit(): void {
  }

  closeAlert(){
    this.alertService.clearAlert();
  }

}
