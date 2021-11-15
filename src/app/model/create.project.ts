import {JoinProject} from "./join.project";

export interface CreateProject extends JoinProject {
  description: string;
  productOwner: string;
}
