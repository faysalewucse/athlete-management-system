import { Button, Checkbox, Dropdown, Modal, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";

const EventAttendanceModal = ({
  isAttendanceModalOpen,
  setAttendaceModalOpen,
  event,
  athletes,
  refetchAthletes,
}) => {
  const handleCancel = () => {
    setAttendaceModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
      render: (teams) => (
        <div>
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
      title: "Present",
      key: "present",
      dataIndex: "email",
      render: (email) => (
        <Checkbox onChange={() => checkedAthletes(email)}></Checkbox>
      ),
    },
  ];

  const data = athletes?.map((athlete) => {
    return {
      key: athlete._id,
      name: athlete.fullName,
      email: athlete.email,
      teams: athlete.teams,
    };
  });

  const [uniqueEmails, setUniqueEmails] = useState([]);

  // Function to add or remove athleteEmail from the state
  const checkedAthletes = (athleteEmail) => {
    setUniqueEmails((prevEmails) => {
      const index = prevEmails.indexOf(athleteEmail);

      if (index === -1) {
        // If not in the array, add it
        return [...prevEmails, athleteEmail];
      } else {
        // If already in the array, remove it
        prevEmails.splice(index, 1);
        return [...prevEmails];
      }
    });
  };

  const uploadAttendance = () => {
    try {
      console.log(uniqueEmails);
      setAttendaceModalOpen(false);
    } catch (error) {
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
