"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = () => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 dark:bg-gray-900 p-2  flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
