import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const CreateTripPlannerModal = ({ modalOpen, setIsModalOpen, refetch }) => {
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const onCreate = async (values) => {
    const tripData = {
      ...values,
      createdAt: Date.now(),
      coachEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure
      .post(`${import.meta.env.VITE_BASE_API_URL}/trips`, tripData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Trip Plan Created");
          refetch();
        }
      });
  };
  const validateDateOfTrip = (rule, value) => {
    if (value && value.isBefore()) {
      return Promise.reject("Trip cannot be in the past");
    }

    return Promise.resolve();
  };
  return (
    <Modal
      open={modalOpen}
      title="Create trip"
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
        name="createTripForm"
      >
        <Form.Item
          name="tripName"
          label="Trip Name"
          rules={[
            {
              required: true,
              message: "Please enter the trip name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="trip Date"
          rules={[
            { required: true, message: "trip date is required" },
            { validator: validateDateOfTrip },
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
          label="Trip Time"
          rules={[{ required: true, message: "Time is required" }]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg "
            size="middle"
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Trip Location"
          className=" rounded-lg"
        >
          <Input placeholder="mention the trip location" />
        </Form.Item>
        <Form.Item
          className="col-span-2"
          name="description"
          label="Trip Description"
        >
          <Input.TextArea placeholder="Enter a trip plan description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTripPlannerModal;
