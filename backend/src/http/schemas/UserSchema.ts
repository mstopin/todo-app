import { Type, Static } from '@sinclair/typebox';

const UserSchema = {
  registerUser: Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }),
};

export type RegisterUserPayloadType = Static<typeof UserSchema['registerUser']>;

export default UserSchema;
