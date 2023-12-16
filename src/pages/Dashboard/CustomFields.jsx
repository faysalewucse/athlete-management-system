import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import CustomFieldsModal from "../../components/modals/CustomFieldsModal";
import { BiPlusCircle } from "react-icons/bi";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AiFillDelete } from "react-icons/ai";
const { TextArea } = Input;

const CustomFieldsForm = () => {
  const [customFields, setCustomFields] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFieldNameChange = (e) => {
    setFieldName(e.target.value);
  };

  const handleFieldLabelChange = (e) => {
    setFieldLabel(e.target.value);
  };

  const handleFieldTypeChange = (value) => {
    setFieldType(value);
  };

  const handleAddCustomField = () => {
    if (fieldName && fieldLabel) {
      setCustomFields([
        ...customFields,
        { name: fieldName, label: fieldLabel, type: fieldType },
      ]);
      setFieldName("");
      setFieldLabel("");
      setFieldType("text");
      setIsModalOpen(false);
    }
  };

  const deleteField = (name) => {
    console.log(name);
    const filterFields = customFields.filter((field) => field.name !== name);
    console.log({ filterFields });
    setCustomFields(filterFields);
  };

  return (
    <div>
      <CustomFieldsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fieldType={fieldType}
        fieldName={fieldName}
        fieldLabel={fieldLabel}
        handleAddCustomField={handleAddCustomField}
        handleFieldTypeChange={handleFieldTypeChange}
        handleFieldLabelChange={handleFieldLabelChange}
        handleFieldNameChange={handleFieldNameChange}
      />

      <h2
        className="text-lg cursor-pointer hover:text-green-500 inline-flex items-center mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create custom fields <BiPlusCircle className="ml-2" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customFields.map((field, index) => (
          <Form.Item
            key={index}
            name={field.name}
            label={field.label}
            tooltip={{
              title: "Delete this field",
              icon: (
                <AiFillDelete
                  className="text-red-500 cursor-pointer ml-2"
                  onClick={() => deleteField(field.name)}
                />
              ),
            }}
            rules={[
              {
                required: true,
                message: `${field.label} is required`,
              },
            ]}
          >
            {field.type === "text" && (
              <Input
                className="w-full px-4 py-2 rounded-lg"
                size="large"
                placeholder={`Enter ${field.label}`}
              />
            )}
            {field.type === "number" && (
              <Input
                type="number"
                className="w-full px-4 py-2 rounded-lg"
                size="large"
                placeholder={`Enter ${field.label}`}
              />
            )}
            {field.type === "textarea" && (
              <TextArea
                className="w-full px-4 py-2 rounded-lg"
                rows={4}
                placeholder={`Enter ${field.label}`}
              />
            )}
            {field.type === "date" && (
              <DatePicker
                className="w-full px-4 py-2 rounded-lg"
                size="large"
                format="MM-DD-YYYY"
              />
            )}
          </Form.Item>
        ))}
      </div>
    </div>
  );
};

export default CustomFieldsForm;
