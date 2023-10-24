import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { DashboardCard } from "../../components/cards/DashboardCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Button from "../../components/shared/Button";
import { useState } from "react";
import AddTeamModal from "../../components/modals/AddTeamModal";
import CustomLoader from "../../components/CustomLoader";
import Pending from "./Pending";
import { Container } from "../../components/Container";
import AddAthleteModal from "../../components/modals/AddAthleteModal";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      let URL = "/users";
      if (currentUser?.role === "admin")
        URL = `/users/coach-athlete-parents/${currentUser?.email}`;
      else if (currentUser?.role === "coach")
        URL = `/users/athlete-parents/${currentUser?.adminEmail}`;
      else if (currentUser?.role === "parents")
        URL = `/users/athlete/${currentUser?.email}`;

      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}${URL}`
      );
      return data;
    },
  });

  const {
    isLoadingTeamData,
    data: teams = [],
    refetch,
  } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      if (currentUser?.role === "admin" || currentUser?.role === "coach") {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_BASE_API_URL}/teams/${currentUser?.email}`
        );
        return data;
      }
      return [];
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
        <Container>
          {currentUser?.role === "sadmin" && (
            <div>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <DashboardCard
                  number={users?.length != 0 ? users.length - 1 : 0}
                  title={"Total Users"}
                  route="/dashboard"
                />
                <DashboardCard
                  number={quantity.admin}
                  title={"Total Admins"}
                  route="/dashboard/admins"
                />
                <DashboardCard
                  number={quantity.coach}
                  title={"Total Coaches"}
                  route="/dashboard/coaches"
                />
                <DashboardCard
                  number={quantity.athlete}
                  title={"Total Athletes"}
                  route="/dashboard/athletes"
                />
                <DashboardCard
                  number={quantity.parents}
                  title={"Total Parents"}
                  route="/dashboard/parents"
                />
              </div>
            </div>
          )}
          {currentUser?.role === "admin" && (
            <div>
              {currentUser.status === "pending" ? (
                <Pending role={currentUser?.role} />
              ) : (
                <div>
                  <Button
                    style={"rounded-lg"}
                    onClickHandler={() => setIsModalOpen(true)}
                    text={"Add Team +"}
                  />
                  <AddTeamModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                    coaches={users.filter((user) => user.role === "coach")}
                  />
                  <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                    <DashboardCard
                      number={quantity.coach}
                      title={"Total Coaches"}
                      route="/dashboard/coaches"
                    />
                    <DashboardCard
                      number={quantity.athlete}
                      title={"Total Athletes"}
                      route="/dashboard/athletes"
                    />
                    <DashboardCard
                      number={quantity.parents}
                      title={"Total Parents"}
                      route="/dashboard/parents"
                    />
                    <DashboardCard
                      number={teams.length}
                      title={"Total Teams"}
                      route="/dashboard/teams"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {currentUser?.role === "coach" && (
            <div className="min-h-[80vh]">
              {currentUser.status === "pending" ? (
                <Pending />
              ) : (
                <div>
                  <Button
                    onClickHandler={() => setIsModalOpen(true)}
                    text={"Add Team +"}
                  />
                  <AddTeamModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                  />
                  <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                    <DashboardCard
                      number={quantity.athlete}
                      title={"Total Athletes"}
                      route="/dashboard/athletes"
                    />
                    <DashboardCard
                      number={quantity.parents}
                      title={"Total Parents"}
                      route="/dashboard/parents"
                    />
                    <DashboardCard
                      number={teams.length}
                      title={"Total Teams"}
                      route="/dashboard/teams"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {currentUser?.role === "athlete" && (
            <div>
              {currentUser?.status === "pending" ? (
                <Pending role={currentUser?.role} />
              ) : (
                <div className="mt-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  <DashboardCard number={teams.length} title={"Total Teams"} />
                </div>
              )}
            </div>
          )}
          {currentUser?.role === "parents" && (
            <div>
              {currentUser?.status === "pending" ? (
                <Pending role={currentUser?.role} />
              ) : (
                <div className="mt-2 grid lg:grid-cols-4 grid-cols-2 gap-5">
                  <DashboardCard
                    number={quantity.athlete}
                    title={"Total Athlete"}
                  />
                  <Button
                    style={"rounded-lg"}
                    onClickHandler={() => setIsModalOpen(true)}
                    text={"Add Athlete +"}
                  />
                  <AddAthleteModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                  />
                </div>
              )}
            </div>
          )}
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[90vh]">
          <CustomLoader isLoading={isLoading || isLoadingTeamData} />
        </div>
      )}
    </div>
  );
};
