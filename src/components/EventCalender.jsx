import { Badge, Calendar, Modal } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CustomLoader from "./CustomLoader";
import { format, parseISO } from "date-fns";
import EventCard from "./cards/EventCard";
import { useState } from "react";
import { Link } from "react-router-dom";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const EventCalender = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [selectedEvent, setSelectedEvent] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const { isLoading, data: events = [] } = useQuery({
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

  const modalHandler = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const dateTitleMap = {};

  events.forEach((event) => {
    const formattedDate = format(parseISO(event.date), "yyyy-MM-dd");
    dateTitleMap[formattedDate] = event;
  });

  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const event = dateTitleMap[date];
    return event ? (
      <div
        onClick={() => modalHandler(event)}
        className="flex gap-2 bg-danger text-white rounded px-3"
      >
        <Badge color="white" />
        {event.eventName}
      </div>
    ) : null;
  };

  return (
    <div>
      {!isLoading ? (
        <Calendar
          className="lg:p-0 p-5"
          fullscreen={false}
          onPanelChange={onPanelChange}
          cellRender={dateCellRender}
        />
      ) : (
        <CustomLoader isLoading={isLoading} />
      )}
      <Modal
        width={500}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer
      >
        <div className="mb-5">
          <EventCard event={selectedEvent} />
        </div>
        <Link
          to="/dashboard/events"
          className="block mx-auto text-primary text-center underline"
        >
          View All Events
        </Link>
      </Modal>
    </div>
  );
};

export default EventCalender;
