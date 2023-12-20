import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm, Space } from "antd";
import toast from "react-hot-toast";
import ArchivedFormsTable from "./ArchivedFormsTable";
import { useEffect, useState } from "react";

const ArchiveTab = ({ tab }) => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState("");

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

  const deleteHandler = async (id) => {
    try {
      await axiosSecure.delete(`/forms/${id}`).then((res) => {
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

  const showPopconfirm = (id) => {
    setItemId(id);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
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
            // onClick={() => handleArchive(record?.key)}
          >
            <Popconfirm
              title="Delete Form!"
              description="Are you sure to delete this Form?"
              open={itemId === record?.key ? open : false}
              onConfirm={() => deleteHandler(record?.key)}
              okButtonProps={{
                loading: confirmLoading,
              }}
              onCancel={handleCancel}
            >
              <button
                onClick={() => showPopconfirm(record?.key)}
                className="hidden md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
              >
                Delete
              </button>
            </Popconfirm>
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
