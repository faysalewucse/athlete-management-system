import CreateEventModal from "../../components/modals/CreateEventModal";
import { useState } from "react";
import Button from "../../components/shared/Button";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../components/CustomLoader";
import { format, parseISO } from "date-fns";
import { MdEventAvailable } from "react-icons/md";
import { RxClock } from "react-icons/rx";
import { Container } from "../../components/Container";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination } from "antd";
import { SectionHeader } from "../../components/shared/SectionHeader";

const Events = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading,
    data: events = [],
    refetch,
  } = useQuery({
    queryKey: ["event", currentUser?.email],
    queryFn: async () => {
      const adminEmail =
        currentUser?.role === "admin"
          ? currentUser.email
          : currentUser?.adminEmail;

      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/events/${adminEmail}`
      );
      return data;
    },
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const visibleEvents = events.slice(startIdx, endIdx);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      {!isLoading ? (
        <Container>
          {currentUser?.role === "admin" && (
            <Button
              style={"rounded-lg mb-5"}
              onClickHandler={() => setIsModalOpen(true)}
              text={"Create Event +"}
            />
          )}

          <SectionHeader title={"Events"} quantity={events.length} />
          <div className="mt-5">
            {events.length === 0 ? (
              <div className="bg-white p-2 rounded-lg">No Events Created</div>
            ) : (
              <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-5">
                {visibleEvents?.map((event) => (
                  <div
                    className="bg-white shadow-lg p-4 rounded-lg"
                    key={event._id}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold">
                        {event.eventName}
                      </h3>
                      {currentUser?.role === "admin" && (
                        <div className="text-lg flex gap-1">
                          <BiEdit className="cursor-pointer" />
                          <AiFillDelete className="cursor-pointer text-danger/90 hover:text-danger2/90" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm">
                      {event.description ? event.description : "No Description"}
                    </p>
                    <div className="mt-10 flex items-center gap-2">
                      <RxClock />
                      <p>{format(parseISO(event.time), "hh:mm a")}</p>
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <div className="flex items-center gap-2">
                        <MdEventAvailable />
                        <p>{format(parseISO(event.date), "dd/MM/yyyy")}</p>
                      </div>
                      <p
                        className={`font-semibold ${
                          event.fee === "0" ? "bg-dark" : "bg-gradient"
                        } text-white py-1 px-4 rounded-md`}
                      >
                        {event.fee === "0" ? "Free" : event.fee}
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
            total={events.length}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

          <CreateEventModal
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

export default Events;