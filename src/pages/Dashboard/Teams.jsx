import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { Pagination } from "antd";
import { useState } from "react";

const Teams = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    data: teams = [],
    refetch,
  } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams`
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
  const currentTeams = teams.slice(startIndex, endIndex);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Teams"} />
          {currentTeams?.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center bg-gradient text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Name</th>
                  <th>Sports</th>
                  {/* access by role */}
                  {currentUser?.role === "sadmin" || <th>Coach</th>}
                </tr>
              </thead>

              <tbody>
                {currentTeams.map((team) => {
                  const { teamName, sports } = team;
                  return (
                    <tr
                      key={team._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-2">{teamName}</td>
                      <td>{sports}</td>

                      <td>
                        {team?.coachEmail === undefined ? (
                          <button className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded">
                            Assign
                          </button>
                        ) : (
                          team?.coachEmail
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
          <HashLoader
            color={"#3b82f6"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Pagination
        current={currentPage}
        total={teams.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ marginTop: "16px", textAlign: "right" }}
      />
    </div>
  );
};

export default Teams;
