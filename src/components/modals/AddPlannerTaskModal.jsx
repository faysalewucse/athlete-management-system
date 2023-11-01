import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const { Option } = Select;

const AddPlanerTaskModal = ({ modalOpen, setIsModalOpen, refetch, plan }) => {
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const onCreate = async (values) => {
    const taskData = {
      ...values,
      planId: plan._id,
      duration: values.duration + " " + values.time,
      createdAt: Date.now(),
      coachEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure
      .post(`${import.meta.env.VITE_BASE_API_URL}/task`, taskData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Task Added Successfully");
          refetch();
        }
      });
  };

  return (
    <Modal
      open={modalOpen}
      title={`Add Task to ${plan.planName}`}
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
          {submitting ? "Please Wait..." : "Add"}
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="createPlanTaskForm"
        className="grid grid-cols-2 gap-x-2"
        layout="vertical"
      >
        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[
            {
              required: true,
              message: "Please enter the plan name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex items-center gap-2">
          <Form.Item
            rules={[{ required: true, message: "Duration is Required" }]}
            className="w-32"
            name="duration"
            label="Task Duration"
          >
            <Input type="number" placeholder="Ex: 3" />
          </Form.Item>
          <Form.Item
            className="flex-1"
            initialValue={"Seconds"}
            name="time"
            label="Length"
          >
            <Select placeholder="Time">
              <Option value="Seconds">Seconds</Option>
              <Option value="Minutes">Minutes</Option>
              <Option value="Hour">Hour</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="assigne"
          label="Assignee"
          rules={[
            {
              required: true,
              message: "Please enter the assigne",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPlanerTaskModal;
