import {Member} from "./member";
import {JoinTeam} from "./join.teams";

export interface CreateTeam extends JoinTeam {
  members: Member[]
}
