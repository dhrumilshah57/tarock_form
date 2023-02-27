import React, { createContext, useContext, useState } from 'react'
import { User } from '../models/user';

type AuthResponseType = {
  setData: (data: User) => void;
  data?: User
}
export const AuthContext = createContext<AuthResponseType>({
  setData: (data: User) => { },
});

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const initialToken = localStorage.getItem('auth');
  // const [error, setError] = useState<string>();
  // const [status, setStatus] = useState<string>();
  const [data, setData] = useState<User>(
    initialToken === "1" ? JSON.parse(initialToken) : undefined
  );

  return (
    <AuthContext.Provider value={{
      setData: setData,
      data: data,
    }}>{props.children}</AuthContext.Provider>
  )
};

export function useAuth() {
  const authCtx = useContext(AuthContext);
  return authCtx;
}

export default AuthContextProvider