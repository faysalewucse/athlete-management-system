import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { FileOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
const { Dragger } = Upload;

const EditFormModal = ({ isModalOpen, setIsModalOpen, refetch, formData }) => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();

  const { isLoading, data: teams = [] } = useQuery({
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
    const bodyData = new FormData();
    // bodyData.append("formFile", fileList[0] || formData.formFile);

    // bodyData.append("formName", data.formName || formData.formName);
    // bodyData.append("organization", data.organization || formData.organization);
    // bodyData.append("teamName", data.teamName || formData.teamName);
    // setUploading(true);

    // console.log(...bodyData);
    try {
      await axiosSecure.patch(`/forms/${formData.key}`, {
        formName: data.formName || formData.formName,
        organization: data.organization || formData.organization,
        teamName: data.teamName || formData.teamName,
      });
      refetch();
      toast.success("Updated successful");
      //   form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating");
    } finally {
      setUploading(false);
    }
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
          ["formName"]: formData?.formName,
          ["teamName"]: formData?.teamName,
          ["formFile"]: formData?.formFile,
          ["organization"]: formData?.organization,
          ["addedByEmail"]: formData?.email,
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
          <Form.Item name="addedByEmail" label="Email">
            <Input
              className="w-full px-4 py-2 rounded-lg hover:cursor-danger"
              size="large"
              disabled
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

        {/* <div className="">
          <Form.Item
            name="formFile"
            label="Upload Form"
            rules={[{ required: true, message: "Please upload a form" }]}
          >
            <Dragger {...props} accept="application/pdf">
              <p className="ant-upload-drag-icon">
                <FileOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Support only PDF files.</p>
            </Dragger>
          </Form.Item>
        </div> */}

        <Button
          htmlType="submit"
          type={`btn text-white ${
            uploading ? "bg-gray-300" : "bg-gradient hover:shadow-md"
          }`}
          // onClick={handleUpload}
          disabled={uploading}
          loading={uploading}
        >
          {uploading ? "Updating.." : "Update"}
        </Button>
      </Form>
    </Modal>
  );
};

export default EditFormModal;
