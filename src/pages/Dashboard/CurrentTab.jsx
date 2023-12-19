import { useState } from "react";
import Button from "../../components/shared/Button";
import AddFormModal from "./AddFormModal";
import { useNavigate } from "react-router-dom";

const CurrentTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-5">
        <Button
          style={"rounded-lg mb-5"}
          onClickHandler={() => setIsModalOpen(true)}
          text={"Add PDF Form +"}
        />
        <Button
          style={"rounded-lg mb-5"}
          onClickHandler={() => navigate("custom-form")}
          text={"Add Custom Form +"}
        />
      </div>

      <AddFormModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default CurrentTab;
