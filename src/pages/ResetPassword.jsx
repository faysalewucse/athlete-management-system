import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "antd";
import Swal from "sweetalert2";
import GoogleLogin from "../components/Auth/GoogleLogin";
import FacebookLogin from "../components/Auth/FacebookLogin";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = async (data) => {
    const { email } = data;

    const result = await resetPassword(email);

    console.log(result);

    if (result === "Sent") {
      toast.success(
        "Password Reset Link is sent to your email. Please check your email inbox and spam folder."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white mt-20">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-xl lg:w-1/2 md:w-2/3 p-5">
        <div className="relative flex flex-col min-w-0 w-full my-6 border-2 rounded-lg border-primary/25 p-5">
          <h2 className="text-3xl font-bold mb-8 text-center text-dark">
            Reset Password
          </h2>
          <div className="px-4 py-10 pt-0">
            <form onSubmit={handleSubmit(loginHandler)}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase  text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  style={{ transition: "all .15s ease" }}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <Button
                loading={loading}
                disabled={loading}
                size="large"
                htmlType="submit"
                className="bg-gradient text-white mt-5 w-full"
              >
                SEND RESET EMAIL
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
