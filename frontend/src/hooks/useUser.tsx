import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  PropsWithChildren,
} from 'react';

import {
  loginUser,
} from '../api/user';

interface UserContextProps {
  token: string | null;
  logIn:  (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  token: null,
  logIn: async () => undefined,
  logOut: async () => undefined,
});

export function UserContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);

  const logIn = useCallback(async (email: string, password: string) => {
    const { token } = await loginUser({ email, password });
    setToken(token);
  }, []);

  const logOut = useCallback(async () => {
    if (token) {
      setToken(null);
    }
  }, [token]);

  const providerValue = useMemo(() => ({
    token,
    logIn,
    logOut,
  }), [token, logIn, logOut]);

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
