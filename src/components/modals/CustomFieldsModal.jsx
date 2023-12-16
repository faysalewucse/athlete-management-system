import { Button, Form, Input, Modal, Select } from "antd";

const CustomFieldsModal = ({
  isModalOpen,
  setIsModalOpen,
  fieldLabel,
  handleFieldNameChange,
  fieldName,
  handleFieldLabelChange,
  handleFieldTypeChange,
  fieldType,
  handleAddCustomField,
}) => {
  const [form] = Form.useForm();
  const onReset = () => {
    console.log("inside reset");
    form.resetFields();
  };

  return (
    <Modal
      width={600}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer
    >
      <Form
        className="grid grid-cols-1 "
        layout="vertical"
        onReset={onReset}
        form={form}
      >
        <div>
          <Form.Item
            name="fieldName"
            label="Field Name:"
            rules={[{ required: true, message: "Field Name is required" }]}
          >
            <Input
              className="w-full px-4 py-2 rounded-lg"
              size="large"
              value={fieldName}
              onChange={handleFieldNameChange}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="fieldLabel"
            label="Field Label:"
            rules={[{ required: true, message: "Field Label is required" }]}
          >
            <Input
              className="w-full px-4 py-2 rounded-lg"
              size="large"
              value={fieldLabel}
              onChange={handleFieldLabelChange}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            name="fieldType"
            label="Field Type:"
            rules={[{ required: true, message: "Field Type is required" }]}
            className="w-full"
          >
            <Select
              size="large"
              className="rounded-lg"
              value={fieldType}
              onChange={handleFieldTypeChange}
            >
              <Option value="text">Text</Option>
              <Option value="number">Number</Option>
              <Option value="textarea">Textarea</Option>
              <Option value="date">Date</Option>
            </Select>
          </Form.Item>
        </div>

        <Button
          //   htmlType="submit"
          type="primary"
          className="bg-blue-500"
          onClick={handleAddCustomField}
        >
          Add
        </Button>
      </Form>
    </Modal>
  );
};

export default CustomFieldsModal;
