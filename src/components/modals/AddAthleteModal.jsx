import { Form, Input, Button, Select, Modal, Upload, DatePicker } from "antd";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { MdFileUpload } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const { Option } = Select;

const AddAthleteModal = ({ isModalOpen, setIsModalOpen, refetch, coaches }) => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    try {
      setLoading(true);
      const {
        address,
        email,
        gender,
        name,
        password,
        phoneNumber,
        role,
        dateOfBirth,
        institute,
        origanization,
      } = data;

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

      await signup(email, password, name, photoURL);

      const userData = {
        email,
        name,
        photoURL: photo ? photoURL : "",
        address,
        gender,
        dateOfBirth,
        phoneNumber,
        role,
        status: "pending",
      };

      if (role === "admin") userData.institute = institute;
      else userData.adminEmail = origanization;

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
          name="photoUrl"
          label="Photo"
          className="col-span-2"
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
            format="YYYY-MM-DD"
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
    </Modal>
  );
};

export default AddAthleteModal;