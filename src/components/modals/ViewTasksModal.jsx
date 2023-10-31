import { Modal } from "antd";

const ViewTasksModal = ({ modalOpen, setIsModalOpen, plan }) => {
  return (
    <Modal
      open={modalOpen}
      title={`Tasks of ${plan.planName}`}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <div>
        {plan?.tasks.map((task) => (
          <div
            key={task._id}
            className="border border-dashed border-secondary p-2 rounded-md mb-3"
          >
            <p>Name: {task.taskName}</p>
            <p>Duration: {task.duration}</p>
            <p>Assigne: {task.assigne}</p>
            <p>Notes: {task.notes}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ViewTasksModal;
