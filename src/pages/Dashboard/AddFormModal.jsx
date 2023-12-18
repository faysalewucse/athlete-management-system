import { Button, Form, Input, Modal, Select, Upload } from "antd";
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

  const [form] = Form.useForm();

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

  console.log(currentUser);

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

  const onFinish = async (data) => {
    console.log({ data });
  };

  return (
    <Modal
      width={500}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer
    >
      <Form
        className="grid grid-cols-1 "
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          ["organization"]: currentUser?.organization,
          ["coachEmail"]: currentUser?.email,
        }}
      >
        <div>
          <Form.Item
            name="formName"
            label="Form Name"
            rules={[{ required: true, message: "Form Name is required" }]}
          >
            <Input className="w-full px-4 py-2 rounded-lg" size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="organization"
            label="Organization"
            // rules={[{ required: true, message: "Form Name is required" }]}
            initialValue={currentUser?.organization}
          >
            <Input
              className="w-full px-4 py-2 rounded-lg hover:cursor-danger"
              size="large"
              disabled
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="coachEmail"
            label="Coach's Email"
            // rules={[{ required: true, message: "Coach Email is required" }]}
          >
            <Input
              className="w-full px-4 py-2 rounded-lg hover:cursor-danger"
              size="large"
              disabled
              // value={currentUser?.email}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="teamName"
            label="Select Team"
            rules={[{ required: true, message: "Please select a team." }]}
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

        <div className="">
          <Form.Item
            name="formFile"
            label="Upload Form"
            rules={[{ required: true, message: "Please upload a form" }]}
          >
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
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
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
