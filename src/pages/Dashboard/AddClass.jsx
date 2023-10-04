import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { MdFileUpload } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

export const AddClass = () => {
  const [classImage, setClassImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const inputStyle =
    "w-full mt-2 px-4 py-2 rounded focus:outline-none text-gray-800 font-bold";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddClass = async (data) => {
    try {
      const photo = data.image[0];
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

        const newClass = {
          ...data,
          image: photoURL,
          price: parseInt(data.price),
          availableSeats: parseInt(data.availableSeats),
          totalSeats: parseInt(data.availableSeats),
          instructorName: currentUser?.name,
          instructorEmail: currentUser.email,
          status: "pending",
        };

        axiosSecure.post(`/classes`, newClass).then((response) => {
          if (response.status === 200) {
            Swal.fire("Great!", "Class Added Successfully!", "success");
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
    <div className="dark:bg-slate-900 dark:text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl mx-auto p-20">
        <form onSubmit={handleSubmit(handleAddClass)}>
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block">
                Class Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`${inputStyle}`}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="relative mb-4">
              <label htmlFor="image" className="block mb-4">
                Class Image <span className="text-primary">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  accept=".jpg, .png, .jpeg"
                  type="file"
                  id="image"
                  {...register("image", {
                    required: "Class Image is required",
                  })}
                  className={`${inputStyle} opacity-0 z-10`}
                  onChange={(e) => {
                    setClassImage(e.target.files[0].name);
                  }}
                />
                <span className="absolute flex items-center w-fit gap-1 hover:bg-secondary justify-center bg-primary p-2 rounded text-white">
                  <MdFileUpload className="text-xl" />
                  Upload Photo
                </span>
                <span className="mr-5">{classImage && classImage}</span>
              </div>
              {errors.classImage && (
                <span className="text-red-500">
                  {errors.classImage.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="instructorName" className="block">
                Instructor Name
              </label>
              <input
                type="text"
                id="instructorName"
                value={currentUser?.name} // Replace with the logged-in instructor's name
                readOnly
                className={`${inputStyle} bg-gray-400 cursor-not-allowed`}
              />
            </div>
            <div>
              <label htmlFor="instructorEmail" className="block">
                Instructor Email
              </label>
              <input
                type="email"
                id="instructorEmail"
                value={currentUser?.email} // Replace with the logged-in instructor's email
                readOnly
                className={`${inputStyle} bg-gray-400 cursor-not-allowed`}
              />
            </div>
            <div>
              <label htmlFor="availableSeats" className="block">
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                {...register("availableSeats", {
                  required: "Available Seats is required",
                  min: {
                    value: 1,
                    message: "Available Seats must be greater than 0",
                  },
                })}
                className={`${inputStyle}`}
              />
              {errors.availableSeats && (
                <span className="text-red-500">
                  {errors.availableSeats.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="price" className="block">
                Price
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price must be greater than 0",
                  },
                })}
                className={`${inputStyle}`}
              />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                {...register("description")}
                className={`${inputStyle}`}
              />
            </div>
            <input
              disabled={loading}
              type="submit"
              className={`${
                loading
                  ? "disabled cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } w-fit ml-auto col-span-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary focus:outline-none`}
              value={loading ? "Please Wait..." : "Add Class"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
