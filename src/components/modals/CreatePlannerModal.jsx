import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
} from "antd";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Option } from "antd/es/mentions";

const CreatePlannerModal = ({ modalOpen, setIsModalOpen, refetch }) => {
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const onCreate = async (values) => {
    const planData = {
      ...values,
      createdAt: Date.now(),
      coachEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure
      .post(`${import.meta.env.VITE_BASE_API_URL}/plans`, planData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Plan created");
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

  const onPlanTypeChange = (value) => {
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
        name="createPlanForm"
      >
        <Form.Item
          name="planName"
          label="Plan Name"
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
          name="eventType"
          label="Event Type"
          rules={[
            {
              required: true,
              message: "Please select a event type",
            },
          ]}
        >
          <Select onChange={onPlanTypeChange} placeholder="Select a event type">
            <Option value="Away Trip">Away Trip</Option>
            <Option value="Practice">Practice</Option>
            <Option value="Home Game">Home Game</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="plan Date"
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
          rules={[{ required: true, message: "Time is required" }]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg"
            size="middle"
          />
        </Form.Item>
        <Form.Item className="col-span-2" name="duration" label="Plan Duration">
          <Input placeholder="Please mention time (eg. days, hours)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePlannerModal;
