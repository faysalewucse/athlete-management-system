export default function ButtonOutline({ text, style, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className={`px-6 border bg-gradient-to-r to-primary from-secondary py-1 hover:shadow-xl text-white rounded transition-all duration-200 ${style}`}
    >
      {text}
    </button>
  );
}
