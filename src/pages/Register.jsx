import { useState } from "react";
import { Form, Input, Select, Radio, Button, Upload } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdFileUpload } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Brand from "../components/Brand";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      setLoading(true);
      const { address, email, gender, name, password, phoneNumber, role } =
        data;

      const photo = data.photoUrl && data.photoUrl[0];
      const formdata = new FormData();
      let photoURL = "";
      if (photo) {
        formdata.append("image", photo);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_UPLOAD_API
          }`,
          formdata
        );
        if (response?.data?.status === 200) {
          photoURL = response.data.data.display_url;
        }
      }

      signup(email, password, name, photoURL);

      await axios.post(`${import.meta.env.VITE_BASE_API_URL}/user`, {
        email,
        name,
        photoURL: photo ? photoURL : "",
        address,
        gender,
        phoneNumber,
        role,
        teams: [],
      });

      Swal.fire("Welcome!", "You registered Successfully!", "success").then(
        () => {
          navigate("/");
        }
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="text-dark bg-light min-h-[90vh] flex items-center justify-center p-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 lg:w-1/2 w-full bg-primary/10 rounded-xl shadow-lg">
        <div className="flex justify-center mb-5">
          <Brand />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center">Registration</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="md:grid grid-cols-2 gap-x-6 p-10"
          initialValues={{ role: "athlete" }}
        >
          <h1 className="font-semibold text-lg">What is your role?</h1>
          <Form.Item name="role" className="role-radio col-span-2">
            <Radio.Group>
              <Radio value="athlete">Athlete</Radio>
              <Radio value="parents">Parents</Radio>
              <Radio value="coach">Coach</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
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
              {
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                message:
                  "Password must contain at least one capital letter and one special character",
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
            className="col-span-2"
            name="photoUrl"
            label="Photo"
            rules={[{ required: false }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              accept=".jpg, .png, .jpeg"
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
            >
              <Button
                size="large"
                icon={<MdFileUpload className="text-secondary" />}
                className="text-gradient"
              >
                Upload Photo
              </Button>
            </Upload>
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
            name="phoneNumber"
            label="Phone Number"
            className="w-full"
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
