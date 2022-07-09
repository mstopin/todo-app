import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Config from '../../config';

import UserModel from '../../models/UserModel';

interface RegisterUserDTO {
  email: string;
  password: string;
}

interface LoginUserDTO {
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

  loginUser: async (loginUserDTO: LoginUserDTO) => {
    const { email, password } = loginUserDTO;

    const exactEmailUser = await UserModel.findOne({ email });
    if (!exactEmailUser) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, exactEmailUser.password).catch(() => {
      throw new Error('Server error');
    });
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({
      id: exactEmailUser._id.toString(),
    }, Config.get('JWT_SECRET'), {
      expiresIn: '30m',
    });
    return token;
  },
};

export default UserService;
