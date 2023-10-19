import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import CustomLoader from "../../components/CustomLoader";
import { Button, Pagination, Space, Table } from "antd";
import { useState } from "react";

export const Admins = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const {
    isLoading,
    data: admins = [],
    refetch,
  } = useQuery({
    queryKey: ["admins", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/users/byRole?role=admin&adminEmail=${currentUser?.email}`
      );
      return data;
    },
  });

  const handleStatus = async (id, status) => {
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=${status}`)
      .then((res) => {
        if (res.status === 200) {
          refetch().then(() =>
            toast.success("Admin status updated successfully!")
          );
        }
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(7);
    refetch();
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAdmins = admins.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => (
        <img
          src={img}
          alt="Class"
          className="bg-dark p-1 w-10 h-10 rounded-full"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {console.log(record)}
          {record.status === "pending" && (
            <Button onClick={() => handleStatus(record?.key, "approved")}>
              Approve
            </Button>
          )}
          <Button
            type="primary"
            danger
            disabled={record.status === "disabled"}
            onClick={() => handleStatus(record?.key, "disabled")}
          >
            {record.status === "disabled" ? "Disabled" : "Disable"}
          </Button>
        </Space>
      ),
    },
  ];

  const data = currentAdmins?.map((admin) => {
    return {
      key: admin._id,
      image: admin.photoURL ? admin.photoURL : avatar,
      name: admin.name,
      email: admin.email,
      status: admin.status,
    };
  });

  return (
    <div className="min-h-[90vh] bg-transparent p-5 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Admins"} quantity={admins?.length} />
          {/* <div>
            {admins?.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center bg-gradient text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="p-2">Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => {
                  const { name, photoURL } = admin;
                  return (
                    <tr
                      key={admin._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="py-2">
                        <img
                          src={photoURL ? photoURL : avatar}
                          alt="Class"
                          className="bg-dark p-1 w-10 h-10 mx-auto rounded-full"
                        />
                      </td>
                      <td>{name}</td>

                      <td>
                        <div className="flex text-sm items-center space-x-4 justify-center">
                          {admin.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatus(admin?._id, "approved")
                              }
                              className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer "
                            >
                              Approve
                            </button>
                          )}
                          <button
                            disabled={admin.status === "deleted"}
                            onClick={() => handleStatus(admin?._id, "deleted")}
                            className="md:block bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700"
                          >
                            {admin?.status === "deleted" ? "Deleted" : "Delete"}
                          </button>
                          <MdDeleteOutline className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="border p-5 mt-20 border-primary rounded-lg text-xl text-center">
              No Admins here.
            </h1>
          )}
          </div> */}
          <Table
            className="mt-5"
            columns={columns}
            pagination={false}
            dataSource={data}
          />
          <Pagination
            current={currentPage}
            total={admins.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};
