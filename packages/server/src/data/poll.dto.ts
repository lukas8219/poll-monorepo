import {
  ShouldNotBeEmpty,
  ShouldContainText,
} from 'src/validation/validationDelegate';

export class CreatePollDTO {
  @ShouldNotBeEmpty('poll.create.subject.notEmpty')
  subject: string;
  @ShouldContainText('poll.create.description.notEmpty')
  description: string;
  @ShouldContainText('poll.create.expiresAt.notNull')
  expiresAt: Date;
}

export enum PollResultEnum {
  APPROVED,
  REFUSED,
  OCCURRING,
  TIED,
}

export class PollDTO {
  id?: Number;
  subject: string;
  description: string;
  expiresAt: Date;
  createdAt?: Date;

  usersVotes?: UserVoteDTO[];
  favor?: Number;
  against?: Number;
  result?: PollResultEnum;

  creator?: PollCreatorDetailsDTO;
}

export interface PollCreatorDetailsDTO {}

export interface PollVoteDTO {}

export interface UserVoteDTO {}
