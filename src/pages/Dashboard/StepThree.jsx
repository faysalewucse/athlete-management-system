import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { BiUpload } from "react-icons/bi";

const StepThree = () => {
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
  return <div className="grid grid-cols-1 md:grid-cols-3  gap-4"></div>;
};

export default StepThree;
