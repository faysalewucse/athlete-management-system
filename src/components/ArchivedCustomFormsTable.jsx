import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import { useAuth } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import CustomFormModal from "./modals/CustomFormModal";
import { useState } from "react";

const ArchivedCustomFormsTable = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);

  const modalHandler = (form) => {
    console.log(form);
    setSelectedForm(form);
    setFormModalOpen(true);
  };

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

  const data = customForms
    ?.filter((form) => form.isArchived)
    ?.map((form) => {
      return {
        key: form._id,
        formName: form.formName,
        team: form.team,
        fields: form.fields,
        // organization: form.organization,
        isArchived: form?.isArchived,
      };
    });

  const deleteHandler = async (id) => {
    try {
      await axiosSecure.delete(`/custom-form/${id}`).then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Form deleted successfully");
          setOpen(false);
          setConfirmLoading(false);
        }
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
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
              View
            </button>
          </div>

          {(currentUser?.role === "coach" ||
            currentUser.role === "sub_coach") && (
            <div
              className="flex text-sm items-center space-x-4 justify-center"
              onClick={() => deleteHandler(record?.key)}
            >
              <button className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                Delete
              </button>
            </div>
          )}
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  return (
    <div className="flex-1">
      <p className="font-bold text-gradient text-lg">Custom Archived Forms</p>
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

export default ArchivedCustomFormsTable;
