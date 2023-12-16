import { DatePicker, Form, Input, Select } from "antd";

const StepOne = () => {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
      <div>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>

      {/* Third Input Field */}
      <div>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Country is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="streetAddress2"
          label="Street Address line 2"
          rules={[
            { required: true, message: "Street Address line 2 is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="emergencyEmail"
          label="Emergency Email"
          rules={[{ required: true, message: "Emergency Email is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="number"
          label="Number"
          rules={[{ required: true, message: "Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="emergencyNumber"
          label="Emergency Number"
          rules={[{ required: true, message: "Emergency Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="emergencyNumberRelationship"
          label="Emergency Number Relationship to participant"
          rules={[
            {
              required: true,
              message:
                "Emergency Number Relationship to participant is required",
            },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="city"
          label="city"
          rules={[{ required: true, message: "city is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="state"
          label="state"
          rules={[{ required: true, message: "state is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="zipCode"
          label="ZIP Code"
          rules={[{ required: true, message: "ZIP Code is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="emergencyName"
          label="Emergency Contact Name"
          rules={[
            { required: true, message: "Emergency Contact Name is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
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
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default StepOne;
