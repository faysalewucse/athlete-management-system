import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BiEdit, BiMoney } from "react-icons/bi";
import { RxClock } from "react-icons/rx";
import { MdCoPresent, MdEventAvailable } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { format, parseISO } from "date-fns";

const EventCard = ({
  event,
  handleAttendanceModal,
  handleUpdateEvent,
  handleDeleteEvents,
}) => {
  const { currentUser } = useAuth();

  return (
    <div
      className="flex flex-col justify-between bg-white shadow-lg p-4 rounded-lg"
      key={event._id}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xl font-semibold">{event.eventName}</h3>
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
          {event.eventDescription ? event.eventDescription : "No Description"}
        </p>
      </div>
      <div>
        <p className="mt-10 font-semibold text-gradient flex items-center gap-2">
          <BiMoney className="text-black text-lg" />
          {event.fee === "0" || !event.fee ? "Free" : `$${event.fee}`}
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
  );
};

export default EventCard;
