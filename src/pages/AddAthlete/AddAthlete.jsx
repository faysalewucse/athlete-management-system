import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Upload,
} from "antd";
import { BsUpload } from "react-icons/bs";
import axios from "axios";

const { Option } = Select;

const AddAthelete = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // Form validation rules
  const onFinish = async (values) => {
    setSubmitting(true);
    console.log("Received values=", values);

    //  replace with your API endpoint
    await axios
      .post("//url", {
        values,
      })
      .then((res) => {
        console.log(res);
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const file = (e) => {
    console.log("Upload event:", e);
  };

  return (
    <div className="container w-10/12 md:w-8/12  mx-auto py-20">
      {/* <h1 className="text-center text-4xl font-bold mb-4">Add Athlete</h1> */}
      <Form
        form={form}
        name="add-athlete"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="bg-primary bg-opacity-20 shadow-xl border-l border-white p-10 rounded-2xl"
      >
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Athlete Information
          </h2>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter the athlete's full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select the athlete's gender!",
                },
              ]}
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please select the athlete's date of birth!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </div>
        {/* contact */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Contact Information
          </h2>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter athlete's email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                pattern: /^\d{7,13}$/,
                required: true,
                message: "Please enter athlete's phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please enter athlete's address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        {/* sport details */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Sports Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Form.Item
              name="sport"
              label="Sport"
              rules={[
                {
                  required: true,
                  message: "Please enter the athlete's Sport!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
              rules={[
                {
                  required: true,
                  message: "Please enter the athlete's sport role or position!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="jerseyNumber"
              label="Jersey Number"
              rules={[
                {
                  type: "number",
                  message: "Please enter valid number!",
                },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>
        </div>
        {/* physical */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Physical Attributes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Form.Item
              name="height"
              label="Height"
              rules={[
                {
                  required: "true",
                  message: "Please enter athlete's height!",
                },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              name="weight"
              label="Weight"
              rules={[
                {
                  required: "true",
                  message: "Please enter athlete's weight!",
                },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
          </div>
        </div>
        {/* experience */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Experience Level
          </h2>
          <Form.Item
            name="experienceLevel"
            label="Experience Level"
            rules={[
              {
                required: true,
                message: "Please select athlete's experience level!",
              },
            ]}
          >
            <Select>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advance">Advance</Option>
            </Select>
          </Form.Item>
        </div>
        {/* medication  */} {/* medication part incomplete */}
        {/* <div>
          <h2>
            <span className="text-primary text-lg font-semibold mb-3 underline">
              Medical Information
            </span>
          </h2>
          <Form.Item
            name="allergies"
            label="Allergies"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="pastInjuries"
            label="Past Injuries"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="currentMedications"
            label="Current Medications"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="medicalConditions"
            label="Medical Conditions"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="dietaryPreferences"
            label="Dietary Preferences or Restrictions"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="specialTrainingRequirements"
            label="Special Training Requirements"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </div> */}
        {/* Social */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Social and Contact
          </h2>
          <Form.Item
            name="socialProfile"
            label="Social Media Profile"
            tooltip="only for professional"
            rules={[
              {
                required: false,
                type: "url",
                message: "Please enter valid link!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <h4 className="text-lg font-medium mb-2">
            Parents Info{" "}
            <span className="text-sm font-light">(for younger)</span>
          </h4>
          <Form.Item name="parentName" label="Parent Name">
            <Input />
          </Form.Item>
          <Form.Item name="parentContact" label="Parent Phone/Email">
            <Input />
          </Form.Item>
        </div>
        {/* profile photo */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 underline">
            Profile Management
          </h2>
          <Form.Item
            name="profile"
            valuePropName="fileList"
            getValueFromEvent={file}
          >
            <Upload name="logo" listType="picture">
              <Button className="bg-blue-300 text-white flex items-center gap-2">
                <BsUpload /> Upload Profile Picture
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            className="bg-primary text-white"
            htmlType="submit"
            loading={submitting}
          >
            Add Athlete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAthelete;
