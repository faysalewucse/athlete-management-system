import { useState } from "react";
import { Form, Input, Select, Radio, Button, DatePicker } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const { Option } = Select;

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("admin");
  const [teams, setTeams] = useState([]);
  const { signup } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const { data: admins = [] } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/admins`
      );
      return data;
    },
  });

  const onFinish = async (data) => {
    try {
      setLoading(true);
      const {
        address,
        email,
        gender,
        firstName,
        lastName,
        password,
        phoneNumber,
        role,
        dateOfBirth,
        organization,
        state,
        city,
        zip,
        reqTeam,
        parentCode,
      } = data;

      const fullName = firstName + " " + lastName;

      const userData = {
        email,
        firstName,
        lastName,
        fullName: fullName,
        photoURL: "",
        parentCode,
        address: { state, city, zip, address },
        gender,
        dateOfBirth,
        phoneNumber,
        role,
        status: "pending",
      };

      if (role === "admin") userData.organization = organization;
      else userData.adminEmail = organization;
      if (role === "athlete") {
        userData.reqTeamId = reqTeam;
      }

      await signup(email, password, fullName, userData);

      await axios.post(`${import.meta.env.VITE_BASE_API_URL}/user`, userData);

      Swal.fire("Welcome!", "You registered Successfully!", "success").then(
        () => {
          navigate("/");
        }
      );

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

    const eighteenYearsAgo = moment().subtract(18, "years");
    if (value && value.isAfter(eighteenYearsAgo)) {
      return Promise.reject("You must be at least 18 years old");
    }

    return Promise.resolve();
  };

  const handleTeams = async (adminEmail) => {
    const URL = `teams/${adminEmail}`;
    await axios
      .get(`${import.meta.env.VITE_BASE_API_URL}/${URL}`)
      .then((res) => setTeams(res.data));
  };

  return (
    <div className="text-dark bg-light min-h-[90vh] flex items-center justify-center md:p-20 p-5">
      <div className="max-w-3xl p-5 lg:w-1/2 w-full  rounded-xl my-5 mt-16 md:mt-0">
        <h2 className="text-4xl font-bold text-center">Registration</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="md:grid grid-cols-2 gap-x-6 py-10"
          initialValues={{ role: "admin" }}
        >
          <h1 className="font-semibold text-lg">Role?</h1>
          <Form.Item name="role" className="role-radio col-span-2">
            <Radio.Group onChange={(e) => setRole(e.target.value)}>
              <Radio value="admin">Admin</Radio>
              <Radio value="coach">Coach</Radio>
              <Radio value="parents">Parents</Radio>
              <Radio value="athlete">Athlete</Radio>
            </Radio.Group>
          </Form.Item>

          {role === "parents" && (
            <Form.Item
              name="parentCode"
              label="Code"
              rules={[{ required: true, message: "Parent code is required" }]}
            >
              <Input className="w-full px-4 py-2 rounded-lg" size="large" />
            </Form.Item>
          )}

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
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password is required" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password
              className="w-full px-4 py-2 rounded-lg"
              iconRender={(visible) =>
                visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Confirm Password is required" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords should match!");
                },
              }),
            ]}
          >
            <Input.Password
              className="w-full px-4 py-2 rounded-lg"
              size="large"
            />
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

          {role === "admin" ? (
            <Form.Item
              name="organization"
              label="Organization Name"
              rules={[
                {
                  required: true,
                  message: "Organization is required for admin!",
                },
              ]}
            >
              <Input className="w-full px-4 py-2 rounded-lg" size="large" />
            </Form.Item>
          ) : (
            <Form.Item
              name="organization"
              label="Select Organization"
              rules={[
                {
                  required: true,
                  message: `Organization selection is required for ${role}!`,
                },
              ]}
            >
              <Select
                onChange={(value) => handleTeams(value)}
                placeholder="Choose"
                className="w-full"
                size="large"
              >
                {admins?.map((admin) => (
                  <Option key={admin?._id} value={admin?.email}>
                    {admin?.organization}{" "}
                    <span className="text-xs text-slate-400">
                      ({admin?.fullName})
                    </span>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {role === "athlete" && (
            <Form.Item
              name="reqTeam"
              label="Select Team"
              rules={[
                {
                  required: true,
                  message: `Team selection is required for ${role}!`,
                },
              ]}
            >
              <Select placeholder="Choose" className="w-full" size="large">
                {teams?.map((team) => (
                  <Option key={team?._id} value={team._id}>
                    {team?.teamName} ({team?.sports})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

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
            name="phoneNumber"
            label="Phone Number"
            className={`w-full ${role === "parents" ? "col-span-2" : ""}`}
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
      </div>
    </div>
  );
};
