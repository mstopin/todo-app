import { Type, Static } from '@sinclair/typebox';

const TaskParamsSchema = {
  getTask: Type.Object({
    taskId: Type.String(),
  }),

  updateTask: Type.Object({
    taskId: Type.String(),
  }),
};

const TaskBodySchema = {
  createTask: Type.Object({
    content: Type.String(),
    description: Type.Optional(Type.String()),
  }),

  updateTask: Type.Object({
    content: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    status: Type.Optional(Type.Union([
      Type.Literal('NEW'),
      Type.Literal('IN_PROGRESS'),
      Type.Literal('COMPLETED'),
    ])),
  }),
};

export type GetTaskParamsPayloadType = Static<typeof TaskParamsSchema['getTask']>;

export type CreateTaskBodyPayloadType = Static<typeof TaskBodySchema['createTask']>;

export type UpdateTaskParamsPayloadType = Static<typeof TaskParamsSchema['updateTask']>;
export type UpdateTaskBodyPayloadType = Static<typeof TaskBodySchema['updateTask']>;

export { TaskParamsSchema, TaskBodySchema };
