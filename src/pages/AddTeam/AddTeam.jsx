import { async } from "@firebase/util";
import {
  Form,
  Input,
  Button,
  Select,
  Modal,
} from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const { Option } = Select;

const AddTeam = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const onFinish = async (values) => {
    console.log(values);
    
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      okText="Submit"
      okType="dashed"
      footer
    >
      <Form
        form={form}
        name="add-team"
        initialValues={{ adminEmail: currentUser?.email, sports: "choose" }}
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
          <Select>
            <Option value="football">Football</Option>
            <Option value="cricket">Cricket</Option>
            <Option value="basketball">Basketball</Option>
            <Option value="tennis">Tennis</Option>
            <Option value="volleyball">Volleyball</Option>
            {/* Add more sports options as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          name="adminEmail"
          label="Admin Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="coachEmail"
          label="Coach Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input />
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

export default AddTeam;
