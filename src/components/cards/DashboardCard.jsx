import React from "react";

export const DashboardCard = ({ number, title, extraStyle }) => {
  return (
    <div
      className={`bg-[#9197ae] shadow-xl bg-opacity-80 px-8 py-3 text-center text-white rounded ${extraStyle}`}
    >
      <h1 className="font-bold text-7xl">{number}</h1>
      <h1 className="font-semibold text-xl">{title}</h1>
    </div>
  );
};
