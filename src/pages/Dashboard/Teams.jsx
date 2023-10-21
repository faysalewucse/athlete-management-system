import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Card, Dropdown, Pagination, Space, Table } from "antd";
import { useState } from "react";
import AddTeamModal from "../../components/modals/AddTeamModal";
import { BiChevronDown } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import AssignCoachModal from "../../components/modals/AssignCoachModal";
import CoachDetailsModal from "../../components/modals/CoachDetailsModal";
import toast from "react-hot-toast";

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

  // data for logged in as coach

  const { data: coachTeams = [] } = useQuery({
    queryKey: ["coachTeams", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.role === "coach") {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_BASE_API_URL}/teams/coach-team/${
            currentUser?.email
          }`
        );
        return data;
      }
      return [];
    },
  });

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
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [isCoachDetailsModal, setIsCoachDetailsModal] = useState(false);
  const [coachDetails, setCoachDetails] = useState([]);

  const coachModalHandler = (team) => {
    setSelectedTeam(team);
    setIsCoachModalOpen(true);
  };

  const detailsModalHandler = (coach) => {
    setCoachDetails(coach);
    setIsCoachDetailsModal(true);
  };

  const handleRemoveCoach = async (coach, record) => {
    await axiosSecure
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/teams/coach/${
          coach?.email
        }?team=${record.key}`
      )
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Coach removed from the team");
        }
      });
  };

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
      render: (coaches, record) => (
        <div>
          {coaches.length === 0 ? (
            <div className="flex gap-2">
              <Button onClick={() => coachModalHandler(record)}>
                Assign Coaches
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Dropdown
                menu={{
                  items: coaches.map((coach) => {
                    return {
                      key: coach._id,
                      label: (
                        <div className="flex items-center justify-between gap-5">
                          <p onClick={() => detailsModalHandler(coach)}>
                            {coach.name}
                          </p>
                          <AiTwotoneDelete
                            onClick={() => handleRemoveCoach(coach, record)}
                            className="text-danger hover:text-danger2"
                          />
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
              <Button onClick={() => coachModalHandler(record)}>+</Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  const getFilteredCoaches = () => {
    const selectedCoachEmails = selectedTeam.coaches.map(
      (coach) => coach.email
    );

    // Filter coaches whose email matches any of the coach emails in the selected team
    const filteredCoaches = coaches.filter(
      (coach) => !selectedCoachEmails.includes(coach.email)
    );

    return filteredCoaches;
  };

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <div className="flex justify-between">
            <SectionHeader title={"Teams"} quantity={teams.length} />
            {currentUser?.role === "admin" && (
              <Button
                type="btn"
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient text-white"
              >
                Add Team +
              </Button>
            )}
            <AddTeamModal
              refetch={refetch}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              coaches={coaches}
            />
            <AssignCoachModal
              refetch={refetch}
              selectedTeam={selectedTeam}
              isModalOpen={isCoachModalOpen}
              setIsModalOpen={setIsCoachModalOpen}
              coaches={selectedTeam.length !== 0 ? getFilteredCoaches() : []}
            />
            <CoachDetailsModal
              coachDetails={coachDetails}
              isCoachDetailsModal={isCoachDetailsModal}
              setIsCoachDetailsModal={setIsCoachDetailsModal}
            />
          </div>
          {currentUser?.role === "admin" ? (
            <Table dataSource={data} columns={columns} pagination={false} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {coachTeams.map((team) => (
                <Card key={team?._id} bordered={false} title={team?.teamName}>
                  <p className="text-base font-medium text-gray-500">
                    Sport: {team?.sports}
                  </p>
                  <p className="text-base font-medium text-gray-500">
                    Admin: {team?.adminEmail}
                  </p>
                  <p className="flex flex-wrap text-base font-medium text-gray-500">
                    Coaches: {team?.coaches.map((coach, i) => (
                      <span className="ml-1 font-normal" key={i}>
                        {coach} ,
                      </span>
                    ))}
                  </p>
                </Card>
              ))}
            </div>
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
