import { Tabs } from "antd";
import CurrentTab from "./CurrentTab";

const FormLibrary = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Current",
      children: <CurrentTab />,
    },
    {
      key: "2",
      label: "Archive",
      children: "Content of Tab Pane 2",
    },
  ];
  return (
    <div className="p-10">
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default FormLibrary;
