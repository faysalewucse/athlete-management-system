import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import CustomLoader from "../../components/CustomLoader";

export const Athletes = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    data: athletes = [],
    refetch,
  } = useQuery({
    queryKey: ["athletes", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/users/byRole?role=athlete&adminEmail=${currentUser?.email}}`
      );
      return data;
    },
  });

  // status update
  const handleApprove = async (id) => {
    if (currentUser?.status === "pending") {
      toast.error("you are not eligible to approve!");
      return;
    }
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user/${id}?status=approved`)
      .then((res) => {
        if (res.status === 200) {
          refetch().then(() => toast.success("Athlete approved"));
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
  const currentAthletes = athletes.slice(startIndex, endIndex);

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
      title: "Teams",
      dataIndex: "teams",
      key: "teams",
    },
    {
      title: currentUser?.role !== "sadmin" ? "Action" : "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {currentUser?.role === "coach" && (
            <div>
              {record?.status === "pending" ? (
                <div>
                  <Button
                    type="btn"
                    onClick={() => handleApprove(record?.key)}
                    className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer"
                  >
                    Approve
                  </Button>
                </div>
              ) : (
                <div className="flex text-sm items-center space-x-4 justify-center">
                  <button className="bg-primary hover:bg-primary2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Change Role
                  </button>
                  <button className="bg-success hover:bg-success2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Edit
                  </button>
                  <button className="bg-danger hover:bg-danger2 transition-300 text-white hite py-1 px-4 rounded cursor-pointer">
                    Delete
                  </button>
                  <MdDeleteOutline className="md:hidden cursor-pointer hover:text-danger transition-300 text-2xl" />
                </div>
              )}
            </div>
          )}
        </Space>
      ),
    },
  ];

  const data = currentAthletes?.map((athlete) => {
    return {
      key: athlete._id,
      image: athlete.photoURL ? athlete.photoURL : avatar,
      name: athlete.name,
      // teams:"",
      status: athlete.status,
    };
  });
  console.log(currentAthletes);

  return (
    <div className="min-h-[90vh] bg-transparent p-5 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Athletes"} quantity={athletes?.length} />
          <Table dataSource={data} columns={columns} pagination={false} />
          <Pagination
            current={currentPage}
            total={athletes.length}
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
