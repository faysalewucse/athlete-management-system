import { Button, DatePicker, Form, Input, Modal, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateTripPlannerModal = ({
  trip,
  openUpdateModal,
  setOpenUpdateModal,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    form.resetFields();
    setOpenUpdateModal(false);
  };

  const onUpdate = async (values) => {
    setSubmitting(true);
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/trips/${trip?._id}`, values)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          setOpenUpdateModal(false);
          form.resetFields();
          toast.success("Trip Updated");
          refetch();
        }
      });
  };
  const validateDateOfTrip = (rule, value) => {
    if (value && value.isBefore()) {
      return Promise.reject("trip cannot be in the past");
    }

    return Promise.resolve();
  };
  return (
    <Modal
      open={openUpdateModal}
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
        className="grid grid-cols-2 gap-x-5"
        size="middle"
        form={form}
        layout="vertical"
        name="updateTripForm"
      >
        <Form.Item
          name="tripName"
          label="trip Name"
          initialValue={trip?.tripName}
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
          initialValue={moment(trip?.date)}
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
          label="trip Time"
          initialValue={moment(trip?.time)}
          rules={[{ required: true, message: "Time is required" }]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg"
            size="middle"
          />
        </Form.Item>
        <Form.Item
          initialValue={trip?.location}
          name="location"
          label="Trip Location"
          className=" rounded-lg"
        >
          <Input placeholder="mention the trip location" />
        </Form.Item>
        <Form.Item
          initialValue={trip?.description}
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

export default UpdateTripPlannerModal;
