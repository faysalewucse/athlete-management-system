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
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const CreatePlannerModal = ({ modalOpen, setIsModalOpen, refetch }) => {
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const { isLoading, data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      let URL = "teams";

      if (currentUser?.role === "admin") {
        URL = `teams/${currentUser?.email}`;
      } else if (
        currentUser?.role === "coach" ||
        currentUser?.role === "sub_coach"
      ) {
        URL = `teams/coach-team/${currentUser?.email}`;
      } else if (currentUser?.role === "athlete") {
        URL = `teams/athlete-team/${currentUser?.email}`;
      }
      const { data } = await axiosSecure.get(`/${URL}`);
      return data;
    },
  });

  const onCreate = async (values) => {
    const planData = {
      ...values,
      createdAt: Date.now(),
      coachEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure.post(`/plans`, planData).then((res) => {
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
      case "Away Trip":
        form.setFieldsValue();
        break;
      case "Practice":
        form.setFieldsValue();
        break;
      case "Home Game":
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
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="planType"
          label="Plan Type"
          rules={[
            {
              required: true,
              message: "Please select a plan type",
            },
          ]}
        >
          <Select
            size="large"
            onChange={onPlanTypeChange}
            placeholder="Select a plan type"
          >
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
            disabledDate={(current) => {
              let customDate = moment().format("YYYY-MM-DD");
              return current < moment(customDate, "YYYY-MM-DD");
            }}
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
        <Form.Item
          name="teamId"
          label="Select Team"
          rules={[{ required: true, message: "Please select a team." }]}
        >
          <Select size="large" className="rounded-lg" placeholder="Select Team">
            <Option key={"all"} value={"all"}>
              {"All"}
            </Option>
            {teams.map((team) => (
              <Option key={team?._id} value={team?._id}>
                {team.teamName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePlannerModal;
