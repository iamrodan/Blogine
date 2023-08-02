import { KeyboardEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchBarProps = {
  handleSearch(searchKey: string): void;
};

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const [searchKey, setSearchKey] = useState<string>("");

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(value);
  };

  const onSearchBarClick = (event: React.MouseEvent<HTMLElement>) => {
    handleSearch(searchKey);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchKey);
    }
  };

  return (
    <div className="flex flex-row h-12 w-auto lg:w-1/2 mb-10 justify-center">
      <div className="flex items-center h-full w-full bg-gray-100 px-4 py-2 border border-slate-700">
        <AiOutlineSearch className="w-6 h-6 text-gray-600" />
        <input
          type="text"
          className="bg-transparent lg:ml-2 focus:outline-none w-full"
          placeholder="Search..."
          onChange={handleOnChange}
          value={searchKey}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        className="bg-slate-900 text-slate-50 px-2 lg:px-4 uppercase w-min"
        onClick={onSearchBarClick}
      >
        Search
      </button>
    </div>
  );
}
