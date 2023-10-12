import { Button } from "antd";
import CreateEventModal from "../../components/modals/CreateEventModal";
import { useState } from "react";

const Events = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      <Button
        onClick={() => setIsModalOpen(true)}
        type="btn"
        className="bg-gradient text-white "
      >
        Add Events +
      </Button>

      <CreateEventModal
        modalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Events;
