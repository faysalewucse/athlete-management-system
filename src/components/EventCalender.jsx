import { Badge, Calendar } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CustomLoader from "./CustomLoader";
import { format, parseISO } from "date-fns";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const EventCalender = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

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

  const dateTitleMap = {};

  events.forEach((event) => {
    const formattedDate = format(parseISO(event.date), "yyyy-MM-dd");
    dateTitleMap[formattedDate] = event.eventName;
  });

  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const title = dateTitleMap[date];
    return title ? (
      <div className="flex gap-2 border border-primary rounded-lg px-3">
        <Badge color="blue" />
        {title}
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
    </div>
  );
};

export default EventCalender;
