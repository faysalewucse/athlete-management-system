import { Form, Input, Button, Select, Modal } from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const { Option } = Select;

const AddTeamModal = ({ isModalOpen, setIsModalOpen, refetch, coaches }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const onFinish = async (values) => {
    const teamData = {
      ...values,
      coaches: values.coaches ? [values.coaches] : [],
      athletes: [],
    };

    setSubmitting(true);
    await axiosSecure
      .post(`${import.meta.env.VITE_BASE_API_URL}/teams`, teamData)
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Team created");
          refetch();
        }
      });
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer
    >
      <Form
        form={form}
        name="add-team"
        initialValues={{
          adminEmail: currentUser?.email,
        }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="teamName"
          label="Team Name"
          rules={[{ required: true, message: "Please enter team name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sports"
          label="Sports"
          rules={[{ required: true, message: "Please select sport!" }]}
        >
          <Select placeholder="Select sports">
            <Option value="football">Football</Option>
            <Option value="cricket">Cricket</Option>
            <Option value="basketball">Basketball</Option>
            <Option value="tennis">Tennis</Option>
            <Option value="volleyball">Volleyball</Option>
            {/* Add more sports options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="level"
          label="Level"
          rules={[{ required: true, message: "Please select a level!" }]}
        >
          <Select placeholder="Select Level">
            <Option value="varsity">Varsity</Option>
            <Option value="sophomore">Sophomore</Option>
            <Option value="college">College</Option>
            <Option value="pro">Pro</Option>
            <Option value="intramural">Intramural</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="adminEmail"
          label="Admin Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="coaches" label="Select Coach">
          <Select placeholder="Select Coach">
            {coaches?.map((coach) => (
              <Option
                disabled={coach.status === "pending"}
                key={coach._id}
                value={coach?.status === "approved" ? coach?.email : null}
              >
                {coach?.status === "approved"
                  ? coach?.name
                  : `${coach?.name}(Not Approved)`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-primary text-white"
            htmlType="submit"
            loading={submitting}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTeamModal;
