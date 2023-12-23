import { Space, Tabs } from "antd";
import CurrentTab from "../../components/CurrentTab";
import ArchiveTab from "../../components/ArchiveTab";
import { useState } from "react";
import CustomFormsTable from "../../components/CustomFormsTable";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CustomFormModal from "../../components/modals/CustomFormModal";

const FormLibrary = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [tab, setTab] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);

  const onChange = (key) => {
    setTab(key);
  };
  const { isLoading: isCustomFormsLoading, data: customForms = [] } = useQuery({
    queryKey: ["custom-forms", currentUser?.email],
    queryFn: async () => {
      let email;
      if (currentUser.role === "admin") email = currentUser.email;
      else email = currentUser?.adminEmail;

      const { data } = await axiosSecure.get(`/custom-forms/${email}`);
      return data;
    },
  });

  const customFormsColumns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
    {
      // hidden: !currentUser?.role === "coach",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {(currentUser?.role === "coach" ||
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
          )}
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

  const items = [
    {
      key: "1",
      label: "Current",
      children: <CurrentTab />,
    },
    {
      key: "2",
      label: "Archive",
      children: <ArchiveTab tab={tab} />,
    },
    {
      key: "3",
      label: "Custom Forms",
      children: (
        <CustomFormsTable forms={customForms} columns={customFormsColumns} />
      ),
    },
  ];

  const modalHandler = (form) => {
    setSelectedForm(form);
    setFormModalOpen(true);
  };

  return (
    <div className="p-10">
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />

      <CustomFormModal
        formModalOpen={formModalOpen}
        selectedForm={selectedForm}
        setFormModalOpen={setFormModalOpen}
      />
    </div>
  );
};

export default FormLibrary;
