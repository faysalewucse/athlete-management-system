import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  TimePicker,
  Select,
} from "antd";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const { Option } = Select;

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
      adminEmail: currentUser?.adminEmail,
    };

    setSubmitting(true);
    await axiosSecure.post(`/events`, eventData).then((res) => {
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

  const onEventTypeChange = (value) => {
    switch (value) {
      case "game":
        form.setFieldsValue();
        break;
      case "practice":
        form.setFieldsValue();
        break;
      case "fundraiser":
        form.setFieldsValue();
        break;
      case "film session":
        form.setFieldsValue();
        break;
      case "team meating":
        form.setFieldsValue();
        break;
      default:
    }
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
      <Form
        className="grid grid-cols-2 gap-x-5"
        size="middle"
        form={form}
        layout="vertical"
        name="createEventForm"
      >
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
          name="eventType"
          label="Event Type"
          rules={[
            {
              required: true,
              message: "Please select a event type",
            },
          ]}
        >
          <Select
            onChange={onEventTypeChange}
            placeholder="Select a event type"
          >
            <Option value="game">Game</Option>
            <Option value="practice">Practice</Option>
            <Option value="fundraiser">Fundraiser</Option>
            <Option value="film session">Film Session</Option>
            <Option value="team meeting">Team Meeting</Option>
          </Select>
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
            size="middle"
            className="w-full px-4 py-2 rounded-lg"
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
            size="middle"
          />
        </Form.Item>
        <Form.Item className="col-span-2" name="fee" label="Event Fee">
          <Input type="number" placeholder="Put 0 if Free" />
        </Form.Item>
        <Form.Item
          name="eventDescription"
          className="col-span-2"
          label="Event Description"
        >
          <Input.TextArea defaultValue="" placeholder="Description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
