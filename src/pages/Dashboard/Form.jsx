import StepOne from "./StepOne";

import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import StepperForm from "./StepperForm";

const FormLib = () => {
  const steps = [
    {
      title: "Step One",
      content: <StepOne />,
    },
    {
      title: "Step Two",
      content: <StepTwo />,
    },
    {
      title: "Step Three",
      content: <StepThree />,
    },
  ];

  const handleStudentSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StepperForm
      submitHandler={(value) => handleStudentSubmit(value)}
      steps={steps}
    />
  );
};

export default FormLib;
