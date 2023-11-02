import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button, Modal } from "antd";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TeamDetailsModal = ({
  isTeamDetailsModal,
  setIsTeamDetailsModal,
  teamDetails,
  teamPositions,
  addPosition,
  refetch,
  selectedAthlete,
}) => {
  const [position, setPosition] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [selectedPosition, setSelectedPosition] = useState();
  const inputRef = useRef(null);

  const onPositionChange = (event) => {
    setPosition(event.target.value);
  };

  const assignToPosition = async () => {
    if (!selectedPosition) {
      return toast.error("Please select a position");
    }
    try {
      await axiosSecure.patch(`/teams/athlete-position/${teamDetails._id}`, {
        athleteEmail: selectedAthlete,
        position: selectedPosition,
      });
      toast.success("Position has been updated");
      setPosition();
      setSelectedPosition("");
      refetch();
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!position) {
      return toast.error("Position is empty. Write Position name");
    }
    try {
      await axiosSecure.patch(`/teams/team-position/${teamDetails._id}`, {
        position: position,
      });
      toast.success("Position has been added");
      setPosition();
      addPosition(position);
      refetch();
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const handleCancel = () => {
    setIsTeamDetailsModal(false);
  };

  return (
    <Modal open={isTeamDetailsModal} footer onCancel={handleCancel}>
      <div>
        <h1 className="text-xl text-gradient font-semibold text-center border-b border-black mb-4">
          Team Details
        </h1>
        <div className="flex justify-between items-center text-base">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-gray-500">
              Name: <span>{teamDetails?.teamName}</span>
            </p>
            <p className="font-medium text-gray-500">
              sports: {teamDetails?.sports}
            </p>

            <div className="flex font-medium text-gray-500">
              Coaches:
              <ul className="ml-1">
                {teamDetails?.coaches?.map((coach, i) => (
                  <li key={i}>{coach}</li>
                ))}
              </ul>
            </div>
            <p className="font-medium text-gray-500">
              Athlete Position:
              {/* {console.log(teamDetails.athletes[0])} */}
              {/* {teamDetails?.athletes[0]?.position ? "Position" : "Not set"} */}
            </p>
          </div>
        </div>
        <div
          className="mt-10 flex items-center gap-5
        "
        >
          <Select
            className="flex-1"
            placeholder="Assign to a position"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={position}
                    onChange={onPositionChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add Position
                  </Button>
                </Space>
              </>
            )}
            onChange={(value) => setSelectedPosition(value)}
            options={teamPositions?.map((item) => ({
              label: item,
              value: item,
            }))}
          />
          <Button onClick={assignToPosition}>Add</Button>
        </div>
      </div>
    </Modal>
  );
};

export default TeamDetailsModal;
