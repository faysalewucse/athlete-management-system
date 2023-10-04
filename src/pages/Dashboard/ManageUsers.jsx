import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users`
      );
      return data;
    },
  });

  const handleUserRole = (userEmail, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make user ${
        role === "admin" ? "Admin" : "Instructor"
      }.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        role === "admin" ? "Make Admin" : "Make Instructor"
      }`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/changeUserRole/${userEmail}?role=${role}`)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              refetch().then(() => {
                Swal.fire(`Great!`, "Role has been changed", "success");
              });
            }
          });
      }
    });
  };

  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"My Classes"} />
          {users?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-transparent border-collapse my-10 text-center">
                <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-2">Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const { name, photoURL, email, role } = user;
                    return (
                      <tr
                        key={user._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="py-4">
                          <img
                            src={photoURL}
                            alt="Class"
                            className="w-12 h-12 mx-auto rounded-full"
                          />
                        </td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>
                          <span
                            className={`${
                              role === "instructor"
                                ? "bg-orange-100 text-orange-600"
                                : role === "student"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            } font-semibold py-1 px-3 text-xs rounded-full`}
                          >
                            {role.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="flex space-x-4 justify-center">
                            <button
                              disabled={role === "instructor"}
                              onClick={() =>
                                handleUserRole(email, "instructor")
                              }
                              className={`${
                                role === "instructor" &&
                                "opacity-50 cursor-not-allowed"
                              } py-1 px-3 rounded bg-orange-100 dark:text-orange-600 text-orange-600 hover:text-orange-700 dark:hover:text-orange-400 hover:scale-105 transition-all duration-150`}
                            >
                              <span className="ml-1">Make Instructor</span>
                            </button>
                            <button
                              disabled={role === "admin"}
                              onClick={() => handleUserRole(email, "admin")}
                              className={`${
                                role === "admin" &&
                                "opacity-50 cursor-not-allowed"
                              } font-semibold rounded py-1 px-3 bg-red-100 dark:text-red-600 text-red-600 hover:text-red-700 dark:hover:text-red-400 hover:scale-105 transition-all duration-150`}
                            >
                              <span className="ml-1">Make Admin</span>
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
