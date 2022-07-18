import axios from 'axios';

interface LoginUserProps {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserProps) {
  try {
    const result = await axios.post('/api/users/login', {
      email,
      password,
    });
    return result;
  } catch (e: any) {
    console.log(e.response);
    if (e.response.status === 400) {
      throw new Error(e.response.data.error);
    }
    throw new Error('Could not login in. Try again later.');
  }
}

interface RegisterUserProps {
  email: string;
  password: string;
}

export async function registerUser({ email, password }: RegisterUserProps) {
  try {
    const result = await axios.post('/api/users/register', {
      email,
      password,
    });
    return result;
  } catch (e: any) {
    if (e.response.status === 400) {
      throw new Error(e.response.data.error);
    }
    throw new Error('Could not register user. Try again later');
  }
}
