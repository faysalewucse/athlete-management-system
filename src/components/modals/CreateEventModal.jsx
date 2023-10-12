import { Modal, Form, Input, DatePicker, Button } from "antd";

const CreateEventModal = ({ modalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const onCancel = () => {
    setIsModalOpen(false);
  };
  const onCreate = () => {};
  return (
    <Modal
      open={modalOpen}
      title="Create Event"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="createEventForm">
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[
            {
              required: true,
              message: "Please enter the event name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="eventDate"
          label="Event Date"
          rules={[
            {
              required: true,
              message: "Please select the event date",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="eventFee" label="Event Fee">
          <Input placeholder="Optional" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
