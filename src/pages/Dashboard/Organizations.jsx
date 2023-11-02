import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Container } from "../../components/Container";
import { HashLoader } from "react-spinners";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { Pagination, Table } from "antd";

const Organizations = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    data: organizations = [],
    refetch,
  } = useQuery({
    queryKey: ["organizations", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/organizations`);
      return data;
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(10);
    refetch();
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentOrganizations = organizations.slice(startIndex, endIndex);

  const data = currentOrganizations.map((organization) => {
    return {
      key: organization._id,
      name: organization.adminName,
      email: organization.adminEmail,
      organization: organization.organization,
    };
  });

  const columns = [
    {
      title: "Owner Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organizations",
      render: (text) => <p>{text}</p>,
    },
  ];

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader
            title={"Organizations"}
            quantity={organizations?.length}
          />
          <Table dataSource={data} columns={columns} pagination={false} />

          <Pagination
            current={currentPage}
            total={organizations.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right" }}
          />
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <HashLoader
            color={"#3b82f6"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default Organizations;
