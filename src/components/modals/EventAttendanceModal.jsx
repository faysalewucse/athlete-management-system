import { Button, Dropdown, Modal, Select, Table, Tooltip } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format, parseISO } from "date-fns";

const EventAttendanceModal = ({
  isAttendanceModalOpen,
  setAttendaceModalOpen,
  event,
  athletes,
  refetchEvents,
}) => {
  const [axiosSecure] = useAxiosSecure();

  const handleCancel = () => {
    setAttendaceModalOpen(false);
  };

  const [loading, setLoading] = useState([]);
  const [participants, setParticipants] = useState(event.participants || []);

  const handleParticipants = (email, value) => {
    // Check if the athleteEmail already exists in the array
    const existingParticipant = participants.find(
      (participant) => participant.athleteEmail === email
    );

    if (existingParticipant) {
      // If it exists, update the status
      const updatedStatus = participants.map((participant) =>
        participant.athleteEmail === email
          ? { athleteEmail: email, status: value }
          : participant
      );
      setParticipants(updatedStatus);
    } else {
      // If it doesn't exist, add a new object to the array
      setParticipants([
        ...participants,
        { athleteEmail: email, status: value },
      ]);
    }
  };

  const columns = [
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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div className="">
          <Select
            style={{ width: 100 }}
            onChange={(value) => handleParticipants(record.email, value)}
            defaultValue={status}
            options={[
              {
                value: "p",
                label: "P",
              },
              {
                value: "a",
                label: "A",
              },
              {
                value: "l",
                label: "L",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const data = athletes?.map((athlete) => {
    const participant = event.participants?.find(
      (p) => p.athleteEmail === athlete.email
    );

    return {
      key: athlete._id,
      nameEmail: { name: athlete.fullName, email: athlete.email },
      email: athlete.email,
      teams: athlete.teams,
      status: participant ? participant.status : "p",
    };
  });

  const uploadAttendance = async () => {
    setLoading(true);

    console.log(participants);

    const missingAthleteEmails = athletes
      .map((athlete) => athlete.email)
      .filter(
        (email) =>
          !participants?.some(
            (participant) => participant.athleteEmail === email
          )
      );

    // Add missing athlete emails with default status "a"
    const updatedParticipants = [
      ...participants,
      ...missingAthleteEmails.map((email) => ({
        athleteEmail: email,
        status: "p",
      })),
    ];

    try {
      await axiosSecure
        .post(`/event/add-participants/${event._id}`, updatedParticipants)
        .then(() => {
          refetchEvents();
          setAttendaceModalOpen(false);
          toast.success("Participants Updated");
        });
    } catch (error) {
      console.log({ error });
      toast.error("Error uploading");
    } finally {
      setLoading(false);
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
        <div className="mb-5">
          <h1 className="text-xl font-semibold">{event.eventName}</h1>
          <p>{event.date && format(parseISO(event.date), "MM-dd-yyyy")}</p>
        </div>
        <h1 className="font-bold text-gradient text-xl">
          Check the present athletes
        </h1>
        <div className="my-5">
          <Table size="small" columns={columns} dataSource={data} />
        </div>
        <Button
          loading={loading}
          onClick={uploadAttendance}
          className="ml-auto block"
        >
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default EventAttendanceModal;
