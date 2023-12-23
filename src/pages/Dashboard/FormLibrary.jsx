import { Space, Tabs } from "antd";
import CurrentTab from "../../components/CurrentTab";
import ArchiveTab from "../../components/ArchiveTab";
import { useState } from "react";
import CustomFormsTable from "../../components/CustomFormsTable";
import CustomFormModal from "../../components/modals/CustomFormModal";

import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import FilledForms from "./FilledForms";

const FormLibrary = () => {
  const [tab, setTab] = useState(1);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);

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
    {
      key: "3",
      label: "Custom Forms",
      children: <CustomFormsTable />,
    },
    {
      key: "4",
      label: "Filled Forms",
      children: <FilledForms />,
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
