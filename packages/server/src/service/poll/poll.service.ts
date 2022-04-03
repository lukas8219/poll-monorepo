import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreatePollDTO, PollDTO } from 'src/data/poll.dto';
import { UserPrincipal } from 'src/decorators/principal';
import { PollRepository } from 'src/repository/poll.repository';

@Injectable()
export class PollService {
  constructor(private repository: PollRepository) {}

  async save(poll: CreatePollDTO, userPrincipal : UserPrincipal): Promise<PollDTO> {
    return this.repository.save({
      ...poll,
      createdBy: userPrincipal.id,
      createdAt: new Date(),
    });
  }

  async getAll(): Promise<PollDTO[]> {
    return this.repository.findAll();
  }

  async getById(id: number): Promise<PollDTO> {
    const poll = await this.repository.findById(id);
    if (poll) {
      return poll;
    } else {
      throw new NotFoundException("poll.not.found");
    }
  }
}
