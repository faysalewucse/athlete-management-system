import { Modal, Select } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const { Option } = Select;

const ChangeRoleModal = ({
  changeRoleModal,
  setChangeRoleModal,
  user,
  refetch,
}) => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [role, setRole] = useState("");

  let roles = [];
  if (currentUser.role === "admin") roles = ["athlete", "parent", "coach"];
  if (currentUser.role === "sadmin")
    roles = ["athlete", "parent", "coach", "admin"];

  const handleOk = async () => {
    await axiosSecure
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/changeUserRole/${
          user?.email
        }?role=${role}`
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Role Updated");
          refetch();
          setChangeRoleModal(false);
        }
      });
  };

  return (
    <Modal
      open={changeRoleModal}
      onCancel={() => setChangeRoleModal(false)}
      onOk={handleOk}
      title={"Change Role"}
      okType="danger"
    >
      <div className="flex items-center justify-between p-10">
        <p>{user?.role}</p>
        <span>{"----------->"}</span>
        <Select onSelect={(value) => setRole(value)} placeholder="select">
          {roles.map(
            (role, i) =>
              role !== user?.role && (
                <Option key={i} value={role}>
                  {role}
                </Option>
              )
          )}
        </Select>
      </div>
    </Modal>
  );
};

export default ChangeRoleModal;
