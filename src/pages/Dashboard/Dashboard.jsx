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
import EventCalender from "../../components/EventCalender";
import { TeamPerformanceChart } from "./TeamPerformanceChart";
import GamedAndPracticeStatsChart from "./GamedAndPracticeStatsChart";
import FileUpload from "../../components/FileUpload";

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
        URL = `/users/coach-sub_coach-athlete-parents/${currentUser?.email}`;
      else if (currentUser?.role === "coach")
        URL = `/users/athlete-parents/${currentUser?.adminEmail}`;
      else if (currentUser?.role === "parents")
        URL = `/users/athlete/${currentUser?.email}`;
      else if (currentUser?.role === "athlete") return [];
      const { data } = await axiosSecure.get(`${URL}`);
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
      let URL = `teams/${currentUser?.email}`;

      if (currentUser?.role === "coach") {
        URL = `teams/coach-team/${currentUser?.email}`;
      } else if (currentUser?.role === "athlete") {
        URL = `teams/athlete-team/${currentUser?.email}`;
      }
      const { data } = await axiosSecure.get(`/${URL}`);
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
      sub_coach: 0,
      parents: 0,
    }
  );

  return (
    <div className="min-h-[90vh] p-5">
      {!isLoading ? (
        <Container>
          <div className="mb-5">
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
                        number={quantity.sub_coach}
                        title={"Total Sub Coaches"}
                        route="/dashboard/sub-coaches"
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
              <div className="">
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
            {currentUser?.role === "sub_coach" && (
              <div className="">
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
                    <DashboardCard
                      number={teams.length}
                      title={"Total Teams"}
                    />
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
          </div>
          {currentUser.status === "approved" && (
            <div className="flex flex-col gap-5">
              <EventCalender />

              <div className="lg:flex-1 bg-white rounded-lg w-full lg:mt-0 mt-5">
                {currentUser?.role === "coach" && <TeamPerformanceChart />}
                {currentUser?.role === "athlete" && (
                  <GamedAndPracticeStatsChart />
                )}
              </div>
            </div>
          )}
          {(currentUser?.role === "athlete" ||
            currentUser?.role === "parents") && (
            <div className="">
              <FileUpload />
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
