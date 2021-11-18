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

