import { Component, NgModule } from '@angular/core';
import { AlertService } from './service/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(){}

  get authenticated(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }
}
