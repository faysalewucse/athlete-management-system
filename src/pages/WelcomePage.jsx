import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const WelcomePage = () => {
  const [selectedOption, setSelectedOption] = useState("login");

  return (
    <div className="lg:p-10 p-5 min-h-screen">
      <div className="">
        <h1 className="mt-20 text-center font-bold text-2xl md:text-5xl mb-5 md:mb-10">
          Welcome to Overtime
        </h1>
        <div className="lg:w-[40vw] md:w-1/2 w-full mx-auto border-2 border-primary/25 rounded p-5 md:p-10 mt-5">
          <div className="text-center flex gap-5 mb-10">
            <h1
              onClick={() => setSelectedOption("login")}
              className={`w-full px-4 py-2 rounded ${
                selectedOption === "login"
                  ? "bg-primary text-white"
                  : "text-primary border border-primary"
              } cursor-pointer transition-300`}
            >
              Login
            </h1>
            <h1
              onClick={() => setSelectedOption("register")}
              className={`w-full px-4 py-2 rounded ${
                selectedOption === "register"
                  ? "bg-primary text-white"
                  : "text-primary border border-primary"
              } cursor-pointer transition-300`}
            >
              Register
            </h1>
          </div>

          {selectedOption === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
