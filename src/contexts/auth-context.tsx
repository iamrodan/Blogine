import { createContext, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthInfo = {
  token: string;
};

const AuthContext = createContext({});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthInfo>({
    token: "",
  });

  const setUserAuthInfo = ({ token }: AuthInfo) => {
    localStorage.setItem("token", token);
    setAuthState({ token });
  };

  const isUserAuthenticated = () => {
    if (!authState.token) return false;
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo: AuthInfo) => setUserAuthInfo(authInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
