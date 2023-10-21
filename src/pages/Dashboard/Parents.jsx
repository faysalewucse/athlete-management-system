import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMenuKebab } from "react-icons/ci";
import toast from "react-hot-toast";
import { useState } from "react";
import { Dropdown, Pagination, Space, Table } from "antd";
import CustomLoader from "../../components/CustomLoader";
import ParentDetailsModal from "../../components/modals/ParentDetailsModal";

const Parents = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isParentDetailsModal, setIsParentDetailsModal] = useState(false);
  const [parentDetails, setParentDetails] = useState([]);

  const {
    isLoading,
    data: parents = [],
    refetch,
  } = useQuery({
    queryKey: ["parents", currentUser?.email],
    queryFn: async () => {
      let URL = `adminEmail=${currentUser.email}`;
      if (currentUser?.role === "coach")
        URL = `adminEmail=${currentUser.adminEmail}`;
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users/byRole?role=parents&${URL}`
      );
      return data;
    },
  });

  // status update
  const handleApprove = async (id) => {
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=approved`)
      .then((res) => {
        if (res.status === 200) {
          refetch().then(() => toast.success("Parents approved"));
        }
      });
  };

  // pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(10);
    refetch();
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentParents = parents.slice(startIndex, endIndex);

  const handleParentDetailsModal = (parent) => {
    setIsParentDetailsModal(true);
    setParentDetails(parent);
  };

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
      render: (text, record) => (
        <button onClick={() => handleParentDetailsModal(record)}>{text}</button>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title:
        currentUser?.role !== "sadmin" && currentUser?.role !== "admin"
          ? "Action"
          : "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentUser?.role !== "sadmin" && currentUser?.role !== "admin" && (
            <div>
              {record?.status === "pending" ? (
                <div>
                  <button
                    onClick={() => handleApprove(record?.key)}
                    className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div className="flex text-sm items-center space-x-4 justify-center">
                  <button className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Change Role
                  </button>
                  <button className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Edit
                  </button>
                  <button className="md:block hidden bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Delete
                  </button>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 0,
                          label: <p>Change Role</p>,
                        },
                        {
                          key: 1,
                          label: <p>Edit</p>,
                        },
                        {
                          key: 2,
                          label: (
                            <p className="text-danger hover:text-danger2">
                              Delete
                            </p>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <CiMenuKebab className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                  </Dropdown>
                </div>
              )}
            </div>
          )}
        </Space>
      ),
    },
  ];

  const data = currentParents?.map((parent) => {
    return {
      key: parent._id,
      image: parent.photoURL ? parent.photoURL : avatar,
      name: parent.name,
      email: parent.email,
      status: parent.status,
    };
  });

  return (
    <div className="min-h-[90vh] bg-transparent md:p-10 p-2 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Parents"} quantity={parents.length} />
          <Table dataSource={data} columns={columns} pagination={false} />
          <Pagination
            current={currentPage}
            total={parents.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />
          <ParentDetailsModal
            isParentDetailsModal={isParentDetailsModal}
            setIsParentDetailsModal={setIsParentDetailsModal}
            parentDetails={parentDetails}
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

export default Parents;
