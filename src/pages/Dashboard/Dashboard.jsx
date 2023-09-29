import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { DashboardCard } from "../../components/cards/DashboardCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import HashLoader from "react-spinners/HashLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: bookedClasses } = useQuery({
    queryKey: ["bookedClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/bookedClasses/${
          currentUser.email
        }`
      );
      return data;
    },
  });

  const { data: instructorInfo, isLoading: infoLoading } = useQuery({
    queryKey: ["instructorInfo", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.role !== "instructor") return {};
      const { data } = await axiosSecure.get(
        `/instructorInfo/${currentUser?.email}`
      );
      return data;
    },
  });

  const { data: adminInfo, isLoading } = useQuery({
    queryKey: ["adminInfo", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.role !== "admin") return {};
      const { data } = await axiosSecure.get(`/adminInfo`);
      return data;
    },
  });

  return (
    <div className="dark:bg-slate-900 min-h-[90vh]">
      {!isLoading && !infoLoading ? (
        <Container extraStyle={"md:flex justify-between items-center"}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10">
              {currentUser?.role === "student" && (
                <DashboardCard
                  number={bookedClasses?.length || 0}
                  title={"Selected Class"}
                />
              )}
              {currentUser?.role === "instructor" && (
                <DashboardCard
                  number={instructorInfo?.instructorCount || 0}
                  title={"My Classes"}
                />
              )}
              {currentUser?.role === "instructor" && (
                <DashboardCard
                  number={instructorInfo?.studentCount[0].totalStudent || 0}
                  title={"Total Students"}
                />
              )}
              {currentUser?.role === "admin" && (
                <DashboardCard
                  number={adminInfo?.instructorCount || 0}
                  title={"Total Instructor"}
                />
              )}
              {currentUser?.role === "admin" && (
                <DashboardCard
                  number={adminInfo?.studentCount || 0}
                  title={"Total Student"}
                />
              )}
              {currentUser?.role === "admin" && (
                <DashboardCard
                  number={adminInfo?.classCount || 0}
                  title={"Total Class"}
                />
              )}
              {currentUser?.role === "admin" && (
                <DashboardCard
                  number={adminInfo?.adminCount || 0}
                  title={"Total Admin"}
                />
              )}
            </div>
          </div>
          {currentUser?.role === "admin" && (
            <div className="md:w-1/2 lg:w-1/3 py-5">
              <Pie
                data={{
                  labels: ["Instructors", "Classes", "Students", "Admins"],
                  datasets: [
                    {
                      label: "Total Number",
                      data: [
                        adminInfo?.instructorCount,
                        adminInfo?.studentCount,
                        adminInfo?.classCount,
                        adminInfo?.adminCount,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
              ;
            </div>
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh]">
          <HashLoader
            color={"#FF3607"}
            loading={isLoading || infoLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};
