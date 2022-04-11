import { Component, OnInit } from '@angular/core';
import { UserDTO, UserService } from '../service/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public user: UserDTO;

  constructor(private readonly userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {}
}
