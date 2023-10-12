import { Checkbox, Modal, Input, Pagination } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssignTeamModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedCoach,
  refetch,
  teams,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState([]);

  const handleOk = async () => {
    if (selectedTeam.length === 0) {
      toast.error("Please select a team");
    } else {
      try {
        const response = await axiosSecure.patch(
          `${import.meta.env.VITE_BASE_API_URL}/coach/assignTeam/${
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

  // Filter teams based on the search input
  const filteredTeams = teams?.filter((team) =>
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
      footer={
        teams.length === 0 ? null : (
          <div className="flex items-center justify-end gap-4">
            <button
              className="bg-primary font-medium text-white px-3 py-1 rounded"
              key="submit"
              onClick={handleOk}
            >
              Add
            </button>
            <button key="cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )
      }
    >
      <Input.Search
        placeholder="Search teams by name"
        onSearch={handleSearch}
        className="mb-2"
        size="large"
      />

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
    </Modal>
  );
};

export default AssignTeamModal;
