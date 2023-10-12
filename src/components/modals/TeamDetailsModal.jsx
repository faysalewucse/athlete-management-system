import { Modal } from "antd";

const TeamDetailsModal = ({
  isTeamDetailsModal,
  setIsTeamDetailsModal,
  teamDetails,
}) => {
  const handleCancel = () => {
    setIsTeamDetailsModal(false);
  };
  return (
    <Modal open={isTeamDetailsModal} footer onCancel={handleCancel}>
      <div>
        <h1 className="text-xl text-gradient font-semibold text-center border-b border-black mb-4">
          Team Details
        </h1>
        <div className="flex justify-between items-center text-base">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-500">
              Name: <span>{teamDetails?.teamName}</span>
            </p>
            <p className="font-medium text-gray-500">
              sports: {teamDetails?.sports}
            </p>
            <div className="flex font-medium text-gray-500">
              Coaches:
              <ul className="ml-1">
                {teamDetails?.coaches?.map((coach, i) => (
                  <li key={i}>{coach}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TeamDetailsModal;
