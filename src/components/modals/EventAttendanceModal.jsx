import { Button, Modal } from "antd";
import TeamCheckBoxGroup from "../TeamCheckBoxGroup";

const EventAttendanceModal = ({
  isAttendanceModalOpen,
  setAttendaceModalOpen,
  event,
  teams,
  refetchCoachTeams,
}) => {
  console.log(teams);

  const handleCancel = () => {
    setAttendaceModalOpen(false);
  };

  return (
    <Modal
      open={isAttendanceModalOpen}
      footer
      okText="Update"
      onCancel={handleCancel}
    >
      <div>
        {teams?.map((team) => (
          <TeamCheckBoxGroup key={team._id} team={team} />
        ))}
        <Button className="ml-auto block">Update</Button>
      </div>
    </Modal>
  );
};

export default EventAttendanceModal;
