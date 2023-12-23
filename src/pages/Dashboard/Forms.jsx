import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FormsTable from "../../components/FormsTable";
import { Modal, Space, Tabs } from "antd";
import { useState } from "react";
import CustomFormsTable from "../../components/CustomFormsTable";
import CustomLoader from "../../components/CustomLoader";
import CustomFormModal from "../../components/modals/CustomFormModal";

const Forms = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [tab, setTab] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);

  const onChange = (key) => {
    setTab(key);
  };

  const { isLoading: isPdfFormsLoading, data: pdfForms = [] } = useQuery({
    queryKey: ["pdf-forms", currentUser?.email],
    queryFn: async () => {
      let email;
      if (currentUser.role === "admin") email = currentUser.email;
      else email = currentUser?.adminEmail;

      const { data } = await axiosSecure.get(`/pdf-forms/${email}`);
      return data;
    },
  });

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

  const columns = [
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
              onClick={() => window.open(record?.formFile, "_blank")}
              className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
            >
              View
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
      label: "PDF Forms",
      children: (
        <FormsTable
          forms={pdfForms.filter((form) => !form.isArchived)}
          columns={columns}
        />
      ),
    },
    {
      key: "2",
      label: "Custom Forms",
      children: (
        <CustomFormsTable
          forms={customForms.filter((form) => !form.isArchived)}
          columns={customFormsColumns}
        />
      ),
    },
  ];

  const modalHandler = (form) => {
    console.log(form);
    setSelectedForm(form);
    setFormModalOpen(true);
  };

  return isPdfFormsLoading || isCustomFormsLoading ? (
    <div className="min-h-[80vh] flex items-center justify-center">
      <CustomLoader />
    </div>
  ) : (
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

export default Forms;
