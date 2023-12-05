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

export const Events = () => {
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
                      <div className="flex items-center justify-between">
                        <div className="flex justify-between items-center w-full">
                          <h3 className="text-xl font-semibold">
                            {event.eventName}
                          </h3>
                          {currentUser?.role === "coach" && (
                            <MdCoPresent
                              className="text-xl cursor-pointer"
                              onClick={() => handleAttendanceModal(event)}
                            />
                          )}
                        </div>
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
                      <p className="mt-10 font-semibold text-gradient flex items-center gap-2">
                        <BiMoney className="text-black text-lg" />
                        {event.fee === "0" || !event.fee
                          ? "Free"
                          : `$${event.fee}`}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <RxClock />
                            <p>{format(parseISO(event.time), "hh:mm a")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdEventAvailable />
                            <p>{format(parseISO(event.date), "MM-dd-yyyy")}</p>
                          </div>
                        </div>
                        {currentUser?.role === "coach" && (
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

// import React from "react";
// import { useReactToPrint } from "react-to-print";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// // Styles for PDF
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     padding: 20,
//   },
//   eventContainer: {
//     marginBottom: 10,
//     borderBottom: "1 solid #000",
//     paddingBottom: 10,
//   },
//   eventName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   eventDetails: {
//     fontSize: 12,
//     marginBottom: 3,
//   },
// });

// const EventListPDF = React.forwardRef(({ events }, ref) => (
//   <Document>
//     <Page size="A4" style={styles.page} ref={ref}>
//       <View>
//         {events.map((event) => (
//           <View key={event._id} style={styles.eventContainer}>
//             <Text style={styles.eventName}>{event.eventName}</Text>
//             <Text style={styles.eventDetails}>Type: {event.eventType}</Text>
//             <Text style={styles.eventDetails}>
//               Date: {new Date(event.date).toLocaleDateString()}
//             </Text>
//             <Text style={styles.eventDetails}>
//               Time: {new Date(event.time).toLocaleTimeString()}
//             </Text>
//             <Text style={styles.eventDetails}>Fee: {event.fee}</Text>
//             <Text style={styles.eventDetails}>
//               Created At: {new Date(event.createdAt).toString()}
//             </Text>
//             <Text style={styles.eventDetails}>
//               Admin Email: {event.adminEmail}
//             </Text>
//             {/* Additional event details can be added here */}
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// ));

// const YourComponent = ({ isLoading, data }) => {
//   const componentRef = React.useRef();

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Events</h1>
//       <button
//         onClick={handlePrint}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Print
//       </button>
//       {data && data.length > 0 ? (
//         <div style={{ display: "none" }}>
//           {/* Hidden component for printing */}
//           <EventListPDF
//             ref={componentRef}
//             events={data.map((event) => ({
//               ...event,
//               participants: undefined,
//             }))}
//           />
//         </div>
//       ) : (
//         <p>No events available</p>
//       )}
//     </div>
//   );
// };

// export default YourComponent;
