import Image from "next/image";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  performSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  setSearchTerm,
  performSearch,
  handleKeyPress,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchBox relative flex mt-4 mx-4 md:mx-7">
      <button
        onClick={performSearch}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
      >
        <Image
          src={"/images/icons/icon_search.svg"}
          width={18}
          height={18}
          alt="검색"
        />
      </button>
      <input
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="border py-2 pl-12 rounded-md w-full"
      />
    </div>
  );
};

export default SearchBox;