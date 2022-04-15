import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePollDTO, PollDTO } from 'src/data/poll.dto';
import { Principal, UserPrincipal } from 'src/decorators/principal';
import { PollService } from 'src/service/poll/poll.service';

@Controller('v1/poll')
export class PollController {
  constructor(private service: PollService) {}

  @Get()
  async getAll(): Promise<PollDTO[]> {
    return this.service.getAll();
  }

  @Post()
  async create(
    @Body() body: CreatePollDTO,
    @Principal() user: UserPrincipal,
  ): Promise<PollDTO> {
    return this.service.save(
      {
        subject: body.subject,
        expiresAt: body.expiresAt,
        description: body.description,
      },
      user,
    );
  }

  @Get(':id')
  async getById(
    @Param('id') id: number,
    @Principal() principal: UserPrincipal,
  ): Promise<PollDTO> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('Invalid input!');
    }
    return this.service.getById(id);
  }
}
