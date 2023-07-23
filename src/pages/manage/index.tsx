import Sidebar from "@/components/organisms/Sidebar";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import { useContext } from "react";
type ManagePageProps = {
  children: React.ReactNode;
};
export default function ManagePage({ children }: ManagePageProps) {
  const { auth, removeAuth } = useContext(AuthContext) as AuthContextType;

  return (
    <Sidebar
      username={auth?.username}
      handleLogout={removeAuth}
      userId={auth?.userId}
    >
      {children}
    </Sidebar>
  );
}
