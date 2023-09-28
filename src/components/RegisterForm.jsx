import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const onFinish = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/parents/addparents`,
        data
      );
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-white text-primary w-full"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
