import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  Checkbox,
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
    const {
      fullName,
      dob,
      gender,
      email,
      phone,
      address,
      parentName,
      parentContact,
      sport,
      position,
      jerseyNumber,
      height,
      weight,
      experienceLevel,
      allergies,
      pastInjuries,
      currentMedication,
      medicalConditions,
      dietaryPreferences,
      specialTrainingRequirements,
      socialProfile,
      consentAndLiabilityAgreement,
      profile,
    } = values;

    const athleteData = {
      profile,
      athleteInfo: {
        fullName,
        gender,
        dob: dob.format("DD-MM-YYYY"),
        contactInfo: {
          phone,
          email,
          address,
        },
      },
      sportsDetails: {
        sport,
        position,
        jerseyNumber: String(jerseyNumber),
        height: Number(height),
        weight: Number(weight),
      },
      experienceLevel,
      medicalInfo: {
        allergies: allergies
          ? allergies?.split(",").map((item) => item.trim())
          : [],
        pastInjuries: pastInjuries?.map((injury) => ({
          type: injury.type,
          date: injury.date.format("YYYY-MM-DD"),
          description: injury.description,
        })),
        currentMedication,
        medicalConditions,
        dietaryPreferences,
        specialTrainingRequirements,
      },
      socialProfile,
      parentInfo: {
        parentName,
        parentContact,
      },
      consentAndLiabilityAgreement,
    };

    console.log("Received values", athleteData);

    //  replace with your API endpoint
    await axios
      .post("//url", {
        athleteData,
      })
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        form.resetFields();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const file = (e) => {
    console.log("Upload event:", e);
  };

  return (
    <div className="container max-w-4xl p-10">
      <Form
        form={form}
        name="add-athlete"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
        className="p-10 rounded-2xl"
      >
        {/* profile photo */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
        {/* athlete info */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
          <h2 className="text-primary text-lg font-semibold mb-3 ">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
          </div>
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
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
        {/* medication  */}
        <div>
          <h2>
            <span className="text-primary text-lg font-semibold mb-3 ">
              Medical Information
            </span>
          </h2>
          <Form.Item
            tooltip="Enter allergies separated by commas (if any)"
            name="allergies"
            label="Allergies"
          >
            <Input />
          </Form.Item>
          <Form.Item
            tooltip="if any"
            name="currentMedication"
            label="Current Medication"
          >
            <Input />
          </Form.Item>
          <Form.Item
            tooltip="if any"
            name="medicalConditions"
            label="Medical Conditions"
          >
            <Input />
          </Form.Item>
          <Form.Item
            tooltip="if any"
            name="dietaryPreferences"
            label="Dietary Preferences"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="specialTrainingRequirements"
            label="Special Training Requirements"
            tooltip="if needed, otherwise type 'none' "
          >
            <Input />
          </Form.Item>

          <h3 className="my-3">Past Injuries</h3>
          <Form.List name="pastInjuries">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name }) => (
                  <div key={key}>
                    <Form.Item
                      name={[name, "type"]}
                      label="Type"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the injury type.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[name, "date"]}
                      label="Date"
                      rules={[
                        {
                          required: true,
                          message: "Please select the date of the injury.",
                        },
                      ]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                      name={[name, "description"]}
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Please enter a description of the injury.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      className="bg-red-500 bg-opacity-50 mb-1"
                      type="dashed"
                      onClick={() => remove(name)}
                    >
                      Remove Injury
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    className="bg-green-500 bg-opacity-50"
                    type="dashed"
                    onClick={() => add()}
                  >
                    Add Injury
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </div>
        {/* Social */}
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3 ">
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
        {/* terms */}
        <div>
          <Form.Item
            name="consentAndLiabilityAgreement"
            valuePropName="checked"
          >
            <Checkbox>Agree to terms and conditions.</Checkbox>
          </Form.Item>
        </div>
        {/* submit */}
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
