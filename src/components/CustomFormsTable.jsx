import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import CustomFormModal from "./modals/CustomFormModal";

const CustomFormsTable = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);

  const {
    isLoading: isCustomFormsLoading,
    data: customForms = [],
    refetch,
  } = useQuery({
    queryKey: ["custom-forms", currentUser?.email],
    queryFn: async () => {
      let email;
      if (currentUser.role === "admin") email = currentUser.email;
      else email = currentUser?.adminEmail;

      const { data } = await axiosSecure.get(`/custom-forms/${email}`);
      return data;
    },
  });

  const handleArchive = async (id) => {
    try {
      const response = await axiosSecure.patch(`/custom-form/${id}`, {
        isArchived: true,
      });

      if (response.status === 200) {
        refetch();
        toast.success("Form archived Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const modalHandler = (form) => {
    setSelectedForm(form);
    setFormModalOpen(true);
  };

  const customFormsColumns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
    {
      title: "Assigned Team",
      dataIndex: "team",
      key: "key",
      render: (team) => <p>{team.teamName}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* {(currentUser?.role === "coach" ||
            currentUser.role === "sub_coach") && (
            <div>
              <button
                type="btn"
                onClick={() => handleEditForm(record)}
                className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
              >
                Edit
              </button>
            </div>
          )} */}
          <div>
            <button
              type="btn"
              onClick={() => modalHandler(record)}
              className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
            >
              Open
            </button>
          </div>

          {(currentUser?.role === "coach" ||
            currentUser.role === "sub_coach") && (
            <div
              className="flex text-sm items-center space-x-4 justify-center"
              onClick={() => handleArchive(record?.key)}
            >
              <button className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                Archive
              </button>
            </div>
          )}
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  const data = customForms
    ?.filter((form) => !form.isArchived)
    .map((form) => {
      return {
        key: form._id,
        formName: form?.formName,
        fields: form?.fields,
        team: form?.team,
        adminEmail: form?.addedBy?.email,
      };
    });

  return (
    <div>
      <Table
        size="small"
        className="mt-5"
        dataSource={data}
        columns={customFormsColumns}
        pagination={false}
      />

      <CustomFormModal
        formModalOpen={formModalOpen}
        selectedForm={selectedForm}
        setFormModalOpen={setFormModalOpen}
      />
    </div>
  );
};

export default CustomFormsTable;
