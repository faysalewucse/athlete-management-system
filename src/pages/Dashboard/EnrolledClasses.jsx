import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import { AiOutlineEye } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const EnrolledClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const { isLoading, data: enrolledClasses = [] } = useQuery({
    queryKey: ["enrolledClasses", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/payments/${currentUser.email}`
      );
      return data;
    },
  });

  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"My Classes"} />
          {enrolledClasses?.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Image</th>
                  <th>Class Name</th>
                  <th>Instructor Name</th>
                  <th>Available Seats</th>
                  <th>Total Seats</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {enrolledClasses.map((enrolledClass) => {
                  const {
                    name,
                    instructorName,
                    totalSeats,
                    availableSeats,
                    price,
                    image,
                  } = enrolledClass.classInfo[0];
                  return (
                    <tr
                      key={enrolledClass._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-4">
                        <img
                          src={image}
                          alt="Class"
                          className="w-12 h-12 mx-auto rounded-full"
                        />
                      </td>
                      <td>{name}</td>
                      <td>{instructorName}</td>
                      <td>{availableSeats}</td>
                      <td>{totalSeats}</td>
                      <td>{price}</td>
                      <td>
                        <div className="flex space-x-4 justify-center">
                          <button className="dark:text-green-300 text-green-600 hover:text-green-700 dark:hover:text-green-400 hover:scale-105 transition-all duration-150">
                            <AiOutlineEye className="inline-block w-5 h-5" />
                            <span className="ml-1">View Class</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="border p-5 mt-20 border-primary text-xl text-center">
              No class Enrolled yet.
            </h1>
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <HashLoader
            color={"#FF3607"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};
