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
}

export interface UpdateProject extends Project {
  accessCode: string;
  description: string;
  productOwner: string;
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  username: string;
}

export interface JoinProject {
  name: string,
  accessCode: string
}
