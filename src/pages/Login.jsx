import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = (data) => {
    const { email, password } = data;
    setLoading(true);
    login(email, password)
      .then((result) => {
        if (result.user) {
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        toast.error(
          e.message.includes("password") ? "Wrong password" : "User Not Found"
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white mt-20">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-xl lg:w-1/2 md:w-2/3 p-5">
        <div className="relative flex flex-col min-w-0 w-full my-6 border-2 rounded-lg border-primary/25 p-5">
          <h2 className="text-3xl font-bold mb-8 text-center text-dark">
            Login
          </h2>
          {/* <div className="rounded-t mb-0 px-6 py-6">
            <h6
              onClick={googleSignIn}
              className="flex items-center justify-center gap-3 text-gray-600 dark:bg-slate-700 dark:text-white bg-white p-2 border rounded-lg font-bold hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <FcGoogle /> Sign in with Google
            </h6>

            <hr className="mt-6 border-b-1 border-gray-400" />
          </div> */}
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            {/* <div className="text-center mb-3 font-bold">
              <small>Sign in with credentials</small>
            </div> */}
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

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type={`${!showPassword ? "password" : "text"}`}
                  className="border-0 px-3 py-3 placeholder-gray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  style={{ transition: "all .15s ease" }}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <div
                  className="absolute top-9 right-2 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <div className="flex flex-wrap mt-6 text-secondary text-xl">
                <div className="w-1/2">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <small onClick={() => navigate("/register")}>
                      Create new account
                    </small>
                  </a>
                </div>
              </div>
              <div className="text-center mt-6">
                <input
                  disabled={loading}
                  type="submit"
                  value="SIGN IN"
                  className={`${
                    loading && "disabled cursor-not-allowed opacity-50"
                  } bg-gradient cursor-pointer hover:shadow-xl transition-300 text-white w-full p-2 font-semibold rounded`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
