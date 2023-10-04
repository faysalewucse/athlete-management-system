import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import { RxCopy } from "react-icons/rx";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Tooltip } from "@nextui-org/react";

export const Payments = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const { isLoading, data: enrolledClasses = [] } = useQuery({
    queryKey: ["payments", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/payments/${
          currentUser.email
        }?sort=true`
      );
      return data;
    },
  });

  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"My Classes"} />
          {enrolledClasses.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Serial</th>
                  <th>Price</th>
                  <th>Class</th>
                  <th>Instructor</th>
                  <th>Transaction Id</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {enrolledClasses.map((enrolledClass, index) => {
                  const { name, instructorName, price, image } =
                    enrolledClass.classInfo[0];
                  return (
                    <tr
                      key={enrolledClass._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-4">{index + 1}</td>
                      <td className="font-bold text-green-400">{price}$</td>
                      <td>{name}</td>
                      <td>{instructorName}</td>
                      <td className="flex items-center gap-2 justify-center py-4">
                        {enrolledClass.transactionId}
                        <Tooltip content="copy">
                          <RxCopy className="text-green-500" />
                        </Tooltip>
                      </td>
                      <td>{enrolledClass.date}</td>
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
