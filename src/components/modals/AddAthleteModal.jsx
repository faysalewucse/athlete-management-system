import { Form, Input, Button, Select, Modal, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

const { Option } = Select;

const AddAthleteModal = ({ isModalOpen, setIsModalOpen, refetch }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  const { currentUser } = useAuth();

  const onFinish = async (data) => {
    try {
      setLoading(true);
      const {
        address,
        email,
        gender,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        origanization,
        state,
        city,
        zip,
        reqTeam,
      } = data;

      const userData = {
        email,
        firstName,
        lastName,
        fullName: firstName + " " + lastName,
        photoURL: "",
        address: { state, city, zip, address },
        gender,
        dateOfBirth,
        phoneNumber,
        role: "athlete",
        status: "pending",
        parentsEmail: currentUser?.email,
      };

      userData.adminEmail = origanization;
      userData.reqTeamId = reqTeam;

      await axios
        .post(`${import.meta.env.VITE_BASE_API_URL}/user`, userData)
        .then((res) => {
          if (res.status === 200) {
            form.resetFields();
            setIsModalOpen(false);
            Swal.fire(
              "Welcome!",
              "Athlete registration done successfully",
              "success"
            );
            refetch();
          }
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const validateDateOfBirth = (rule, value) => {
    if (value && value.isAfter()) {
      return Promise.reject("Date of Birth cannot be in the future");
    }

    const eighteenYearsAgo = moment().subtract(10, "years");
    if (value && value.isAfter(eighteenYearsAgo)) {
      return Promise.reject("Athlete must be at least 10 years old");
    }

    return Promise.resolve();
  };

  const fetchTeams = async () => {
    const URL = `teams/${currentUser?.adminEmail}`;
    await axios
      .get(`${import.meta.env.VITE_BASE_API_URL}/${URL}`)
      .then((res) => setTeams(res.data));
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Modal
      width={1000}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      footer
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="md:grid grid-cols-2 gap-x-6 p-10"
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Invalid email address",
            },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[
            { required: true, message: "Date of Birth is required" },
            { validator: validateDateOfBirth },
          ]}
        >
          <DatePicker
            className="w-full px-4 py-2 rounded-lg"
            size="large"
            format="MM-DD-YYYY"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          className="w-full"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="reqTeam"
          label="Select Team"
          rules={[
            {
              required: true,
              message: `Team selection is required for Athlete!`,
            },
          ]}
        >
          <Select placeholder="Choose" className="w-full" size="large">
            {teams?.map((team) => (
              <Option key={team?._id} value={team._id}>
                {team?.teamName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          className={`w-full col-span-2`}
          rules={[
            { required: true, message: "Phone Number is required" },
            {
              min: 10,
              message: "Phone Number must be at least 10 digits",
            },
          ]}
        >
          <Input type="number" className="rounded-lg" size="large" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          className="w-full col-span-2"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input.TextArea className="rounded-lg" size="large" />
        </Form.Item>
        <div className="flex justify-between gap-5 col-span-2">
          <Form.Item
            name="city"
            label="City"
            className="w-full col-span-2"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Input className="rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            className="w-full col-span-2"
            rules={[{ required: true, message: "State is required" }]}
          >
            <Input className="rounded-lg" size="large" />
          </Form.Item>
          <Form.Item
            name="zip"
            label="Zip"
            className="w-full col-span-2"
            rules={[{ required: true, message: "Zip Code is required" }]}
          >
            <Input className="rounded-lg" size="large" />
          </Form.Item>
        </div>

        <Form.Item className="col-span-2">
          <Button
            size="large"
            type="btn"
            htmlType="submit"
            className={`bg-gradient text-white w-full ${
              loading && "cursor-not-allowed opacity-50"
            }`}
          >
            {loading ? "Please Wait..." : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAthleteModal;
