import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { BiUpload } from "react-icons/bi";

const StepThree = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
      <div>
        <Form.Item
          name="drivingLicense"
          label="Driver's License Number"
          rules={[
            { required: true, message: "Driver's License Number is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="passportNumber"
          label="Passport Number"
          rules={[{ required: true, message: "Passport Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="passportNumber"
          label="Passport Number"
          rules={[{ required: true, message: "Passport Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="insuranceCompany"
          label="Insurance Company Name"
          rules={[
            { required: true, message: "Insurance Company Name is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="policyNumber"
          label="Policy Number"
          rules={[{ required: true, message: "Policy Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="groupNumber"
          label="Group Number"
          rules={[{ required: true, message: "Group Number is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="teamName"
          label="Team Name"
          rules={[{ required: true, message: "Team Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="shirtColor"
          label="Shirt Color Preference"
          rules={[
            { required: true, message: "Shirt Color Preference is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="creditCard"
          label="Credit Card Number"
          rules={[
            { required: true, message: "Credit Card Number is required" },
          ]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="expirationDate"
          label="Expiration Date"
          rules={[{ required: true, message: "Expiration Date is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="securityCode"
          label="Security Code"
          rules={[{ required: true, message: "Security Code is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[{ required: true, message: "latitude is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: true, message: "Longitude is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="preferredStartTime"
          label="Preferred start time"
          rules={[
            { required: true, message: "Preferred start time is required" },
          ]}
        >
          <TimePicker
            use12Hours
            format="h:mm a"
            className="w-full px-4 py-2 rounded-lg"
            size="large"
          />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="choiceofWave"
          label="Choice of wave or heat"
          rules={[
            { required: true, message: "Choice of wave or heat is required" },
          ]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="captainsName"
          label="Team Captain Name"
          rules={[{ required: true, message: "Team Captain Name is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="teamLogo"
          label="Upload Team logo"
          className="w-full"
          rules={[{ required: true, message: "Team logo is required" }]}
        >
          <Upload
            className="w-full"
            multiple={false}

            // {...props}
          >
            <Button
              className="bg-white h-10 w-full"
              icon={<BiUpload className="relative" />}
            >
              Select File
            </Button>
          </Upload>
        </Form.Item>
      </div>
    </div>
  );
};

export default StepThree;
