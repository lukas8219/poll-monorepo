import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert(message : string){
    const alertBox : HTMLCollectionOf<Element> = document.getElementsByClassName('alert-box');
    alertBox[0]?.classList.add('visible')

    const alertText : HTMLElement | null = document.getElementById('alert-text');
    if(alertText){
      alertText.innerText = message;
    }
  }

  clearAlert(){
    const alertBox : HTMLCollectionOf<Element> = document.getElementsByClassName('alert-box');
    alertBox[0]?.classList.remove('visible')
  }
}
