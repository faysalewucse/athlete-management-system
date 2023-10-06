import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { Pagination } from "antd";
import { useState } from "react";
import CustomLoader from "../../components/CustomLoader";

const Coaches = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    data: coaches = [],
    refetch,
  } = useQuery({
    queryKey: ["coaches", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users/byRole?role=coach`
      );
      return data;
    },
  });

  const handleApprove = async (id) => {
    if (currentUser?.status === "pending") {
      toast.error("You are not approved by Super Admin!");
      return;
    }
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=approved`)
      .then((res) => {
        if (res.status === 200) {
          refetch().then(() => toast.success("Approved"));
        }
      });
  };

  // pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(10);
    refetch();
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCoaches = coaches.slice(startIndex, endIndex);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Coaches"} />
          {currentCoaches?.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center bg-gradient text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Image</th>
                  <th>Name</th>
                  {/* access by role */}
                  {currentUser?.role === "sadmin" || <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {currentCoaches.map((coach) => {
                  const { name, photoURL } = coach;
                  return (
                    <tr
                      key={coach._id}
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
                        {/* access by role */}
                        {currentUser?.role !== "sadmin" &&
                        coach?.status === "pending" ? (
                          <div>
                            <button
                              onClick={() => handleApprove(coach?._id)}
                              className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                            >
                              Approve
                            </button>
                          </div>
                        ) : (
                          <div className="flex text-sm items-center space-x-4 justify-center">
                            <button className="bg-secondary hover:bg-secondary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                              Assign to a team
                            </button>
                            <button className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                              Change Role
                            </button>
                            <button className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                              Edit
                            </button>
                            <button className="bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                              Delete
                            </button>
                            <MdDeleteOutline className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="border p-5 mt-20 border-primary rounded-lg text-xl text-center">
              No Coaches here.
            </h1>
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading} />
        </div>
      )}
      <Pagination
        current={currentPage}
        total={coaches.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: "16px", textAlign: "right" }}
      />
    </div>
  );
};

export default Coaches;
