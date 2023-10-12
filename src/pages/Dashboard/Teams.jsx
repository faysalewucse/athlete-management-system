import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Dropdown, Pagination, Space, Table } from "antd";
import { useState } from "react";
import AddTeamModal from "../../components/modals/AddTeamModal";
import { BiChevronDown } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

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
        `${
          import.meta.env.VITE_BASE_API_URL
        }/users/byRole?role=coach&adminEmail=${currentUser?.email}`
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

  const data = currentTeams?.map((team) => {
    return {
      key: team._id,
      name: team.teamName,
      sports: team.sports,
      coaches: team.coachData,
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Sports",
      dataIndex: "sports",
      key: "sports",
      render: (text) => <p className="capitalize">{text}</p>,
    },
    {
      title: "Coaches",
      dataIndex: "coaches",
      key: "coaches",
      render: (coaches) => (
        <div>
          {coaches.length === 0 ? (
            <div className="flex gap-2">
              <Button>Assign Coaches</Button>
            </div>
          ) : (
            <Dropdown
              menu={{
                items: coaches.map((coach) => {
                  return {
                    key: coach._id,
                    label: (
                      <div className="flex items-center justify-between gap-5 text-lg">
                        <p>{coach.name}</p>
                        <AiTwotoneDelete className="text-danger hover:text-danger2" />
                      </div>
                    ),
                  };
                }),
              }}
              trigger={["click"]}
            >
              <Button>
                <Space>
                  View Coaches ({coaches.length})
                  <BiChevronDown />
                </Space>
              </Button>
            </Dropdown>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <div className="flex justify-between">
            <SectionHeader title={"Teams"} quantity={teams.length} />
            <Button
              type="btn"
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient text-white"
            >
              Add Team +
            </Button>
            <AddTeamModal
              refetch={refetch}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              coaches={coaches}
            />
          </div>
          <Table dataSource={data} columns={columns} pagination={false} />

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
