type TaskStatusKey = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';

export const getTaskColorClassName = (taskStatuskey: TaskStatusKey) => {
  return `task.${taskStatuskey.toLowerCase()}`;
}
