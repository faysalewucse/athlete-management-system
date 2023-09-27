import Search from "antd/es/input/Search";

const SearchField = ({ size }) => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <Search
        size={size}
        placeholder="input search text"
        onSearch={onSearch}
        className="w-full"
      />
    </div>
  );
};

export default SearchField;
