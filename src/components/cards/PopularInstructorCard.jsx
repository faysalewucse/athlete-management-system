export const PopularInstructorCard = ({
  image,
  name,
  classes: cls,
  totalStudents,
  index,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className={`md:flex gap-16 items-center md:w-1/2 ${
        index % 2 && "flex-row-reverse"
      }`}
    >
      <img
        className={`h-64 w-64 rounded-lg object-top object-cover ${
          index % 2 ? "md:rotate-2" : "md:-rotate-2"
        } hover:rotate-0 transition-all duration-200`}
        src={image}
        alt="instructor"
      />
      <div
        className={`text-center ${index % 2 ? "md:text-end" : "md:text-start"}`}
      >
        <h1 className="text-xl md:text-3xl font-bold">{name}</h1>
        <p className="text-primary my-2">
          {totalStudents} Student{totalStudents > 1 && "s"}
        </p>
        <div className="hidden md:block">
          {cls?.map((className, index) => (
            <p
              key={index}
              className="border py-1 px-2 rounded text-center my-2 border-primary"
            >
              {className.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
