import { useState } from "react";
import Button from "../../components/shared/Button";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../components/CustomLoader";
import { format, parseISO } from "date-fns";
import { Container } from "../../components/Container";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination } from "antd";
import AlertNotificationModal from "../../components/modals/AlertNotificationModal";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { RxClock } from "react-icons/rx";

const Notifications = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading,
    data: notifications = [],
    refetch,
  } = useQuery({
    queryKey: ["notifications", currentUser?.email],
    queryFn: async () => {
      const adminEmail =
        currentUser?.role === "admin"
          ? currentUser.email
          : currentUser?.adminEmail;

      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/notifications/${adminEmail}`
      );
      return data;
    },
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const visibleNotifications = notifications.slice(startIdx, endIdx);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      {!isLoading ? (
        <Container>
          {currentUser?.role === "admin" && (
            <Button
              style={"rounded-lg mb-5"}
              onClickHandler={() => setIsModalOpen(true)}
              text={"Alert Notifications"}
            />
          )}

          <SectionHeader
            title={"Notifications"}
            quantity={notifications.length}
          />

          <div className="mt-5">
            {notifications.length === 0 ? (
              <div className="bg-white p-2 rounded-lg">
                No notification Created
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleNotifications?.map((notification) => (
                  <div
                    className="bg-white shadow p-2 rounded-lg"
                    key={notification._id}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="">{notification.message}</h3>
                      {currentUser?.role === "admin" && (
                        <div className="text-lg flex gap-1">
                          <BiEdit className="cursor-pointer" />
                          <AiFillDelete className="cursor-pointer text-danger/90 hover:text-danger2/90" />
                        </div>
                      )}
                    </div>
                    <div className="mt-1 flex items-center text-xs gap-2">
                      <RxClock />
                      <p>
                        {format(parseISO(notification.createdAt), "hh:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Pagination
            className="mt-10 flex justify-end"
            current={currentPage}
            pageSize={itemsPerPage}
            total={notifications.length}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

          <AlertNotificationModal
            modalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            refetch={refetch}
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

export default Notifications;
