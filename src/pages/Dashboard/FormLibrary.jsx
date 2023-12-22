import { Tabs } from "antd";
import CurrentTab from "../../components/CurrentTab";
import ArchiveTab from "../../components/ArchiveTab";
import { useState } from "react";

import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

const FormLibrary = () => {
  const [tab, setTab] = useState(1);
  const onChange = (key) => {
    setTab(key);
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
      children: <ArchiveTab tab={tab} />,
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
