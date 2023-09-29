import { SpinnerText } from "./SpinnerText";

export default function Button({
  loading,
  text,
  style,
  onClickHandler,
  disable,
}) {
  return (
    <button
      disabled={disable}
      onClick={onClickHandler}
      className={`rounded px-6 bg-gradient-to-r to-primary from-secondary py-2 font-semibold text-white hover:shadow-lg  transition-all duration-200 ${style}`}
    >
      <SpinnerText text={text} loading={loading} />
    </button>
  );
}
