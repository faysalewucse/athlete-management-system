export const SectionHeader = ({ heading, title, description, quantity }) => {
  return (
    <div className="">
      <h1 className="text-3xl text-primary">{heading}</h1>
      <div className="flex items-center gap-5 mb-5">
        <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        <h3 className="text-2xl md:text-3xl font-bold">({quantity})</h3>
      </div>
      <p className="md:w-1/2 mx-auto">{description}</p>
    </div>
  );
};
