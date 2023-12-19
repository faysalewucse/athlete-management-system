import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import toast from "react-hot-toast";
import ArchivedFormsTable from "./ArchivedFormsTable";
import { useEffect } from "react";

const ArchiveTab = ({ tab }) => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const {
    isLoading,
    data: forms = [],
    refetch,
  } = useQuery({
    queryKey: ["archivedForms", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/forms?addedBy=${currentUser?.email}&isArchived=true`
      );
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [tab]);

  const handleArchive = async (id) => {
    try {
      const response = await axiosSecure.patch(`/forms/${id}`, {
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
              onClick={() => window.open(record?.formFile, "_blank")}
              className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
            >
              View
            </button>
          </div>

          <div
            className="flex text-sm items-center space-x-4 justify-center"
            onClick={() => handleArchive(record?.key)}
          >
            <button className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
              Delete
            </button>
          </div>
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  return (
    <div>
      <div>
        <ArchivedFormsTable forms={forms} columns={columns} />
      </div>
    </div>
  );
};

export default ArchiveTab;
