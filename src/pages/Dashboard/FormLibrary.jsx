import React, { useState } from "react";
import Button from "../../components/shared/Button";
import AddFormModal from "./AddFormModal";

const FormLibrary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-10">
      <Button
        style={"rounded-lg mb-5"}
        onClickHandler={() => setIsModalOpen(true)}
        text={"Add Form +"}
      />

      <AddFormModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default FormLibrary;
