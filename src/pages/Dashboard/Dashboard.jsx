import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { DashboardCard } from "../../components/cards/DashboardCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import HashLoader from "react-spinners/HashLoader";
import Button from "../../components/shared/Button";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      if (currentUser?.role !== "sadmin") return [];
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/users`
      );
      return data;
    },
  });

  const quantity = users?.reduce(
    (acc, user) => {
      acc[user.role]++;
      return acc;
    },
    {
      admin: 0,
      coach: 0,
      athlete: 0,
      parents: 0,
    }
  );

  return (
    <div className="min-h-[90vh] p-5">
      {!isLoading ? (
        <div className="max-w-7xl">
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
          {currentUser?.role === "parents" && (
            <div>
              <Button text={"Add Athlete +"} />
              <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <DashboardCard number={users?.length} title={"Total Users"} />
              </div>
            </div>
          )}
        </div>
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
