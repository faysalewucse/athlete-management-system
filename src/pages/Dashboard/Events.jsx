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
import { BiEdit, BiMoney } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Pagination } from "antd";
import { SectionHeader } from "../../components/shared/SectionHeader";
import UpdateEventModal from "../../components/modals/UpdateEventModal";
import toast from "react-hot-toast";
import EventAttendanceModal from "../../components/modals/EventAttendanceModal";
import EventCard from "../../components/cards/EventCard";

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

      const { data } = await axiosSecure.get(`/events/${adminEmail}`);
      return data;
    },
  });

  const { isLoadingAthletes, data: athletes = [] } = useQuery({
    queryKey: ["athletes", currentUser?.email],
    queryFn: async () => {
      const URL = `adminEmail=${currentUser?.adminEmail}`;

      const { data } = await axiosSecure.get(
        `/users/byRole?role=athlete&${URL}`
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
    await axiosSecure.delete(`/events/${id}`).then((res) => {
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
      {!isLoading && !isLoadingAthletes ? (
        <Container>
          {currentUser?.role === "coach" && (
            <Button
              style={"rounded-lg mb-5"}
              onClickHandler={() => setIsModalOpen(true)}
              text={"Create Event +"}
            />
          )}
          {/* {events.length > 0 && (
            <PdfPrint dataArray={events} dataType="Events" />
          )} */}

          <SectionHeader title={"Events"} quantity={events.length} />
          <div className="mt-5">
            {events.length === 0 ? (
              <div className="bg-white p-2 rounded-lg">No Events Created</div>
            ) : (
              <div className="grid lg:grid-cols-2  md:grid-cols-2 sm:grid-cols-2 gap-5">
                {visibleEvents?.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    handleAttendanceModal={handleAttendanceModal}
                    handleDeleteEvents={handleDeleteEvents}
                    handleUpdateEvent={handleUpdateEvent}
                  />
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
            athletes={athletes}
            refetchEvents={refetch}
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
