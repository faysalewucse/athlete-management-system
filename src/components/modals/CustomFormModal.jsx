import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Upload,
} from "antd";
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { BiCheckbox, BiCircle } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

const CustomFormModal = ({ formModalOpen, setFormModalOpen, selectedForm }) => {
  const { currentUser } = useAuth();

  console.log(currentUser);

  const renderField = (item, index) => {
    switch (item.type) {
      case "text":
        return (
          <Form.Item
            key={index}
            name={`text_${index}`}
            className="w-full"
            rules={[{ required: true, message: "Please enter text" }]}
          >
            <div className="flex items-center gap-4 mb-2">
              <h1>{index + 1}.</h1>
              <p>{item.text}</p>
            </div>
            <Input
              onChange={(e) => updateTextField(index, e.target.value)}
              placeholder="Write your answer"
            />
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            key={index}
            name={`checkbox_${index}`}
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please enter a question and options",
              },
            ]}
          >
            <div className="flex items-start gap-4">
              <h1>{index + 1}.</h1>
              <div className="flex-1 flex flex-col gap-2">
                <p>{item.question}</p>
                <Checkbox.Group
                  options={item.options.map((option) => {
                    return {
                      label: option.optionLabel,
                      value: option.optionLabel,
                    };
                  })}

                  //   onChange={onChange}
                />
                {/* {item.options.map((option, idx) => (
                  <div className="flex items-center" key={idx}>
                    <BiCheckbox className="text-4xl text-gray-400" />
                    <p>{option.optionLabel}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </Form.Item>
        );

      case "radio":
        return (
          <Form.Item
            key={index}
            name={`radio_${index}`}
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please enter a question and options",
              },
            ]}
          >
            <div className="flex items-start gap-4">
              <h1>{index + 1}.</h1>
              <div className="flex flex-col gap-2">
                <p>{item.question}</p>
                <Radio.Group>
                  <Space direction="vertical">
                    {item.options.map((option, index) => (
                      <Radio key={index} value={option.optionLabel}>
                        {option.optionLabel}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
                {/* {item.options.map((option, idx) => (
                  <div className="flex items-center" key={idx}>
                    <BiCircle className="text-3xl text-gray-400" />
                    <p>{option.optionLabel}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </Form.Item>
        );

      case "file":
        return (
          <Form.Item
            key={index}
            name={`file_${index}`}
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <div className="flex items-start gap-4">
              <h1>{index + 1}.</h1>
              <div>
                <p className="mb-2">{item.title}</p>
                <Upload beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </div>
            </div>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      footer={null}
      onCancel={() => setFormModalOpen(false)}
      open={formModalOpen}
    >
      <div>
        {selectedForm?.fields?.map((item, index) => (
          <div key={index}>
            <div className="flex items-start justify-between gap-2">
              {renderField(item, index)}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CustomFormModal;
