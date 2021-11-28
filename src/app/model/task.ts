import {Attachment} from "./resource";

export interface Task extends CreateTask {
  id: number;
  storyPoints: string | number;
  status: string;
}

export interface RealizeTask {
  idTask: number;
  status: string;
}

export interface CreateTask {
  title: string;
  description: string;
  priority: string;
}

export interface Subtasks {
  tasks: CreateTask[];
}

export interface CreateUserStory {
  title: string,
  description: string,
  priority: PriorityStatus,
}

export interface UpdateUserStory {
  id: number,
  title: string,
  description: string,
  priority: PriorityStatus,
  storyPoints: number;
}

export interface UserStory {
  id: number,
  title: string,
  description: string,
  priority: PriorityStatus,
  statusIssue: StatusIssue,
  storyPoints: number;
  team: string;
  attachments: Attachment[];
}

export interface PBICommand {
  id: number,
  title: string,
  description: string,
  priority: PriorityStatus,
  statusIssue: StatusIssue,
  storyPoints: number;
  attachments: Attachment[];
}

export interface CreateIssue {
  idTeam: number,
  title: string,
  description: string,
  priority: PriorityStatus,
  statusIssue: StatusIssue,
  typeIssue: Type
}

export interface IssueCommand {
  id: number,
  title: string,
  description: string,
  priority: PriorityStatus,
  statusIssue: StatusIssue,
  storyPoints: number;
  typeIssue: Type;
  idUserStory: number;
  titleUserStory: number;
  assignCommands: AssignCommand[];
  attachments: Attachment[];
}

export interface AssignCommand {
  imageId: number,
  userId: number,
  username: string,
  surname: string
}

export enum StatusIssue {
  NEW = "NEW",
  TO_BE_IMPLEMENTED = "TO BE IMPLEMENTED",
  TO_DO = "TO DO",
  IN_PROGRESS = "IN PROGRESS",
  MERGE_REQUEST = "MERGE REQUEST",
  COMPLETED = "COMPLATED"
}

export enum NameColumnScrumBoard {
  PBI = "PBI",
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  MERGE_REQUEST = "MERGE_REQUEST",
  COMPLETED = "COMPLETED",
}

export enum PriorityStatus {
  SMALL = "SMALL",
  NORMAL = "NORMAL",
  SERIOUS = "SERIOUS",
  CRITICAL = "CRITICAL",
  BLOCKING = "BLOCKING"
}

export const PriorityStatusLabelMapping: Record<PriorityStatus, string> = {
  [PriorityStatus.SMALL]: "SMALL",
  [PriorityStatus.NORMAL]: "NORMAL",
  [PriorityStatus.SERIOUS]: "SERIOUS",
  [PriorityStatus.CRITICAL]: "CRITICAL",
  [PriorityStatus.BLOCKING]: "BLOCKING"
}

export enum Type {
  BUG = "BUG",
  COSMETICS = "COSMETICS",
  EXCEPTION = "EXCEPTION",
  FEATURE = "FEATURE",
  TASK = "TASK",
  USABILITY_PROBLEM = "USABILITY_PROBLEM",
  PERFORMANCE_PROBLEM = "PERFORMANCE_PROBLEM",
  META_ISSUE = "META_ISSUE",
  AUTO_REPORTED_EXCEPTION = "AUTO_REPORTED_EXCEPTION",
  SECURITY_PROBLEM = "SECURITY_PROBLEM",
  CONFIGURATION_PROBLEM = "CONFIGURATION_PROBLEM"
}


export const TypeLabelMapping: Record<Type, string> =  {
  [Type.BUG]: "BUG",
  [Type.COSMETICS]: "COSMETICS",
  [Type.EXCEPTION]: "EXCEPTION",
  [Type.FEATURE]: "FEATURE",
  [Type.TASK]: "TASK",
  [Type.USABILITY_PROBLEM]: "USABILITY_PROBLEM",
  [Type.PERFORMANCE_PROBLEM]: "PERFORMANCE_PROBLEM",
  [Type.META_ISSUE]: "META_ISSUE",
  [Type.AUTO_REPORTED_EXCEPTION]: "AUTO_REPORTED_EXCEPTION",
  [Type.SECURITY_PROBLEM]: "SECURITY_PROBLEM",
  [Type.CONFIGURATION_PROBLEM]: "CONFIGURATION_PROBLEM"
}


