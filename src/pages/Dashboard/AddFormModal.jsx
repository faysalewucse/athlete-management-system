import { Button, Form, Input, Modal, Select } from "antd";
import FileUpload from "../../components/FileUpload";

const AddFormModal = ({ isModalOpen, setIsModalOpen }) => {
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
            name="fieldName"
            label="Field Name:"
            rules={[{ required: true, message: "Field Name is required" }]}
          >
            <Input className="w-full px-4 py-2 rounded-lg" size="large" />
          </Form.Item>
        </div>

        <div>
          <FileUpload />
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
