import { Link } from "react-router-dom";

const LinkBtn = ({ children, to }) => {
  return (
    <Link
      className="bg-white hover:bg-white/80 transition-300 lg:text-md text-sm cursor-pointer py-2 px-6 rounded-md"
      to={to}
    >
      {children}
    </Link>
  );
};

export default LinkBtn;
