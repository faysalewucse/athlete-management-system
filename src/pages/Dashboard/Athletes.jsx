import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMenuKebab } from "react-icons/ci";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button, Dropdown, Pagination, Space, Table } from "antd";
import CustomLoader from "../../components/CustomLoader";
import { BiChevronDown } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import TeamDetailsModal from "../../components/modals/TeamDetailsModal";
import AssignTeamModal from "../../components/modals/AssignTeamModal";

export const Athletes = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    data: athletes = [],
    refetch,
  } = useQuery({
    queryKey: ["athletes", currentUser?.email],
    queryFn: async () => {
      let URL = `adminEmail=${currentUser?.email}`;
      if (currentUser?.role === "coach") {
        URL = `adminEmail=${currentUser?.adminEmail}`;
      }
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users/byRole?role=athlete&${URL}`
      );
      return data;
    },
  });

  const { data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams/coach-team/${
          currentUser?.email
        }`
      );
      return data;
    },
  });

  // status update
  const handleApprove = async (id) => {
    if (currentUser?.status === "pending") {
      toast.error("you are not eligible to approve!");
      return;
    }
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=approved`)
      .then((res) => {
        if (res.status === 200) {
          refetch().then(() => toast.success("Athlete approved"));
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
  const currentAthletes = athletes.slice(startIndex, endIndex);

  const [isTeamDetailsModal, setIsTeamDetailsModal] = useState(false);
  const [teamDetails, setTeamDetails] = useState([]);

  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [isModalOpen, setIsModalOpen] = useState("");

  const modalHandler = (athlete) => {
    setSelectedAthlete(athlete);
    if (athlete.status === "pending") {
      toast.error("Approve athlete before assigning to team");
    } else setIsModalOpen(true);
  };

  const handleTeamDetails = (team) => {
    setTeamDetails(team);
    setIsTeamDetailsModal(true);
  };

  const getFilteredTeam = () => {
    const selectedTeamsId = selectedAthlete.teams?.map((team) => team._id);

    const filteredTeams = teams?.filter(
      (team) => !selectedTeamsId?.includes(team?._id)
    );
    return filteredTeams;
  };

  const handleRemoveAthlete = async (team, athlete) => {
    await axiosSecure
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/teams/athlete/${
          athlete?.email
        }?team=${team?._id}`
      )
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Athlete removed from the team");
        }
      });
  };

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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
      render: (teams, record) => (
        <div>
          {teams?.length > 0 ? (
            <div className="flex gap-2">
              <Dropdown
                menu={{
                  items: teams.map((team) => {
                    return {
                      key: team._id,
                      label: (
                        <div className="flex items-center justify-between">
                          <p onClick={() => handleTeamDetails(team)}>
                            {team.teamName}
                          </p>
                          <AiTwotoneDelete
                            onClick={() => handleRemoveAthlete(team, record)}
                            className="text-danger text-base hover:text-danger2"
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
                    View Teams ({teams.length})
                    <BiChevronDown />
                  </Space>
                </Button>
              </Dropdown>
              <Button onClick={() => modalHandler(record)}>+</Button>
            </div>
          ) : (
            <Button onClick={() => modalHandler(record)}>Assign To Team</Button>
          )}
        </div>
      ),
    },
    {
      title: currentUser?.role !== "sadmin" ? "Action" : "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentUser?.role === "coach" && (
            <div>
              {record?.status === "pending" ? (
                <div>
                  <Button
                    type="btn"
                    onClick={() => handleApprove(record?.key)}
                    className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Approve
                  </Button>
                </div>
              ) : (
                <div className="flex text-sm items-center space-x-4 justify-center">
                  <button className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Change Role
                  </button>

                  <button className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Delete
                  </button>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 0,
                          label: <p>Change Role</p>,
                        },

                        {
                          key: 2,
                          label: (
                            <p className="text-danger hover:text-danger2">
                              Delete
                            </p>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <CiMenuKebab className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                  </Dropdown>
                </div>
              )}
            </div>
          )}
        </Space>
      ),
    },
  ];

  const data = currentAthletes?.map((athlete) => {
    return {
      key: athlete._id,
      image: athlete.photoURL ? athlete.photoURL : avatar,
      name: athlete.name,
      email: athlete.email,
      teams: athlete.teams,
      status: athlete.status,
    };
  });

  return (
    <div className="min-h-[90vh] bg-transparent p-5 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Athletes"} quantity={athletes?.length} />
          <Table
            className="mt-5"
            dataSource={data}
            columns={columns}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            total={athletes.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />
          {currentUser?.role == "coach" && (
            <AssignTeamModal
              refetch={refetch}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedUser={selectedAthlete}
              teams={selectedAthlete?.length !== 0 ? getFilteredTeam() : []}
              assignTo={"athlete"}
            />
          )}
          <TeamDetailsModal
            teamDetails={teamDetails}
            isTeamDetailsModal={isTeamDetailsModal}
            setIsTeamDetailsModal={setIsTeamDetailsModal}
          />
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
