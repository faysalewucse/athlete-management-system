import { Checkbox, Form, Input } from "antd";

import CustomFieldsForm from "./CustomFields";

const { TextArea } = Input;

const StepFour = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className="col-span-1">
          <Form.Item
            name="additionalComments"
            label="Additional Comments"
            rules={[
              { required: true, message: "Additional Comments is required" },
            ]}
          >
            <TextArea className="w-full px-4 py-2 rounded-lg" size="large" />
          </Form.Item>
        </div>
        <div className="col-span-1">
          <Form.Item
            name="specialRequests"
            label="Special accommodation requests"
            rules={[
              {
                required: true,
                message: "Special accommodation requests is required",
              },
            ]}
          >
            <TextArea className="w-full px-4 py-2 rounded-lg" size="large" />
          </Form.Item>
        </div>
      </div>

      <CustomFieldsForm />

      <Checkbox>Agree Liability Waiver</Checkbox>
      <Checkbox>Agree to the event's terms and conditions</Checkbox>
    </>
  );
};

export default StepFour;
