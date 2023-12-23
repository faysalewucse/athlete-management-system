import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { FileOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
const { Dragger } = Upload;

const FileUploadModal = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
  selectedForm,
}) => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form] = Form.useForm();

  console.log(selectedForm);

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
    setUploading(true);

    const formData = new FormData();
    formData.append("formFile", fileList[0]);
    formData.append("addedBy", JSON.stringify(currentUser));
    formData.append("adminEmail", currentUser.adminEmail);
    formData.append("formId", selectedForm.key);
    formData.append("formName", selectedForm.formName);

    try {
      await axiosSecure.post(
        `/upload-filled-form/${selectedForm.key}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      refetch();
      toast.success("Upload successful");
      form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Error uploading");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      centered
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
      >
        <div className="">
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
        </div>

        <Button
          htmlType="submit"
          type={`btn text-white ${
            uploading || fileList.length === 0
              ? "bg-gray-300"
              : "bg-gradient hover:shadow-md"
          }`}
          // onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? "Adding" : "Add"}
        </Button>
      </Form>
    </Modal>
  );
};

export default FileUploadModal;
