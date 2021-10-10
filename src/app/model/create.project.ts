import {JoinTeam} from "./join.teams";
import {JoinProject} from "./join.project";

export interface CreateProject extends JoinProject {
  description: string;
  productOwner: string;
  scrumMaster: string;
  teams: JoinTeam[];
}
