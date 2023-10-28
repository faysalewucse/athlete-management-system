import { Button, Upload } from "antd";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { BiUpload } from "react-icons/bi";

const FileUpload = () => {
  const [axiosSecure] = useAxiosSecure();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileList[0]);
    setUploading(true);

    try {
      await axiosSecure.post(`/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Upload successful");
      setFileList([]);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading");
    } finally {
      setUploading(false);
    }
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

  return (
    <div className="flex my-5 gap-2">
      <Upload className="flex-1" multiple={false} {...props}>
        <Button className="bg-white" icon={<BiUpload />}>
          Select File
        </Button>
      </Upload>
      <Button
        type={`btn text-white ${
          uploading || fileList.length === 0
            ? "bg-gray-300"
            : "bg-gradient hover:shadow-md"
        }`}
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
      >
        {uploading ? "Uploading" : "Upload"}
      </Button>
    </div>
  );
};

export default FileUpload;
