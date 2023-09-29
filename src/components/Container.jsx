export const Container = ({ children, extraStyle }) => {
  return (
    <div className={`max-w-screen-2xl mx-auto ${extraStyle}`}>{children}</div>
  );
};
