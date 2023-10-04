import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import { AiFillEdit } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const { isLoading, data: myClasses = [] } = useQuery({
    queryKey: ["classes", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/classes/${currentUser?.email}`);
      return data;
    },
  });

  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"My Classes"} />
          {myClasses?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-transparent border-collapse my-10 text-center">
                <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-2">Image</th>
                    <th>Class Name</th>
                    <th>Available Seats</th>
                    <th>Total Seats</th>
                    <th>Total Enrolled Students</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Feedback</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myClasses.map((myClass) => {
                    const {
                      name,
                      status,
                      totalSeats,
                      availableSeats,
                      feedback = "",
                      price,
                      image,
                    } = myClass;
                    return (
                      <tr
                        key={myClass._id}
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
                        <td>{totalSeats}</td>
                        <td>{availableSeats}</td>
                        <td>{totalSeats - availableSeats}</td>
                        <td>{price}</td>
                        <td>
                          <span
                            className={`${
                              status === "pending"
                                ? "bg-orange-100 text-orange-600"
                                : status === "approved"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            } font-semibold py-1 px-3 text-xs rounded-full`}
                          >
                            {status.toUpperCase()}
                          </span>
                        </td>
                        <td>{feedback}</td>
                        <td>
                          <div className="flex space-x-4 justify-center">
                            <button className="dark:text-green-300 text-green-600 hover:text-green-700 dark:hover:text-green-400 hover:scale-105 transition-all duration-150">
                              <AiFillEdit className="inline-block w-5 h-5" />
                              <span className="ml-1">Update Class</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="border p-5 mt-20 border-primary text-xl text-center">
              No class Added Yet
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
