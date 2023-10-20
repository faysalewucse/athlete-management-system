import { Link } from "react-router-dom";

export const DashboardCard = ({ number, title, extraStyle, route }) => {
  return (
    <Link
      to={route}
      className={`bg-gradient shadow-lg bg-opacity-80 px-8 py-3 text-center text-white rounded-xl ${extraStyle}`}
    >
      <h1 className="font-bold text-7xl">{number}</h1>
      <h1 className="font-semibold text-xl">{title}</h1>
    </Link>
  );
};
