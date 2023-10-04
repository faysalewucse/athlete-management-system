export const Container = ({ children, extraStyle }) => {
  return <div className={`max-w-7xl mx-auto ${extraStyle}`}>{children}</div>;
};
