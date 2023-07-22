import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import UserAvatar from "../atoms/UserAvatar";
import { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSolidBookContent } from "react-icons/bi";

export default function UserOptions() {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const { removeAuth } = useContext(AuthContext) as AuthContextType;
  const dropdownRef = useRef(null);
  const username = "Ryan Dahl";

  const toggleDropDown = () => {
    setIsDropDownOpen((prevValue) => !prevValue);
  };

  const handleLogout = () => {
    removeAuth();
  };

  const goToPostManager = () => {
    alert("manage post");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // check if dispatched to close dropdown option
      if (
        !(dropdownRef?.current as unknown as HTMLDivElement)?.contains(
          event.target as Node
        )
      ) {
        setIsDropDownOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <UserAvatar onClick={toggleDropDown} />
      {isDropDownOpen && (
        <div className="absolute right-0 mt-2 w-max bg-slate-50 rounded-md shadow-lg">
          <span className="flex justify-center items-center w-full px-4 py-2 text-lg text-gray-700 bg-slate-200">
            {username}
          </span>
          <button
            className="flex justify-between items-center w-full test-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
            onClick={goToPostManager}
          >
            <span className="mr-2">manage posts</span>
            <BiSolidBookContent />
          </button>
          <button
            className="flex justify-between items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
            onClick={handleLogout}
          >
            <span className="mr-2">logout</span>
            <AiOutlineLogout />
          </button>
        </div>
      )}
    </div>
  );
}
