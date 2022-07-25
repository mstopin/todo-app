import { TaskStatus } from "../../../../types/Task";

export const getTaskColorClassName = (taskStatus: TaskStatus) => {
  return `task.${taskStatus.toLowerCase()}`;
}

export const getTaskStatusDescription = (taskStatus: TaskStatus) => {
  return taskStatus.replace('_', ' ');
}
