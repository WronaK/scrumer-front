import {IssueCommand, PBICommand} from "../../../project/user-story/model/task";

export interface SprintBacklog {
  tasksPBI: PBICommand[],
  tasksToDo: IssueCommand[],
  tasksInProgress: IssueCommand[],
  tasksMergeRequest: IssueCommand[],
  tasksDone: IssueCommand[],
}
