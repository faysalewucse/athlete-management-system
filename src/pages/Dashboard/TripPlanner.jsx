import { Divider, Pagination } from "antd";
import CustomLoader from "../../components/CustomLoader";
import { RxClock } from "react-icons/rx";
import { format, parseISO } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { SectionHeader } from "../../components/shared/SectionHeader";
import Button from "../../components/shared/Button";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import CreateTripPlannerModal from "../../components/modals/CreateTripPlannerModal";
import UpdateTripPlannerModal from "../../components/modals/UpdateTripPlannerModal";
import { Container } from "../../components/Container";

const TripPlanner = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [trip, setTrip] = useState({});

  const {
    isLoading,
    data: trips = [],
    refetch,
  } = useQuery({
    queryKey: ["trips", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/trips/${currentUser?.email}`);
      return data;
    },
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const visibleTrips = trips.slice(startIdx, endIdx);

  const handleDeleteTrips = async (id) => {
    await axiosSecure.delete(`/trips/${id}`).then((res) => {
      if (res.status === 200) {
        refetch();
        toast.success("Trip deleted successfully");
      }
    });
  };

  const handleUpdateTrip = (trip) => {
    setOpenUpdateModal(true);
    setTrip(trip);
  };

  return (
    <div className="min-h-[90vh] bg-transparent p-5 md:p-10 text-dark">
      {!isLoading ? (
        <Container>
          {currentUser?.role === "coach" && (
            <Button
              style={"rounded-lg mb-5"}
              onClickHandler={() => setIsModalOpen(true)}
              text={"Create Trip Plan +"}
            />
          )}
          <SectionHeader title={"Trip Plans"} quantity={trips.length} />
          <div className="mt-5">
            {trips.length === 0 ? (
              <div className="bg-white p-2 rounded-lg">
                No trip plan created
              </div>
            ) : (
              <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-5">
                {visibleTrips.map((trip) => (
                  <div
                    className="flex flex-col justify-between bg-white shadow-lg p-4 rounded-lg"
                    key={trip._id}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold">
                          {trip.tripName}
                        </h3>
                        {currentUser?.role === "coach" && (
                          <div className="text-lg flex gap-1">
                            <BiEdit
                              onClick={() => handleUpdateTrip(trip)}
                              className="cursor-pointer"
                            />
                            <AiFillDelete
                              onClick={() => handleDeleteTrips(trip?._id)}
                              className="cursor-pointer text-danger/90 hover:text-danger2/90"
                            />
                          </div>
                        )}
                      </div>
                      <Divider />
                      <p>
                        Location:{" "}
                        <span className="font-medium text-gray-500">
                          {trip.location}
                        </span>
                      </p>
                      <p className="text-base mt-2">
                        {trip.description ? trip.description : "No Description"}
                      </p>
                    </div>
                    <div className="mt-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RxClock />
                        <p>{format(parseISO(trip.time), "hh:mm a")}</p>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <p>{format(parseISO(trip.date), "dd/MM/yyyy")}</p>
                        </div>
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
            total={trips.length}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

          <CreateTripPlannerModal
            modalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            refetch={refetch}
          />
          <UpdateTripPlannerModal
            openUpdateModal={openUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
            trip={trip}
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

export default TripPlanner;
