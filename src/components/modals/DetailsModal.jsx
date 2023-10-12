import { Modal } from "antd";
import avatar from "/avatar.png";

const DetailsModal = ({ isDetailsModal, setIsDetailsModal, coachDetails }) => {
  const handleCancel = () => {
    setIsDetailsModal(false);
  };
  return (
    <Modal open={isDetailsModal} footer onCancel={handleCancel}>
      <div>
        <h1 className="text-xl text-gradient font-semibold text-center border-b border-black mb-4">
          Coach Details
        </h1>
        <div className="flex justify-between items-center text-base">
          <div className="w-[9rem]">
            <img
              className="w-full rounded"
              src={coachDetails?.photoURL ? coachDetails?.photoURL : avatar}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-500">
              {" "}
              Name: <span>{coachDetails?.name}</span>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Email:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href={`mailto:${coachDetails?.email}`}
              >
                {coachDetails?.email}
              </a>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Gender: <span>{coachDetails?.gender}</span>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Phone:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href={`tel:${coachDetails?.phoneNumber}`}
              >
                {coachDetails?.phoneNumber}
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
