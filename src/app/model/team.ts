import {Attachment} from "./resource";

export interface Team {
  id: number;
  name: string;
  description: string;
  username: string;
}

export interface TeamDetails {
  id: number;
  name: string;
  description: string;
  username: string;
  coverId: number;
}

export interface TeamInformation {
  id: number;
  name: string;
  accessCode: string;
  description: string;
  username: string;
  coverId: number;
  attachments: Attachment[];
}

export interface CreateTeam {
  teamName: string;
  accessCode: string;
  description: string;
  scrumMaster: number;
}

export interface JoinTeam {
  idTeam: number;
  accessCode: string;
}

export interface TeamData {
  name: string;
  accessCode: string;
}

export interface JoinTeams {
  teams: JoinTeam[];
}

export interface UpdateTeam {
  id: number;
  teamName: string;
  accessCode: string;
  description: string;
  scrumMaster: number;
}

export interface SuggestedTeam {
  name: string;
  id: number;
}
