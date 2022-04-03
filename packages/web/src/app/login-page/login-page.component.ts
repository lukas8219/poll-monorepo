import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService, LoginData } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService
  ) {}

  ngOnInit(): void {
  }

  loginForm : FormGroup = this.formBuilder.group({
    email: '',
    password: '',
  });

  logIn() {
    const data = this.loginForm.value;
    this.service.authenticate(data, this.loginForm);
  }

  hasErrors(field : string){
    return this.loginForm.get(field)?.hasError('validation');
  }

  getError(field : string) : string{
    return this.loginForm.get(field)?.getError('validation');
  }

  getClassName(className : string, fieldName : string) : string {
    if(this.hasErrors(fieldName)){
      return `${className} invalid`
    }
    return className;
  }
}
