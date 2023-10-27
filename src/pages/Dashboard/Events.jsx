import CreateEventModal from "../../components/modals/CreateEventModal";
import { useState } from "react";
import Button from "../../components/shared/Button";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../components/CustomLoader";
import { format, parseISO } from "date-fns";
import { MdCoPresent, MdEventAvailable } from "react-icons/md";
import { RxClock } from "react-icons/rx";
import { Container } from "../../components/Container";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination } from "antd";
import { SectionHeader } from "../../components/shared/SectionHeader";
import UpdateEventModal from "../../components/modals/UpdateEventModal";
import toast from "react-hot-toast";
import EventAttendanceModal from "../../components/modals/EventAttendanceModal";

const Events = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAttendanceModal, setOpenAttendanceModal] = useState(false);
  const [event, setEvent] = useState({});

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

  const {
    isLoadingTeams,
    data: teams = [],
    refetch: refetchCoachTeams,
  } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/teams/coach-team-athleteDetails/${
          currentUser?.email
        }`
      );
      return data;
    },
  });

  const handleUpdateEvent = (event) => {
    setEvent(event);
    setOpenUpdateModal(true);
  };

  const handleAttendanceModal = (event) => {
    setEvent(event);
    setOpenAttendanceModal(true);
  };

  const handleDeleteEvents = async (id) => {
    await axiosSecure
      .delete(`${import.meta.env.VITE_BASE_API_URL}/events/${id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("event deleted successfully");
        }
      });
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const visibleEvents = events.slice(startIdx, endIdx);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      {!isLoading && !isLoadingTeams ? (
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
                    className="flex flex-col justify-between bg-white shadow-lg p-4 rounded-lg"
                    key={event._id}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex justify-between items-center w-full">
                          <h3 className="text-xl font-semibold">
                            {event.eventName}
                          </h3>
                          <MdCoPresent
                            className="text-xl cursor-pointer"
                            onClick={() => handleAttendanceModal(event)}
                          />
                        </div>
                        {currentUser?.role === "admin" && (
                          <div className="text-lg flex gap-1">
                            <BiEdit
                              onClick={() => handleUpdateEvent(event)}
                              className="cursor-pointer"
                            />
                            <AiFillDelete
                              onClick={() => handleDeleteEvents(event?._id)}
                              className="cursor-pointer text-danger/90 hover:text-danger2/90"
                            />
                          </div>
                        )}
                      </div>
                      <p className="my-1 text-sm text-gradient capitalize">
                        {event.eventType}
                      </p>
                      <p className="text-sm">
                        {event.eventDescription
                          ? event.eventDescription
                          : "No Description"}
                      </p>
                    </div>
                    <div>
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
                            event.fee === "0" || !event.fee
                              ? "bg-dark"
                              : "bg-gradient"
                          } text-white py-1 px-4 rounded-md`}
                        >
                          {event.fee === "0" || !event.fee ? "Free" : event.fee}
                        </p>
                      </div>
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
          <EventAttendanceModal
            isAttendanceModalOpen={openAttendanceModal}
            setAttendaceModalOpen={setOpenAttendanceModal}
            event={event}
            teams={teams}
            refetchCoachTeams={refetchCoachTeams}
          />
          <UpdateEventModal
            event={event}
            openUpdateModal={openUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
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
