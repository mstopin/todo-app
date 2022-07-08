import { Type, Static } from '@sinclair/typebox';

export const registerUserSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
});

export type RegisterUserPayloadType = Static<typeof registerUserSchema>;
