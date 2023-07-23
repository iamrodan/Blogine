import { useContext } from "react";
import Image from "../atoms/Image";
import UserOptions from "../molecules/UserOptions";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import LinkButton from "../atoms/LinkButton";
import AppLogo from "../molecules/AppLogo";
import NavItem from "../atoms/NavItem";

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
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <div className="inline-flex items-center space-x-2">
        <AppLogo />
      </div>
      <div className="hidden lg:block">
        <ul className="ml-12 inline-flex space-x-8">
          {menuItems.map(({ name, href }) => (
            <li key={name}>
              <NavItem name={name} href={href} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
