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

const StepTwo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
      <div>
        <Form.Item
          name="eventCategory"
          label="Event Category"
          rules={[{ required: true, message: "Event Category is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="running">Running</Option>
            <Option value="Swimming">Swimming</Option>
            <Option value="Cycling">Cycling</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="participantId"
          label="Participant ID"
          rules={[{ required: true, message: "Participant ID is required" }]}
        >
          <Input
            type="number"
            className="w-full px-4 py-2 rounded-lg"
            size="large"
          />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="eventRegDate"
          label="Event Registration Date"
          rules={[
            { required: true, message: "Event Registration Date is required" },
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
          name="eventStartTime"
          label="Event Start Time"
          rules={[{ required: true, message: "Event Start Time is required" }]}
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
          name="eventEndTime"
          label="Event End Time"
          rules={[{ required: true, message: "Event End Time is required" }]}
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
          name="q/a"
          label="Have you ever participated in this event before?"
          rules={[{ required: true, message: "Answer is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="rating"
          label="Rate your fitness level"
          rules={[{ required: true, message: "Answer is required" }]}
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
          name="dietaryRestrictions"
          label="Dietary Restrictions"
          rules={[
            { required: true, message: "Dietary Restrictions is required" },
          ]}
        >
          <Select
            size="large"
            className="rounded-lg"
            mode="multiple"
            allowClear
          >
            <Option value="Vegan">Vegan</Option>
            <Option value="Vegeterian">Vegeterian</Option>
            <Option value="Gluten-Free">Gluten-Free</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="tshirtSize"
          label="Tshirt Size"
          rules={[{ required: true, message: "Tshirt Size is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="small">small</Option>
            <Option value="medium">medium</Option>
            <Option value="large">large</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="country"
          label="Country of Residence"
          rules={[
            { required: true, message: "Country of Residence is required" },
          ]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="small">USA</Option>
            <Option value="medium">Canada</Option>
            <Option value="large">UK</Option>
            <Option value="large">India</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="facebook"
          label="Facebook Profile"
          rules={[{ required: true, message: "Facebook Profile is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="instagram"
          label="Instagram Profile"
          rules={[{ required: true, message: "Instagram Profile is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="twitter"
          label="Twitter Profile"
          rules={[{ required: true, message: "Twitter Profile is required" }]}
        >
          <Input className="w-full px-4 py-2 rounded-lg" size="large" />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="sportRating"
          label="Rate your experience level in this sport"
          rules={[{ required: true, message: "Answer is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="distance"
          label="What distance are you registering for?"
          rules={[{ required: true, message: "Answer is required" }]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="5K">5K</Option>
            <Option value="10K">10K</Option>
            <Option value="Half Marathon">Half Marathon</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          name="medicalConditions"
          label="Medical Conditions"
          className="w-full"
          rules={[
            { required: true, message: "Medical Conditions is required" },
          ]}
        >
          <Select size="large" className="rounded-lg">
            <Option value="Asthma">Asthma</Option>
            <Option value="Heart Condition">Heart Condition</Option>
          </Select>
        </Form.Item>
      </div>
      <div>
        <Form.Item
          name="medicalCertificate"
          label="Medical Certificate"
          className="w-full"
          rules={[
            { required: true, message: "Medical Certificate is required" },
          ]}
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

export default StepTwo;
