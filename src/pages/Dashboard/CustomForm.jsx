import React, { useState } from "react";
import { Input, Checkbox, Radio, Button, Upload, Form, Select } from "antd";
import { BiCheckbox, BiCircle } from "react-icons/bi";
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

const CustomFormBuilder = () => {
  const [form] = Form.useForm();
  const [formItems, setFormItems] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();

  const { isLoading, data: teams = [] } = useQuery({
    queryKey: ["teams", currentUser?.email],
    queryFn: async () => {
      let URL = "teams";

      if (currentUser?.role === "admin") {
        URL = `teams/${currentUser?.email}`;
      } else if (currentUser?.role === "coach") {
        URL = `teams/coach-team/${currentUser?.email}`;
      } else if (currentUser?.role === "athlete") {
        URL = `teams/athlete-team/${currentUser?.email}`;
      }
      const { data } = await axiosSecure.get(`/${URL}`);
      return data;
    },
  });

  const addTextField = () => {
    setFormItems([...formItems, { type: "text", label: "Text Field" }]);
  };

  const addCheckbox = () => {
    setFormItems([
      ...formItems,
      {
        type: "checkbox",
        label: "Checkboxes",
        options: [{ optionLabel: "Option 1", value: "option1" }],
        question: "Question for checkboxes",
      },
    ]);
  };

  const addRadioButton = () => {
    setFormItems([
      ...formItems,
      {
        type: "radio",
        label: "Radio Buttons",
        options: [{ optionLabel: "Option 1", value: "option1" }],
        question: "Question for radio buttons",
      },
    ]);
  };

  const addFileUpload = () => {
    setFormItems([...formItems, { type: "file", label: "File Upload" }]);
  };

  const deleteField = (index) => {
    const updatedFormItems = formItems.filter((_, i) => i !== index);
    setFormItems(updatedFormItems);
  };

  const addOption = (index) => {
    const updatedFormItems = [...formItems];
    updatedFormItems[index].options.push({
      optionLabel: `Option ${updatedFormItems[index].options.length + 1}`,
      value: `option${updatedFormItems[index].options.length + 1}`,
    });
    setFormItems(updatedFormItems);
  };

  const updateOption = (itemIndex, optionIndex, event) => {
    const updatedFormItems = [...formItems];
    updatedFormItems[itemIndex].options[optionIndex].optionLabel =
      event.target.value;
    setFormItems(updatedFormItems);
  };

  const updateQuestion = (index, event) => {
    const updatedFormItems = [...formItems];
    updatedFormItems[index].question = event.target.value;
    setFormItems(updatedFormItems);
  };

  const deleteOption = (fieldIndex, optionIndex) => {
    const updatedFormItems = [...formItems];
    updatedFormItems[fieldIndex].options.splice(optionIndex, 1);
    setFormItems(updatedFormItems);
  };

  const renderField = (item, index) => {
    switch (item.type) {
      case "text":
        return (
          <Form.Item
            key={index}
            name={`text_${index}`}
            rules={[{ required: true, message: "Please enter text" }]}
          >
            <div className="flex items-center gap-4">
              <h1>{index + 1}.</h1>
              <Input placeholder="Enter Text..." />
            </div>
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            key={index}
            name={`checkbox_${index}`}
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
                <Input
                  value={item.question}
                  onChange={(e) => updateQuestion(index, e)}
                  placeholder="Enter question"
                />
                {item.options.map((option, idx) => (
                  <div className="flex items-center" key={idx}>
                    <BiCheckbox className="text-4xl text-gray-400" />
                    <Input
                      value={option.optionLabel}
                      onChange={(e) => updateOption(index, idx, e)}
                      placeholder={`Option ${idx + 1}`}
                    />
                    {item.options.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => deleteOption(index, idx)}
                      >
                        <DeleteFilled />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={() => addOption(index)}>Add Option</Button>
              </div>
            </div>
          </Form.Item>
        );

      case "radio":
        return (
          <Form.Item
            key={index}
            name={`radio_${index}`}
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
                <Input
                  value={item.question}
                  onChange={(e) => updateQuestion(index, e)}
                  placeholder="Enter question"
                />
                {item.options.map((option, idx) => (
                  <div className="flex items-center" key={idx}>
                    <BiCircle className="text-3xl text-gray-400" />
                    <Input
                      className="mb-1"
                      value={option.optionLabel}
                      onChange={(e) => updateOption(index, idx, e)}
                      placeholder={`Option ${idx + 1}`}
                    />
                    {item.options.length > 1 && (
                      <Button
                        type="text"
                        onClick={() => deleteOption(index, idx)}
                      >
                        <DeleteFilled />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={() => addOption(index)}>Add Option</Button>
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
                <Input
                  className="mb-2"
                  placeholder="Title"
                  defaultValue={item.title}
                  onChange={(e) => updateTitle(index, e)}
                />
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

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = {
          fields: formItems,
          adminEmail: currentUser?.adminEmail,
          teamId: selectedTeamId,
        };
        // Make your axios POST request here
        axiosSecure
          .post("/upload-custom-form", formData)
          .then((response) => {
            toast.success("File uploaded successfully");
          })
          .catch((error) => {
            // Handle error from POST request
            toast.error("Error sending form data:", error);
          });
      })
      .catch((error) => {
        toast.error("Form validation failed:", error);
      });
  };

  return (
    <div className="max-w-3xl flex gap-5 items-end mx-auto my-10 px-2">
      <Form className="flex-1" layout="vertical" form={form}>
        <div className="p-10 bg-white bg-opacity-50 rounded-2xl">
          <h2 className="font-bold text-center text-4xl text-gradient mb-10">
            Custom Form Builder
          </h2>
          <div>
            <Form.Item
              name="formName"
              label="Form Name"
              rules={[{ required: true, message: "Form Name is required" }]}
            >
              <Input className="w-full rounded-lg" size="middle" />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="teamName"
              label="Select Team"
              rules={[{ required: true, message: "Please select a team." }]}
            >
              <Select
                size="middle"
                className="rounded-lg"
                placeholder="Select Team"
              >
                {teams.map((team) => (
                  <Option key={team?._id} value={team.teamName}>
                    {team.teamName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          {formItems?.map((item, index) => (
            <div key={index}>
              <div className="flex items-start justify-between gap-2">
                {renderField(item, index)}
                <Button
                  type="btn"
                  className="bg-danger text-white hover:bg-danger2"
                  onClick={() => deleteField(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <div className="flex gap-10 mt-10 items-center">
            <Button
              size="middle"
              danger
              className="w-40"
              onClick={() => setFormItems([])}
            >
              Reset Form
            </Button>
            <Button
              size="middle"
              className="w-full bg-gradient text-white"
              onClick={handleSubmit}
            >
              Submit Form
            </Button>
          </div>
        </div>
      </Form>
      <div className="flex flex-col gap-2 mb-5">
        <Button className="bg-gradient text-white" onClick={addTextField}>
          Text Field +
        </Button>
        <Button className="bg-gradient text-white" onClick={addCheckbox}>
          Checkboxes +
        </Button>
        <Button className="bg-gradient text-white" onClick={addRadioButton}>
          Radio Buttons +
        </Button>
        <Button className="bg-gradient text-white" onClick={addFileUpload}>
          File Upload +
        </Button>
      </div>
    </div>
  );
};

export default CustomFormBuilder;
