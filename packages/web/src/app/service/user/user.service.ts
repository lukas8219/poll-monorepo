import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(): UserDTO {
    const { email, name, id } = JSON.parse(localStorage.getItem('user') || '');
    return {
      email,
      name,
      id,
    };
  }
}

export interface UserDTO {
  email: string;
  name: string;
  id: number;
}
