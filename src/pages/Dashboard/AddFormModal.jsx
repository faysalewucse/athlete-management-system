import { Button, Form, Modal, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { FileOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const AddFormModal = ({ isModalOpen, setIsModalOpen }) => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [teamValue, setTeamValue] = useState("");
  const [fileList, setFileList] = useState([]);
  const {
    isLoading,
    data: teams = [],
    refetch,
  } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      let URL = "teams";

      if (currentUser?.role === "admin") {
        URL = `teams/${currentUser?.email}`;
      } else if (currentUser?.role === "coach") {
        URL = `teams/coach-team/${currentUser?.email}`;
      } else if (currentUser?.role === "athlete") {
        URL = `teams/athlete-team/${currentUser?.email}`;
      }
      const { data } = await axiosSecure.get(`/${URL}`);
      return data;
    },
  });

  const handleTeamChange = (value) => {
    setTeamValue(value);
  };

  const props = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  console.log(fileList);

  return (
    <Modal
      width={400}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer
    >
      <Form className="grid grid-cols-1 " layout="vertical">
        <div>
          <Form.Item
            name="team"
            label="Select Team"
            rules={[{ required: true, message: "Answer is required" }]}
          >
            <Select
              size="large"
              className="rounded-lg"
              onChange={handleTeamChange}
              placeholder="Select Team"
            >
              {teams.map((team) => (
                <Option key={team?._id} value={team.teamName}>
                  {team.teamName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="mb-10">
          <Dragger
            {...props}
            accept="application/pdf"
            // onChange={handleOnChange}
          >
            <p className="ant-upload-drag-icon">
              <FileOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support only PDF files.</p>
          </Dragger>
        </div>

        <Button
          //   htmlType="submit"
          type="primary"
          className="bg-blue-500"
          //   onClick={handleAddCustomField}
        >
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default AddFormModal;
