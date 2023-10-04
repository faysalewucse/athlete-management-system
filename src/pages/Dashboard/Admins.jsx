import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";

export const Admins = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const { isLoading, data: admins = [] } = useQuery({
    queryKey: ["admins", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users/byRole?role=admin`
      );
      return data;
    },
  });

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Admins"} />
          {admins?.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center bg-gradient text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => {
                  const { name, photoURL } = admin;
                  return (
                    <tr
                      key={admin._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-2">
                        <img
                          src={photoURL ? photoURL : avatar}
                          alt="Class"
                          className="bg-dark p-1 w-10 h-10 mx-auto rounded-full"
                        />
                      </td>
                      <td>{name}</td>

                      <td>
                        <div className="flex text-sm items-center space-x-4 justify-center">
                          <h1 className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                            {admin.status === "pending" && "Approve"}
                          </h1>
                          <MdDeleteOutline className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="border p-5 mt-20 border-primary rounded-lg text-xl text-center">
              No Admins here.
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
