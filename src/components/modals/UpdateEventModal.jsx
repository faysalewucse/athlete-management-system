import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Button,
} from "antd";
import moment from "moment/moment";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const { Option } = Select;

const UpdateEventModal = ({
  event,
  openUpdateModal,
  setOpenUpdateModal,
  refetch,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    setOpenUpdateModal(false);
  };
  const onUpdate = async (values) => {
    setSubmitting(true);

    /* TODO: uncomment this after solving the form initial value problem  */

    // await axiosSecure
    //   .patch(
    //     `${import.meta.env.VITE_BASE_API_URL}/events/${event?._id}`,
    //     values
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       refetch();
    //       toast.success("event updates successfully");
    //       setSubmitting(false);
    //     }
    //   });
  };

  const validateDateOfEvent = (rule, value) => {
    if (value && value.isBefore()) {
      return Promise.reject("Event cannot be in the past");
    }

    return Promise.resolve();
  };
  return (
    <Modal
      open={openUpdateModal}
      title="Update Event"
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
                onUpdate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          {submitting ? "Please Wait..." : "Update"}
        </Button>,
      ]}
    >
      <Form
        size="large"
        key={event?._id}
        form={form}
        layout="vertical"
        name="createEventForm"
      >
        <Form.Item
          name="eventName"
          label="Event Name"
          initialValue={event?.eventName}
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
          initialValue={event?.eventType}
          rules={[
            {
              required: true,
              message: "Please select a event type",
            },
          ]}
        >
          <Select placeholder="Select a event type">
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
          initialValue={moment(event?.date)}
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
          initialValue={moment(event?.time)}
          rules={[{ required: true, message: "Time is required" }]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg"
            size="large"
          />
        </Form.Item>
        <Form.Item name="fee" label="Event Fee" initialValue={event?.fee}>
          <Input placeholder="Put 0 if Free" />
        </Form.Item>
        <Form.Item
          name="eventDescription"
          label="Event Description"
          initialValue={event?.eventDescription}
        >
          <Input.TextArea defaultValue="" placeholder="Description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEventModal;
