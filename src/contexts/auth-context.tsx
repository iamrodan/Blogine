import { useLocalStorage } from "@/hooks/useLocalStorage";
import useUtils from "@/hooks/useUtils";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  auth: AuthInfo;
  setAuth(authInfo: AuthInfo): void;
  removeAuth(): void;
  isUserAuthenticated: boolean;
};

type AuthInfo = {
  token: string;
  username: string;
  userId: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthInfo | null>(null);
  const { setItem, getItem, removeItem } = useLocalStorage();

  const setUserAuthInfo = useCallback(
    (authInfo: AuthInfo) => {
      setItem("auth", JSON.stringify(authInfo));
      setAuthState(authInfo);
    },
    [setItem]
  );

  const isUserAuthenticated = useCallback(() => {
    return Boolean(authState?.token);
  }, [authState]);

  const { goToHome } = useUtils();

  const removeUserAuthInfo = () => {
    removeItem("auth");
    setAuthState(null);
    goToHome();
  };

  useEffect(() => {
    const auth = getItem("auth");
    if (auth) setUserAuthInfo(JSON.parse(auth));
  }, [getItem, setUserAuthInfo]);

  return (
    <AuthContext.Provider
      value={{
        auth: authState as AuthInfo,
        setAuth: setUserAuthInfo,
        isUserAuthenticated: useMemo(
          () => isUserAuthenticated(),
          [isUserAuthenticated]
        ),
        removeAuth: removeUserAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
