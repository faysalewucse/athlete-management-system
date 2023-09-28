import { Button, Form, Input, Select } from "antd";

const LoginForm = () => {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    try {
      axios.post("/parents/addParent", data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(errorInfo.errorFields[0].errors[0]);
  };

  const onRoleChange = (value) => {
    switch (value) {
      case "parents":
        form.setFieldsValue();
        break;
      case "athlete":
        form.setFieldsValue();
        break;
      case "coach":
        form.setFieldsValue();
        break;
      case "admin":
        form.setFieldsValue();
        break;
      case "sadmin":
        form.setFieldsValue();
        break;
      default:
    }
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
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select
            placeholder="Select your role"
            onChange={onRoleChange}
            allowClear
          >
            <Option value="parent">Parents</Option>
            <Option value="athlete">Athlete</Option>
            <Option value="coach">Coach</Option>
            <Option value="admin">Admin</Option>
            <Option value="sadmin">Super Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          la
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
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

export default LoginForm;
