import { Checkbox, Modal, Input, Pagination, Button } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssignCoachModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTeam,
  refetch,
  coaches,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const [selectedCoach, setSelectedCoach] = useState([]); // State for pagination
  const handleOk = async () => {
    if (selectedTeam.length === 0) {
      toast.error("Please select a team");
    } else {
      try {
        const response = await axiosSecure.patch(
          `${import.meta.env.VITE_BASE_API_URL}/team/updateCoaches/${
            selectedTeam.key
          }`,
          selectedCoach
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

  // Filter Coaches based on the search input
  const filteredCoaches = coaches.filter((coach) =>
    coach?.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Paginate the filtered Coaches
  const pageSize = 5; // Number of Coaches per page
  const totalCoaches = filteredCoaches.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCoaches = filteredCoaches.slice(
    startIndex,
    startIndex + pageSize
  );

  const options = paginatedCoaches.map((coach) => {
    return {
      label: (
        <div className="flex gap-5 items-center">
          <h1 className="text-gradient font-bold">{coach.name}</h1>
          <small>{"->"}</small>
          <h4 className="capitalize">ID: {coach._id}</h4>
        </div>
      ),
      value: coach.email,
    };
  });

  const onChange = (checkedValues) => {
    setSelectedCoach(checkedValues);
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
            Add Coaches for the team
            <span className="font-bold"> {selectedCoach.name}</span>
          </p>
          <h1>Coaches</h1>
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      okText="Add"
      okType="default"
      onCancel={handleCancel}
      footer={
        coaches.length === 0 ? null : (
          <div className="">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="btn"
              key="submit"
              className="text-white bg-success hover:bg-success2"
              onClick={handleOk}
            >
              Add
            </Button>
          </div>
        )
      }
    >
      <div>
        {coaches.length !== 0 ? (
          <div>
            <Input.Search
              placeholder="Search Coaches by name"
              onSearch={handleSearch}
              className="mb-2"
              size="large"
            />

            <div>
              <Checkbox.Group options={options} onChange={onChange} />

              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCoaches}
                onChange={(page) => setCurrentPage(page)}
                className="mt-2"
              />
            </div>
          </div>
        ) : (
          <p className="text-danger">No New Coaches for assign</p>
        )}
      </div>
    </Modal>
  );
};

export default AssignCoachModal;
