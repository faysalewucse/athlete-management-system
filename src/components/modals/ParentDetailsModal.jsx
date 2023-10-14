import { Modal } from "antd";
import avatar from "/avatar.png";

const ParentDetailsModal = ({
  isParentDetailsModal,
  setIsParentDetailsModal,
  parentDetails,
}) => {
  const handleCancel = () => {
    setIsParentDetailsModal(false);
  };
  return (
    <Modal open={isParentDetailsModal} footer onCancel={handleCancel}>
      <div>
        <h1 className="text-xl text-gradient font-semibold text-center border-b border-black mb-4">
          Parent Details
        </h1>
        <div className="flex justify-between items-center text-base">
          <div className="w-[9rem]">
            <img
              className="w-full rounded"
              src={parentDetails?.photoURL ? parentDetails?.photoURL : avatar}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-500">
              {" "}
              Name: <span>{parentDetails?.name}</span>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Email:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href={`mailto:${parentDetails?.email}`}
              >
                {parentDetails?.email}
              </a>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Gender: <span>{parentDetails?.gender}</span>
            </p>
            <p className="font-medium text-gray-500">
              {" "}
              Phone:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href={`tel:${parentDetails?.phoneNumber}`}
              >
                {parentDetails?.phoneNumber}
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ParentDetailsModal;
