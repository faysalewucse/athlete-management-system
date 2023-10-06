export const SectionHeader = ({ heading, title, description, quantity }) => {
  return (
    <div className="">
      <h1 className="text-4xl text-primary">{heading}</h1>
      <div className="flex items-center gap-5">
        <h3 className="py-2 text-4xl font-bold">{title}</h3>
        <h3 className="py-2 text-4xl font-bold">({quantity})</h3>
      </div>
      <p className="md:w-1/2 mx-auto">{description}</p>
    </div>
  );
};
