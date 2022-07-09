import { Type, Static } from '@sinclair/typebox';

const TaskSchema = {
  getTask: Type.Object({
    taskId: Type.String(),
  }),
  
  createTask: Type.Object({
    content: Type.String(),
    description: Type.Optional(Type.String()),
  }),
};

export type GetTaskPayloadType = Static<typeof TaskSchema['getTask']>;
export type CreateTaskPayloadType = Static<typeof TaskSchema['createTask']>;

export default TaskSchema;
