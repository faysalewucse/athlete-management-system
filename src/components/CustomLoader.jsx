import { HashLoader } from "react-spinners";

const CustomLoader = ({ isLoading }) => {
  return (
    <HashLoader
      color={"#3b82f6"}
      loading={isLoading}
      size={60}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default CustomLoader;
