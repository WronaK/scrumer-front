import {IssueCommand, PBICommand} from "./task";

export interface SprintBacklog {
  tasksPBI: PBICommand[],
  tasksToDo: IssueCommand[],
  tasksInProgress: IssueCommand[],
  tasksMergeRequest: IssueCommand[],
  tasksDone: IssueCommand[],
}
