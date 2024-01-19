import React from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchBarProps {}

const SearchBar: React.FC = (props: SearchBarProps) => {
    return (
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full max-md:hidden">
            <button>
                <BiSearch size={20} className="opacity-50" />
            </button>
            <input
                type="text"
                className="outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-medium placeholder:text-gray-400 text-[15px]"
                placeholder="Tìm kiếm ..."
                autoComplete="false"
            />
        </div>
    );
};

export default SearchBar;
