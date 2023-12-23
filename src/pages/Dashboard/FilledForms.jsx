import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../components/CustomLoader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Space, Table } from "antd";

const FilledForms = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { isLoading: isFilledFormsLoading, data: filledForms = [] } = useQuery({
    queryKey: ["filled-forms", currentUser?.email],
    queryFn: async () => {
      const email =
        currentUser?.role === "athlete"
          ? currentUser?.email
          : currentUser?.adminEmail;

      const { data } = await axiosSecure.get(
        `/filled-forms/${email}?forCoach=true`
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
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  const data = filledForms?.map((form) => {
    return {
      key: form._id,
      formName: form.formName,
      formFile: form.formFile,
      teamName: form.teamName,
      organization: form.organization,
      email: form.addedBy.email,
      isArchived: form?.isArchived,
    };
  });

  return isFilledFormsLoading ? (
    <div className="min-h-[80vh] flex justify-center items-center">
      <CustomLoader />
    </div>
  ) : (
    <div>
      {" "}
      <Table
        size="small"
        className="mt-5"
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default FilledForms;
