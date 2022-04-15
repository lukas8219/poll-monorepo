import { Injectable, Logger } from '@nestjs/common';
import { Poll, PollAttributes } from 'src/model/poll.model';

@Injectable()
export class PollRepository {
  async findById(id: number): Promise<PollAttributes> {
    return (await Poll.findByPk(id)).toJSON();
  }

  async save(poll: PollAttributes): Promise<PollAttributes> {
    return Poll.create({
      ...poll,
      createdAt: new Date(),
      createdBy: 1,
    }).then((data) => data.toJSON());
  }

  async findAll(): Promise<PollAttributes[]> {
    const data = await Poll.findAll().then((itens) =>
      itens.map((i) => i.toJSON()),
    );
    Logger.log(data);
    return data;
  }
}
