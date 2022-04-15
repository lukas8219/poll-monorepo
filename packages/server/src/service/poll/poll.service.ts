import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePollDTO, PollDTO } from 'src/data/poll.dto';
import { UserPrincipal } from 'src/decorators/principal';
import { PollAttributes } from 'src/model/poll.model';
import { PollRepository } from 'src/repository/poll.repository';

@Injectable()
export class PollService {
  constructor(private repository: PollRepository) {}

  async save(
    poll: CreatePollDTO,
    userPrincipal: UserPrincipal,
  ): Promise<PollDTO> {
    return this.repository.save({
      ...poll,
      createdBy: userPrincipal.id,
      createdAt: new Date(),
    });
  }

  async getAll(): Promise<any> {
    const data = await this.repository.findAll();
    return data;
  }

  async getById(id: number): Promise<PollDTO> {
    const poll = await this.repository.findById(id);
    if (poll) {
      return poll;
    } else {
      throw new NotFoundException('poll.not.found');
    }
  }
}
