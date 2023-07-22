import { useContext } from "react";
import Image from "../atoms/Image";
import UserOptions from "../molecules/UserOptions";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import Button from "../atoms/LinkButton";
import AppLogo from "../molecules/AppLogo";

const menuItems = [
  {
    name: "New",
    href: "#",
  },
  {
    name: "Trending",
    href: "#",
  },
];

export function Navbar() {
  const { isUserAuthenticated } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <AppLogo />
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-end">
          {isUserAuthenticated() ? (
            <UserOptions />
          ) : (
            <Button label="Sign in" url="/login" />
          )}
        </div>
      </div>
    </div>
  );
}
