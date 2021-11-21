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
  coverId: string;
}

export interface TeamInformation {
  id: number;
  name: string;
  accessCode: string;
  description: string;
  username: string;
  idCover: string;
}

export interface CreateTeam {
  teamName: string;
  accessCode: string;
  description: string;
  scrumMaster: number;
}

export interface JoinTeam {
  teamName: string;
  accessCode: string;
}

export interface JoinTeams {
  teams: JoinTeam[];
}

export interface UpdateTeam extends Team {
  accessCode: string
}
