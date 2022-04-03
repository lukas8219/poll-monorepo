import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private alert : AlertService) {}

  authenticate(data: any, form : FormGroup) {
    return this.http
      .post<LoginData>('http://localhost:8080/v1/authenticate', data, {})
      .subscribe({
        next: (data: LoginData) => {
          const { user, token }: { user: User; token: TokenData } = data;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
        },
        error: (response) => {
          const error : Error = response.error;

          if(error.statusCode === 400){
            for(const err  of error.message ){
              const field = form.get(err.property);
              field?.setErrors({
                validation: err.message
              });
            }
          }

          if(error.statusCode === 422){
            this.alert.alert(error.message as unknown as  string);
          }
        }
      });
  }
}

const VALIDATION_KEY = 'validation';
export { VALIDATION_KEY };

export interface LoginData {
  user: User;
  token: TokenData;
}

interface User {
  email: string;
  name: string;
  id: number;
}

interface TokenData {
  token: string;
}

interface ValidationErrorMessage {
  property: string;
  message: string;
}

interface Error {
  statusCode: number;
  message: ValidationErrorMessage[]
  error: string;
}
