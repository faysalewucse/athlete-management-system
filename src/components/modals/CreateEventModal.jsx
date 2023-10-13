import { Modal, Form, Input, DatePicker, Button, TimePicker } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateEventModal = ({ modalOpen, setIsModalOpen, refetch }) => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const onCreate = async (values) => {
    const eventData = {
      ...values,
      createdAt: Date.now(),
      adminEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure
      .post(`${import.meta.env.VITE_BASE_API_URL}/events`, eventData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Event created");
          refetch();
        }
      });
  };

  const validateDateOfEvent = (rule, value) => {
    if (value && value.isBefore()) {
      return Promise.reject("Event cannot be in the past");
    }

    return Promise.resolve();
  };

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
          type="btn"
          loading={submitting}
          className="bg-gradient text-white"
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
          {submitting ? "Please Wait..." : "Create"}
        </Button>,
      ]}
    >
      <Form size="large" form={form} layout="vertical" name="createEventForm">
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
          name="date"
          label="Event Date"
          rules={[
            { required: true, message: "Event date is required" },
            { validator: validateDateOfEvent },
          ]}
        >
          <DatePicker
            className="w-full px-4 py-2 rounded-lg"
            size="large"
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="Event Time"
          rules={[{ required: true, message: "Time is required" }]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg"
            size="large"
          />
        </Form.Item>
        <Form.Item name="fee" label="Event Fee">
          <Input placeholder="Put 0 if Free" />
        </Form.Item>
        <Form.Item name="eventDescription" label="Event Description">
          <Input.TextArea defaultValue="" placeholder="Description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
