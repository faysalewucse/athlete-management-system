export const PopularClassCard = ({
  image,
  className,
  enrolledStudents,
  index,
}) => {
  return (
    <div
      data-aos={index % 2 ? "fade-left" : "fade-right"}
      data-aos-duration="1000"
      className="dark:bg-slate-900 bg-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
    >
      <img
        className="rounded-t-lg w-full h-64 object-cover"
        src={image}
        alt="cover"
      />
      <div className="p-5 text-center">
        <h2 className="text-xl font-bold">{className}</h2>
        <p className="text-primary">Enrolled Students: {enrolledStudents}</p>
      </div>
    </div>
  );
};
