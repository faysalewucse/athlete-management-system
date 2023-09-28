import { RxStopwatch } from "react-icons/rx";

const Brand = () => {
  return (
    <h2 className="flex gap-1 items-center text-primary font-bold text-4xl">
      <RxStopwatch className={"text-5xl"} />
      <span className="mt-1 tracking-widest">VERTIME</span>
    </h2>
  );
};

export default Brand;
