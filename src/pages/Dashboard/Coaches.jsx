import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { Pagination, Space, Table } from "antd";
import { useState } from "react";
import CustomLoader from "../../components/CustomLoader";
import TeamListModal from "../../components/modals/TeamListModal";

const Coaches = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      toast.error("You are not approved by Admin!");
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
    setPageSize(5);
    refetch();
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCoaches = coaches.slice(startIndex, endIndex);

  const modalHandler = (coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  };

  const data = currentCoaches?.map((coach) => {
    return {
      key: coach?._id,
      image: coach?.photoURL ? coach.photoURL : avatar,
      name: coach?.name,
      teams: coach?.teams,
      status: coach?.status,
    };
  });

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <img
          src={img}
          alt="Class"
          className="bg-dark p-1 w-10 h-10 rounded-full"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
      render: (teams) => (
        <div>
          {teams.map((team) => (
            <div key={team._id}>{team.teamName}</div>
          ))}
        </div>
      ),
    },
    {
      title: currentUser?.role === "admin" ? "Action" : "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentUser?.role === "admin" && (
            <div>
              {record.role === "admin" && record?.status === "pending" ? (
                <div>
                  <button
                    onClick={() => handleApprove(record?._id)}
                    className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className="flex text-sm items-center space-x-4 justify-center">
                  <button
                    onClick={() => modalHandler(record)}
                    className="bg-secondary hover:bg-secondary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
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
            </div>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Coaches"} quantity={coaches?.length} />

          <Table dataSource={data} pagination={false} columns={columns} />

          <Pagination
            current={currentPage}
            total={coaches.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />

          {currentUser.role == "admin" && (
            <TeamListModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedCoach={selectedCoach}
            />
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Coaches;
