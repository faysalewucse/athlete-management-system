import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMenuKebab } from "react-icons/ci";
import toast from "react-hot-toast";
import { Button, Dropdown, Pagination, Space, Table } from "antd";
import { useState } from "react";
import CustomLoader from "../../components/CustomLoader";
import AssignTeamModal from "../../components/modals/AssignTeamModal";
import { BiChevronDown } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import TeamDetailsModal from "../../components/modals/TeamDetailsModal";
import Swal from "sweetalert2";
import ChangeRoleModal from "../../components/modals/ChangeRoleModal";

const Coaches = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTeamDetailsModal, setIsTeamDetailsModal] = useState(false);
  const [teamDetails, setTeamDetails] = useState([]);
  const [changeRoleModal, setChangeRoleModal] = useState(false);
  const [coach, setCoach] = useState("");

  const {
    isLoading,
    data: coaches = [],
    refetch,
  } = useQuery({
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

  const { data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams/${currentUser?.email}`
      );
      return data;
    },
  });

  const handleApprove = async (id) => {
    if (currentUser?.status === "pending") {
      toast.error("you are not eligible to approve!");
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
    if (coach.status === "pending") {
      toast.error("Approve coach before assigning team");
    } else setIsModalOpen(true);
  };

  const handleChangeRole = (record) => {
    setCoach(record);
    setChangeRoleModal(true);
  };

  const handleTeamDetails = (team) => {
    setTeamDetails(team);
    setIsTeamDetailsModal(true);
  };

  const getFilteredTeam = () => {
    const selectedTeamsId = selectedCoach?.teams?.map((team) => team._id);

    const filteredTeams = teams.filter(
      (team) => !selectedTeamsId?.includes(team?._id)
    );
    return filteredTeams;
  };

  const handleDeleteTeam = async (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .delete(`${import.meta.env.VITE_BASE_API_URL}/teams/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Deleted!", "Team deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  const handleDeleteUser = async (user) => {
    console.log(user);
  };

  const data = currentCoaches?.map((coach) => {
    return {
      key: coach?._id,
      email: coach?.email,
      image: coach?.photoURL ? coach.photoURL : avatar,
      name: coach?.fullName,
      teams: coach?.teams,
      status: coach?.status,
      role: coach?.role,
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
                            onClick={() => handleDeleteTeam(team?._id)}
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
            <Button onClick={() => modalHandler(record)}>Assign Team</Button>
          )}
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
              {currentUser?.role === "admin" && record?.status === "pending" ? (
                <div>
                  <button
                    onClick={() => handleApprove(record?.key)}
                    className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className="flex text-sm items-center space-x-4 justify-center">
                  <button
                    onClick={() => handleChangeRole(record)}
                    className="hidden md:block bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() => handleDeleteUser(record)}
                    className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
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

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Coaches"} quantity={coaches?.length} />

          <Table
            size="small"
            className="mt-5"
            dataSource={data}
            pagination={false}
            columns={columns}
          />

          <Pagination
            current={currentPage}
            total={coaches.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />

          {currentUser?.role == "admin" && (
            <AssignTeamModal
              refetch={refetch}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedUser={selectedCoach}
              teams={selectedCoach?.length !== 0 ? getFilteredTeam() : []}
              assignTo={"coach"}
            />
          )}
          <TeamDetailsModal
            teamDetails={teamDetails}
            isTeamDetailsModal={isTeamDetailsModal}
            setIsTeamDetailsModal={setIsTeamDetailsModal}
          />

          <ChangeRoleModal
            changeRoleModal={changeRoleModal}
            setChangeRoleModal={setChangeRoleModal}
            user={coach}
            refetch={refetch}
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

export default Coaches;
