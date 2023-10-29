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
    const coaches = [];
    if (currentUser?.role === "admin") {
      values.coaches && coaches.push(values.coaches);
    } else {
      coaches.push(currentUser.email);
    }

    const teamData = {
      ...values,
      coaches,
      athletes: [],
      positions: [],
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

  const sportsList = [
    "Badminton",
    "Baseball (Boys)",
    "Basketball",
    "Bowling",
    "Cheerleading / Competitive Spirit Squads",
    "Cross Country",
    "Dance Team",
    "Field Hockey",
    "Flag Football (Girls)",
    "Football (Boys)",
    "Golf",
    "Gymnastics",
    "Hockey",
    "Indoor Track & Field",
    "Lacrosse",
    "Skiing & Snowboarding",
    "Soccer",
    "Softball (Girls)",
    "Slow Pitch Softball (Girls)",
    "Surf",
    "Swimming & Diving",
    "Tennis",
    "Track & Field",
    "Volleyball",
    "Water Polo",
    "Weightlifting",
    "Wrestling",
  ];

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
          adminEmail:
            currentUser?.role === "admin"
              ? currentUser?.email
              : currentUser?.adminEmail,
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
            {sportsList.map((sport, index) => (
              <Option key={index} value={sport}>
                {sport}
              </Option>
            ))}
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
        {currentUser?.role === "admin" && (
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
        )}
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
