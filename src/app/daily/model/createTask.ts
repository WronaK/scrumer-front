export interface CreateTask {
  userId: number,
  teamId: number,
  titleTask: String,
  typeTask: TypeTask,
  taskId: number
}

export enum TypeTask {
  ISSUE = "ISSUE",
  USER_STORY = "USER_STORY",
  TASK = "TASK"
}

export interface Daily {
  idTeam: number,
  elements: ElementDaily[]
}

export interface ElementDaily {
  idUser: number,
  username: String,
  yesterdayTasks: Tasks,
  todayTasks: Tasks
}

export interface Tasks {
  date: Date,
  tasks: Task[]
}

export interface Task {
  title: string,
  idTask: number,
  typeTask: TypeTask
}
