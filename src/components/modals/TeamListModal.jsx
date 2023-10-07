import { useQuery } from "@tanstack/react-query";
import { Checkbox, Modal, Input, Pagination } from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CustomLoader from "../CustomLoader";
import { Loading } from "@nextui-org/react";

const TeamListModal = ({ isModalOpen, setIsModalOpen, selectedCoach }) => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { isLoading, data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams`
      );
      return data;
    },
  });

  // Filter teams based on the search input
  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Paginate the filtered teams
  const pageSize = 5; // Number of teams per page
  const totalTeams = filteredTeams.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + pageSize);

  const options = paginatedTeams.map((team) => {
    return {
      label: (
        <div className="flex gap-5 items-center rounded-md p-2 bg-gradient text-white">
          <h1 className="">{team.teamName}</h1>
          <h4 className="capitalize">Sport: {team.sports}</h4>
        </div>
      ),
      value: team._id,
    };
  });

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
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
            Add Teams for coach{" "}
            <span className="font-bold">{selectedCoach.name}</span>
          </p>
          <h1>Teams</h1>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
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
