import { useState } from "react";
import Button from "../../components/shared/Button";
import AddFormModal from "../../components/modals/AddFormModal";
import { useNavigate } from "react-router-dom";
import FormsTable from "./FormsTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";

const CurrentTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const {
    isLoading,
    data: forms = [],
    refetch,
  } = useQuery({
    queryKey: ["forms", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/forms?addedBy=${currentUser?.email}`
      );
      return data;
    },
  });

  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      // hidden: !currentUser?.role === "coach",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div>
            <button
              type="btn"
              // onClick={() => handleApprove(record?.key)}
              className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
            >
              Edit
            </button>
          </div>
          <div>
            <button
              type="btn"
              // onClick={() => handleApprove(record?.key)}
              className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
            >
              View
            </button>
          </div>

          <div className="flex text-sm items-center space-x-4 justify-center">
            <button className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
              Archive
            </button>
          </div>
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  return (
    <div>
      <div className="flex gap-5">
        <Button
          style={"rounded-lg mb-2"}
          onClickHandler={() => setIsModalOpen(true)}
          text={"Add PDF Form +"}
        />
        <Button
          style={"rounded-lg mb-2"}
          onClickHandler={() => navigate("custom-form")}
          text={"Add Custom Form +"}
        />
      </div>

      <div>
        <FormsTable forms={forms} columns={columns} />
      </div>
      <AddFormModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default CurrentTab;
