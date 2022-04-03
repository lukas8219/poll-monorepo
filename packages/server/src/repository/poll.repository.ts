import { Injectable } from '@nestjs/common';
import { Poll, PollAttributes } from 'src/model/poll.model';

@Injectable()
export class PollRepository {
  async findById(id: number): Promise<Poll> {
    return Poll.findByPk(id);
  }

  async save(poll: PollAttributes): Promise<Poll> {
    return Poll.create({
      ...poll,
      createdAt: new Date(),
      createdBy: 1,
    });
  }

  async findAll(): Promise<Poll[]> {
    return Poll.findAll();
  }
}
