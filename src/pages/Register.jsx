import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdFileUpload } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const registerHandler = async (data) => {
    try {
      const { address, email, gender, name, password, phoneNumber } = data;

      const photo = data.photoUrl[0];
      const formdata = new FormData();
      formdata.append("image", photo);

      setLoading(true);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_API
        }`,
        formdata
      );
      if (response?.data?.status === 200) {
        const photoURL = response.data.data.display_url;
        signup(email, password, name, photoURL);

        axios
          .post(`${import.meta.env.VITE_BASE_API_URL}/user`, {
            email,
            name,
            photoURL,
            address,
            gender,
            phoneNumber,
            role: "student",
          })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                "Welcome!",
                "You registered to Ninja School Successfully!",
                "success"
              );
              setLoading(false);
            }
          });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="dark:bg-gray-900 text-slate-700 dark:text-white min-h-[85vh] flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-5 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-8 text-center">Registration</h2>
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="md:grid grid-cols-2 gap-x-6 bg-gray-200 dark:bg-gray-800 p-10 rounded shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2">
              Password <span className="text-primary">*</span>
            </label>
            <input
              type={`${!showPassword ? "password" : "text"}`}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
                  message:
                    "Password must contain at least one capital letter and one special character",
                },
              })}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            />
            <div
              className="absolute top-10 right-2 text-xl cursor-pointer dark:text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password <span className="text-primary">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              })}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="relative mb-4 col-span-2">
            <label htmlFor="photoUrl" className="block mb-4">
              Photo <span className="text-primary">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                accept=".jpg, .png, .jpeg"
                type="file"
                id="photoUrl"
                {...register("photoUrl", { required: "Photo URL is required" })}
                className="absolute left-0 w-full opacity-0"
                onChange={(e) => {
                  setImage(e.target.files[0].name);
                }}
              />
              <span className="flex items-center w-fit gap-1 hover:bg-secondary justify-center bg-primary p-2 rounded text-white">
                <MdFileUpload className="text-xl" />
                Upload Photo
              </span>
              <span>{image && image}</span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="w-full px-4 py-2 rounded text-slate-700 focus:outline-none shadow"
            ></textarea>
          </div>
          <input
            disabled={loading}
            type="submit"
            className={`${
              loading && "disabled cursor-not-allowed opacity-50"
            } w-full col-span-2 bg-primary text-white cursor-pointer px-4 py-2 rounded hover:bg-secondary focus:outline-none`}
            value={loading ? "Please Wait..." : "Register"}
          />
        </form>
      </div>
    </div>
  );
};
