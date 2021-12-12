import {ScrumPokerService} from "../services/scrum-poker.service";

export class ScrumPokerCommand {
  idTeam: number

  constructor(idTeam: number) {
    this.idTeam = idTeam;
  }
}

export interface CreateScrumPoker {
  idCreator: number,
  invitedTeams: number[],
  invitedMembers: number[]
}


export interface ScrumPoker {
  idScrumPoker: string,
  idCreator: number,
  members: number[],
  tasks: TaskCommand[],
  scrumPokerStatus: ScrumPokerStatus,
  individualEstimation: TeamVote[],
  currentTask: number
}

export interface TeamVote {
  idUser: number,
  estimation: string
}
export interface TaskCommand {
  idTask: number,
  typeTask: TypeTask
}

export enum TypeTask {
  ISSUE = "ISSUE",
  USER_STORY = "USER_STORY"
}

export enum ScrumPokerStatus {
  NEW = "NEW",
  IN_PROCESS_ESTIMATION = "IN PROCESS ESTIMATION",
  ENDED = "ENDED"
}

export interface JoinScrumPoker {
  idScrumPoker: string,
  idUser: number
}

export interface ChangeEstimationStatus {
  idTask: number,
  idScrumPoker: string
}

export interface VoteCommand {
  estimation: string,
  idUser: number,
  idTask: number,
  idScrumPoker: string
}

export interface ResultEstimation {
  idTask: number,
  idScrumPoker: string,
  estimation: TeamVote[],
  resultEstimation: string
}
