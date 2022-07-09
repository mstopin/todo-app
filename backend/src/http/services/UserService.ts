import bcrypt from 'bcryptjs';

import UserModel from '../../models/UserModel';

interface RegisterUserDTO {
  email: string;
  password: string;
}

const UserService = {
  registerUser: async (registerUserDTO: RegisterUserDTO) => {
    const { email, password } = registerUserDTO;

    const exactEmailUser = await UserModel.findOne({ email });
    if (exactEmailUser) {
      throw new Error('Email is already registered');
    }
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { insertedId: newUserId } = await UserModel.insertOne({
        email,
        password: hashedPassword,
        tasks: [],
      });

      return {
        _id: newUserId,
        email,
      };
    } catch {
      throw new Error('Could not register user');
    }
  },
};

export default UserService;
