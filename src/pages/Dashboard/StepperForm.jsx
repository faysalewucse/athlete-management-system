import React, { useEffect, useState } from "react";
import { Button, Form, message, Steps } from "antd";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/local-storage";

const StepperForm = ({ steps, submitHandler, navigateLink }) => {
  const [current, setCurrent] = useState(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step")).step)
      : 0
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const handleSubmitForm = (data) => {
    console.log(data);
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
  };

  return (
    <div className="px-10 my-10">
      <Steps
        current={current}
        items={items}
        style={{
          marginBottom: "20px",
        }}
      />
      <Form onFinish={handleSubmitForm} layout="vertical">
        <div>{steps[current].content}</div>
        <div className="flex justify-end">
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button
                className="bg-blue-500"
                type="primary"
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
                className="bg-green-500"
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StepperForm;
