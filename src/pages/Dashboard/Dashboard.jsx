import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import { useAuth } from "../../contexts/AuthContext";
import { DashboardCard } from "../../components/cards/DashboardCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import HashLoader from "react-spinners/HashLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: users, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users`
      );
      return data;
    },
  });

  const quantity = {
    admin: 0,
    coach: 0,
    athlete: 0,
    parents: 0,
  };

  users?.forEach((user) => {
    quantity[user.role]++;
  });

  return (
    <div className="min-h-[90vh] p-5">
      {!isLoading ? (
        <Container>
          {currentUser?.role === "sadmin" && (
            <div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <DashboardCard
                  number={users?.length - 1}
                  title={"Total Users"}
                />
                <DashboardCard number={quantity.admin} title={"Total Admins"} />
                <DashboardCard
                  number={quantity.coach}
                  title={"Total Coaches"}
                />
                <DashboardCard
                  number={quantity.athlete}
                  title={"Total Atheletes"}
                />
                <DashboardCard
                  number={quantity.parents}
                  title={"Total Parents"}
                />
              </div>
            </div>
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh]">
          <HashLoader
            color={"#43a7ca"}
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
