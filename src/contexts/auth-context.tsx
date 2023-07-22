import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  auth: AuthInfo;
  setAuth(authInfo: AuthInfo): void;
  removeAuth(): void;
  isUserAuthenticated(): boolean;
};

type AuthInfo = {
  token: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthInfo>({ token: "" });
  const { setItem, getItem, removeItem } = useLocalStorage();

  const setUserAuthInfo = useCallback(
    ({ token }: AuthInfo) => {
      setItem("token", token);
      setAuthState({ token });
    },
    [setItem]
  );

  const isUserAuthenticated = useCallback(() => {
    return Boolean(authState?.token);
  }, [authState]);

  const removeUserAuthInfo = () => {
    removeItem("token");
    setAuthState({ token: "" });
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) setUserAuthInfo({ token });
  }, [getItem, setUserAuthInfo]);

  return (
    <AuthContext.Provider
      value={{
        auth: authState,
        setAuth: setUserAuthInfo,
        isUserAuthenticated,
        removeAuth: removeUserAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
