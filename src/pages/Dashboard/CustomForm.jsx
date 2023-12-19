import React, { useState } from "react";
import { Input, Checkbox, Radio, Button, Upload } from "antd";
import { BiCheckbox, BiCircle } from "react-icons/bi";

const CustomFormBuilder = () => {
  const [formItems, setFormItems] = useState([]);

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

  const renderField = (item, index) => {
    switch (item.type) {
      case "text":
        return (
          <div className="flex items-center gap-4">
            <h1>{index + 1}.</h1>
            <Input key={index} />
          </div>
        );
      case "checkbox":
        return (
          <div key={index} className="flex items-start gap-4">
            <h1>{index + 1}.</h1>

            <div className="flex flex-col gap-2">
              <Input
                value={item.question}
                onChange={(e) => updateQuestion(index, e)}
              />
              {item.options.map((option, idx) => (
                <div className="flex items-center" key={idx}>
                  <BiCheckbox className="text-4xl text-gray-400" />
                  <Input
                    value={option.optionLabel}
                    onChange={(e) => updateOption(index, idx, e)}
                  />
                </div>
              ))}
              <Button onClick={() => addOption(index)}>Add Option</Button>
            </div>
          </div>
        );
      case "radio":
        return (
          <div key={index} className="flex items-start gap-4">
            <h1>{index + 1}.</h1>

            <div className="flex flex-col gap-2">
              <Input
                value={item.question}
                onChange={(e) => updateQuestion(index, e)}
              />

              {item.options.map((option, idx) => (
                <div className="flex items-center" key={idx}>
                  <BiCircle className="text-3xl text-gray-400" />
                  <Input
                    className="mb-2"
                    value={option.optionLabel}
                    onChange={(e) => updateOption(index, idx, e)}
                  />
                </div>
              ))}
            </div>
            <Button onClick={() => addOption(index)}>Add Option</Button>
          </div>
        );
      case "file":
        return <Upload key={index}>File Upload</Upload>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-10">
        <h2 className="font-bold text-center text-4xl text-gradient mb-10">
          Custom Form Builder
        </h2>
        <div className="flex justify-center gap-5 mb-10">
          <Button className="bg-gradient text-white" onClick={addTextField}>
            Add Text Field
          </Button>
          <Button className="bg-gradient text-white" onClick={addCheckbox}>
            Add Checkboxes
          </Button>
          <Button className="bg-gradient text-white" onClick={addRadioButton}>
            Add Radio Buttons
          </Button>
          <Button className="bg-gradient text-white" onClick={addFileUpload}>
            Add File Upload
          </Button>
        </div>
        {formItems?.map((item, index) => (
          <div key={index} className="mb-4 space-x-2">
            <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
};

export default CustomFormBuilder;
