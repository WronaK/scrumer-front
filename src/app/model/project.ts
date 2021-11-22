import {Attachment} from "./resource";

export interface Project {
  id: number;
  name: string;
}

export interface CreateProject {
  projectName: string;
  accessCode: string;
  description: string;
  productOwner: number;
}

export interface ProjectInformation {
  id: number;
  name: string;
  accessCode: string;
  description: string;
  username: string;
  coverId: number;
  attachments: Attachment[];
}

export interface UpdateProject {
  id: number;
  projectName: string;
  accessCode: string;
  description: string;
  productOwner: number;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  username: string;
  coverId: number;
}

export interface JoinProject {
  idProject: number;
  accessCode: string
}

export interface SuggestedProject {
  name: string;
  id: number;
}
