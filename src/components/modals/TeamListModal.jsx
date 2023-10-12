import { useQuery } from "@tanstack/react-query";
import { Checkbox, Modal, Input, Pagination } from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CustomLoader from "../CustomLoader";
import { Loading } from "@nextui-org/react";
import toast from "react-hot-toast";

const TeamListModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedCoach,
  refetch,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [selectedTeam, setSelectedTeam] = useState([]); // State for pagination

  const handleOk = async () => {
    if (selectedTeam.length === 0) {
      toast.error("Please select a team");
    } else {
      try {
        const response = await axiosSecure.patch(
          `${import.meta.env.VITE_BASE_API_URL}/users/assignTeam/${
            selectedCoach.email
          }`,
          selectedTeam
        );

        if (response.status === 200) {
          setIsModalOpen(false);
          refetch();
          toast.success("Team Assigned Successfully");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams/${currentUser?.email}`
      );
      return data;
    },
  });

  // Filter teams based on the search input
  const filteredTeams = teams.filter((team) =>
    team?.teamName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Paginate the filtered teams
  const pageSize = 5; // Number of teams per page
  const totalTeams = filteredTeams.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + pageSize);

  const options = paginatedTeams.map((team) => {
    return {
      label: (
        <div className="flex gap-5 items-center">
          <h1 className="text-gradient font-bold">{team.teamName}</h1>
          <small>{"->"}</small>
          <h4 className="capitalize">Sports: {team.sports}</h4>
        </div>
      ),
      value: team._id,
    };
  });

  const onChange = (checkedValues) => {
    setSelectedTeam(checkedValues);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <Modal
      title={
        <div className="">
          <p className="text-gradient">
            Add Teams for coach
            <span className="font-bold"> {selectedCoach.name}</span>
          </p>
          <h1>Teams</h1>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      okText="Add"
      okType="default"
      onCancel={handleCancel}
    >
      <Input.Search
        placeholder="Search teams by name"
        onSearch={handleSearch}
        className="mb-2"
        size="large"
      />
      {isLoading ? (
        <CustomLoader isLoading={Loading} />
      ) : (
        <div>
          <Checkbox.Group options={options} onChange={onChange} />

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalTeams}
            onChange={(page) => setCurrentPage(page)}
            className="mt-2"
          />
        </div>
      )}
    </Modal>
  );
};

export default TeamListModal;
