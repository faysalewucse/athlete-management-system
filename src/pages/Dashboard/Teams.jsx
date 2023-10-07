import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Pagination, Select } from "antd";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import Button from "../../components/shared/Button";
import AddTeam from "../AddTeam/AddTeam";

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
        `${import.meta.env.VITE_BASE_API_URL}/teams/${currentUser?.email}`
      );
      return data;
    },
  });

  const { data: coaches = [] } = useQuery({
    queryKey: ["coaches", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users/byRole?role=coach`
      );
      return data;
    },
  });

  // const handleApprove = async (id) => {
  //   if (currentUser?.status === "pending") {
  //     toast.error("You are not approved by Super Admin!");
  //     return;
  //   }
  //   await axiosSecure
  //     .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=approved`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         refetch().then(() => toast.success("Approved"));
  //       }
  //     });
  // };

  // pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(10);
    refetch();
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTeams = teams.slice(startIndex, endIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <div className="flex justify-between">
            <SectionHeader title={"Teams"} quantity={teams.length} />
            <Button
              onClickHandler={() => setIsModalOpen(true)}
              text={"Add Team +"}
            />
            <AddTeam
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
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
                          <Select placeholder="Assign Coach">
                            {coaches.map((coach) => (
                              <Option key={coach._id} value={coach?.email}>
                                {coach?.name}
                              </Option>
                            ))}
                          </Select>
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
              No Teams here.
            </h1>
          )}
          <Pagination
            current={currentPage}
            total={teams.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />
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
    </div>
  );
};

export default Teams;
