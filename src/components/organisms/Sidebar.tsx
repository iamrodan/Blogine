import { BsNewspaper } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import AppLogo from "../molecules/AppLogo";
import UserAvatar from "../atoms/UserAvatar";
import Link from "next/link";

type SidebarProps = {
  username: string;
  userId: string;
  handleLogout(): void;
  children: React.ReactNode;
};

export default function Sidebar({
  username,
  handleLogout,
  children,
  userId,
}: SidebarProps) {
  return (
    <div className="flex">
      <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
        <AppLogo />
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-900">
                content
              </label>
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                href={`/manage/${userId}/blogs`}
              >
                <BsNewspaper className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Blogs</span>
              </Link>
            </div>
          </nav>
          <div className="mt-6">
            <div className="mt-6 flex items-center justify-between">
              <a href="#" className="flex items-center gap-x-2">
                <UserAvatar />
                <span className="text-sm font-medium text-gray-700">
                  {username}
                </span>
              </a>
              <a
                href="#"
                className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
              >
                <AiOutlineLogout className="h-5 w-5" onClick={handleLogout} />
              </a>
            </div>
          </div>
        </div>
      </aside>
      <div className="p-10">{children}</div>
    </div>
  );
}
