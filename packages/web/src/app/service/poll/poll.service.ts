import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private client: HttpClient) {}

  private pollListUpdate = new EventEmitter<any>();

  async getPollList() {
    return firstValueFrom(this.client.get(`http://localhost:8080/v1/poll`));
  }

  async savePoll(poll: any) {
    const data = await firstValueFrom(
      this.client.post(`http://localhost:8080/v1/poll`, poll)
    );
    this.pollListUpdate.emit(await this.getPollList());
    return data;
  }

  async updatePoll(poll: { id: any }) {
    const data = await firstValueFrom(
      this.client.put(`http://localhost:8080/v1/poll/${poll.id}`, poll)
    );
    this.pollListUpdate.emit(await this.getPollList());
    return data;
  }

  async deletePoll(poll: { id: any }) {
    const data = await firstValueFrom(
      this.client.delete(`http://localhost:8080/v1/poll${poll.id}`)
    );
    this.pollListUpdate.emit(await this.getPollList());
    return data;
  }

  subscribe(cb: (pollList: any) => void) {
    this.pollListUpdate.subscribe(cb);
  }
}
