import { Calendar } from "antd";

const onPanelChange = (value, mode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const dateTitleMap = {
  "2023-10-10": "Special Event",
  "2023-10-15": "Another Event",
};

const dateCellRender = (value) => {
  const date = value.format("YYYY-MM-DD");
  const title = dateTitleMap[date];
  return title ? (
    <div className="bg-gradient text-white  p-2  rounded-md event-title">
      {title}
    </div>
  ) : null;
};

const EventCalender = () => {
  return (
    <div>
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
      />
    </div>
  );
};

export default EventCalender;
