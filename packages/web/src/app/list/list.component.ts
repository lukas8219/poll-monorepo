import { Component, OnInit } from '@angular/core';
import { PollService } from '../service/poll/poll.service';
import { UserDTO, UserService } from '../service/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public user: UserDTO;

  public entries: any;

  constructor(
    userService: UserService,
    private readonly pollService: PollService
  ) {
    this.user = userService.getUser();
  }

  async ngOnInit(): Promise<void> {
    this.entries = (await this.pollService.getPollList()) || [];

    this.pollService.subscribe(async (poll) => {
      this.entries = await poll;
    });
  }
}
