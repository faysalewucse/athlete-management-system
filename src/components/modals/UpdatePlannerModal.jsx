import { Form, Button, DatePicker, Input, Modal, TimePicker } from "antd";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import moment from "moment";

const UpdatePlannerModal = ({
  plan,
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
      .patch(`${import.meta.env.VITE_BASE_API_URL}/plans/${plan?._id}`, values)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          setOpenUpdateModal(false);
          form.resetFields();
          toast.success("Plan Updated");
          refetch();
        }
      });
  };
  const validateDateOfPlan = (rule, value) => {
    if (value && value.isBefore()) {
      return Promise.reject("Plan cannot be in the past");
    }

    return Promise.resolve();
  };
  return (
    <Modal
      open={openUpdateModal}
      title="Create Plan"
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
        name="createPlanForm"
      >
        <Form.Item
          name="planName"
          label="Plan Name"
          initialValue={plan?.planName}
          rules={[
            {
              required: true,
              message: "Please enter the plan name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="plan Date"
          initialValue={moment(plan?.date)}
          rules={[
            { required: true, message: "plan date is required" },
            { validator: validateDateOfPlan },
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
          label="plan Time"
          initialValue={moment(plan?.time)}
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
          initialValue={plan?.duration}
          name="duration"
          label="Plan Duration"
        >
          <Input placeholder="Please mention time (eg. days, hours)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePlannerModal;
