import { Loading } from "@nextui-org/react";

export const SpinnerText = ({ text, loading }) => {
  return (
    <div className="flex items-center justify-center">
      {loading ? <Loading color="white" /> : <span>{text}</span>}
    </div>
  );
};
