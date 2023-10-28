import { Button, Checkbox, Dropdown, Modal, Table, Tooltip } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EventAttendanceModal = ({
  isAttendanceModalOpen,
  setAttendaceModalOpen,
  event,
  athletes,
  refetchEvents,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const [participants, setParticipants] = useState(event?.participants || []);

  const handleCancel = () => {
    setAttendaceModalOpen(false);
  };

  const columns = [
    {
      title: <div className="border h-5 w-5 rounded"></div>,
      key: "present",
      dataIndex: "email",
      render: (email) => (
        <Checkbox
          checked={participants?.indexOf(email) !== -1}
          onChange={() => checkedAthletes(email)}
        ></Checkbox>
      ),
    },
    {
      title: "Name",
      dataIndex: "nameEmail",
      key: "nameEmail",
      render: (data) => (
        <Tooltip placement="top" title={data.email}>
          {data.name}
          <div className="sm:hidden text-xs text-gray-400">{data.email}</div>
        </Tooltip>
      ),
    },
    {
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
      render: (teams) => (
        <div className="">
          {teams?.length > 0 && (
            <div className="flex gap-2">
              {console.log(teams)}

              <Dropdown
                placement="bottomRight"
                menu={{
                  items: teams.map((team) => {
                    return {
                      key: team._id,
                      label: <p>{team.teamName} </p>,
                    };
                  }),
                }}
                trigger={["click"]}
              >
                <Button>
                  Teams
                  <BiChevronDown />
                </Button>
              </Dropdown>
            </div>
          )}
        </div>
      ),
    },
  ];

  const data = athletes?.map((athlete) => {
    return {
      key: athlete._id,
      nameEmail: { name: athlete.fullName, email: athlete.email },
      email: athlete.email,
      teams: athlete.teams,
    };
  });

  // Function to add or remove athleteEmail from the state
  const checkedAthletes = (athleteEmail) => {
    setParticipants((prevEmails) => {
      const index = prevEmails?.indexOf(athleteEmail);

      if (index === -1) {
        // If not in the array, add it
        return [...prevEmails, athleteEmail];
      } else {
        // If already in the array, remove it
        prevEmails?.splice(index, 1);
        return [...prevEmails];
      }
    });
  };

  const uploadAttendance = async () => {
    try {
      await axiosSecure
        .post(
          `${import.meta.env.VITE_BASE_API_URL}/event/add-participants/${
            event._id
          }`,
          participants
        )
        .then(() => {
          refetchEvents();
          setAttendaceModalOpen(false);
          toast.success("Participants Added");
        });
    } catch (error) {
      console.log({ error });
      toast.error("Error uploading");
    }
  };

  return (
    <Modal
      open={isAttendanceModalOpen}
      footer
      okText="Update"
      onCancel={handleCancel}
    >
      <div>
        <h1 className="font-bold text-gradient text-xl">
          Check the present athletes
        </h1>
        <div className="my-5">
          <Table size="small" columns={columns} dataSource={data} />
        </div>
        <Button onClick={uploadAttendance} className="ml-auto block">
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default EventAttendanceModal;
