import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import LinkButton from "../atoms/LinkButton";
import UserOptions from "../molecules/UserOptions";
import { Navbar } from "../molecules/Navbar";

export default function Header() {
  const { isUserAuthenticated } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="w-full bg-white fixed border flex items-center">
      <Navbar />
      <div className="flex grow justify-end">
        {isUserAuthenticated() ? (
          <UserOptions />
        ) : (
          <LinkButton label="Sign in" url="/login" />
        )}
      </div>
    </div>
  );
}
