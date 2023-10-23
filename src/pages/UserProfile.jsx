import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "../components/Container";
import {
  Input,
  Progress,
  Form,
  DatePicker,
  Select,
  Button,
  Upload,
} from "antd"; // Import Modal and Input from Ant Design
import avatar from "/avatar.png";
import moment from "moment";
import { Option } from "antd/es/mentions";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdCameraAlt, MdEdit, MdFileUpload } from "react-icons/md";
import axios from "axios";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { currentUser, updateUserProfile } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);
  // const [edit, setEdit] = useState(false);

  const updateUser = async (values) => {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      speed,
      strength,
      accuracy,
      endurance,
      goalsScored,
      assists,
      rebounds,
      goalsSaved,
      pointsScored,
      allergies,
      pastInjuries,
    } = values;

    const photo = values.photoUrl && values.photoUrl[0].originFileObj;
    const formdata = new FormData();
    let photoURL = "";

    if (photo) {
      formdata.append("image", photo);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_API
        }`,
        formdata
      );
      if (response?.data?.status === 200) {
        photoURL = response.data.data.display_url;
      }
    }
    const newData = {
      photoURL,
      firstName,
      lastName,
      gender,
      phoneNumber,
      address: { address },
      dateOfBirth: dateOfBirth,
    };

    if (currentUser?.role === "athlete") {
      newData.performance = {
        speed,
        strength,
        accuracy,
        endurance,
        goalsScored,
        assists,
        rebounds,
        goalsSaved,
        pointsScored,
      };
      newData.pastInjuries = pastInjuries;
      newData.allergies = allergies;
    }

    setSubmitting(true);
    await axiosSecure
      .patch(
        `${import.meta.env.VITE_BASE_API_URL}/updateProfile/${
          currentUser?.email
        }`,
        newData
      )
      .then((res) => {
        if (res.status === 200) {
          form.resetFields();
          setSubmitting(false);
          toast.success("Profile Updated Successfully");
        }
      });
  };

  // birthday validator
  const validateDateOfBirth = (rule, value) => {
    if (value && value.isAfter()) {
      return Promise.reject("Date of Birth cannot be in the future");
    }

    const eighteenYearsAgo = moment().subtract(18, "years");
    if (value && value.isAfter(eighteenYearsAgo)) {
      return Promise.reject("You must be at least 18 years old");
    }

    return Promise.resolve();
  };

  const [newImage, setNewImage] = useState();

  const changeProfileHandler = (e) => {
    setNewImage(e.fileList[0]);
    console.log(e);
  };

  return (
    // <div className="md:p-20 p-5 min-h-[90vh] mt-20">
    //   <Container>
    //     <Form
    //       layout="vertical"
    //       onFinish={updateUser}
    //       className="flex justify-center"
    //     >
    //       <div className="flex-auto">
    //         <img
    //           src={currentUser?.photoURL || avatar}
    //           alt=""
    //           className="rounded-full w-80 h-80 object-cover"
    //         />
    //         <div className="mt-4">
    //           <h3 className="text-base font-medium text-gray-500">
    //             Profile Completed
    //           </h3>
    //           <Progress percent={10} className="w-80" />

    //           <Form.Item
    //             name="photoUrl"
    //             className="ml-16 mt-3 w-1/4"
    //             rules={[{ required: false }]}
    //             valuePropName="fileList"
    //             getValueFromEvent={(e) => {
    //               if (Array.isArray(e)) {
    //                 return e;
    //               }
    //               return e && e.fileList;
    //             }}
    //           >
    //             <Upload
    //               accept=".jpg, .png, .jpeg"
    //               maxCount={1}
    //               listType="picture"
    //               beforeUpload={() => false}
    //             >
    //               <Button
    //                 size="large"
    //                 icon={<MdFileUpload className="text-secondary" />}
    //                 className="text-gradient"
    //               >
    //                 Upload Profile
    //               </Button>
    //             </Upload>
    //           </Form.Item>
    //         </div>
    //       </div>
    //       <div className="flex-1">
    //         <div className="">
    //           <div className="">
    //             <div className="">
    //               <h1 className="text-lg font-semibold text-gradient">
    //                 Basic Info
    //               </h1>
    //               <div>
    //                 <Form.Item
    //                   name="firstName"
    //                   label="First Name"
    //                   initialValue={currentUser?.firstName}
    //                   className=" mt-2"
    //                 >
    //                   <Input />
    //                 </Form.Item>
    //                 <Form.Item
    //                   name="lastName"
    //                   label="Last Name"
    //                   initialValue={currentUser?.lastName}
    //                   className=" mt-2"
    //                 >
    //                   <Input />
    //                 </Form.Item>
    //                 <Form.Item
    //                   name="dateOfBirth"
    //                   label="Date of Birth"
    //                   rules={[{ validator: validateDateOfBirth }]}
    //                   className=""
    //                   initialValue={moment(currentUser?.dateOfBirth)}
    //                 >
    //                   <DatePicker format="YYYY-MM-DD" />
    //                 </Form.Item>
    //                 <Form.Item
    //                   name="gender"
    //                   label="Gender"
    //                   className=""
    //                   initialValue={currentUser?.gender}
    //                 >
    //                   <Select className="rounded-lg">
    //                     <Option value="male">Male</Option>
    //                     <Option value="female">Female</Option>
    //                     <Option value="others">Others</Option>
    //                   </Select>
    //                 </Form.Item>
    //                 <Form.Item
    //                   name="phoneNumber"
    //                   label="Phone Number"
    //                   className=""
    //                   initialValue={currentUser?.phoneNumber}
    //                   rules={[
    //                     {
    //                       min: 10,
    //                       message: "Phone Number must be at least 10 digits",
    //                     },
    //                   ]}
    //                 >
    //                   <Input type="number" className="rounded-lg" />
    //                 </Form.Item>
    //                 <Form.Item
    //                   initialValue={currentUser?.address.address}
    //                   name="address"
    //                   label="Address"
    //                   className=""
    //                 >
    //                   <Input.TextArea className="rounded-lg" />
    //                 </Form.Item>
    //               </div>
    //             </div>

    //             <hr className="border-t my-5 border-gray-300" />
    //             {currentUser?.role === "athlete" && (
    //               <div>
    //                 <div className=" ">
    //                   <div className="flex flex-col justify-center">
    //                     <h1 className="text-lg font-semibold text-gradient">
    //                       Additional Info
    //                     </h1>
    //                     <div>
    //                       <Form.Item
    //                         name="sports"
    //                         label="Sports"
    //                         className=" mt-2"
    //                       >
    //                         <Input placeholder="The sports you are involved" />
    //                       </Form.Item>
    //                       <Form.Item
    //                         name="position"
    //                         label="Position"
    //                         className=""
    //                       >
    //                         <Input placeholder="The position you play" />
    //                       </Form.Item>
    //                     </div>
    //                   </div>
    //                   <div>
    //                     <h1 className="text-lg font-semibold text-gradient">
    //                       Performance
    //                     </h1>
    //                     <Form.Item name="speed" label="Speed" className=" mt-2">
    //                       <Input
    //                         type="number"
    //                         placeholder="Your average speed"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="strength"
    //                       label="Strength"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="Your Strength Measurement based on weight lifting"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="accuracy"
    //                       label="Accuracy"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="accuracy in shooting or passing"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="endurance"
    //                       label="Endurance"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="Measures of endurance, like distance covered or duration"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="goalsScored"
    //                       label="Goals Scored"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="The number of goals scored in a sport like soccer"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item name="assists" label="Assists" className="">
    //                       <Input
    //                         type="number"
    //                         placeholder="The number of assists provided to teammates"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="rebounds"
    //                       label="Rebounds"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="The number of rebounds in a sport like basketball"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="goalsSaved"
    //                       label="Goals Saved"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="For sports like hockey or soccer"
    //                       />
    //                     </Form.Item>
    //                     <Form.Item
    //                       name="pointsScored"
    //                       label="Points Scored"
    //                       className=""
    //                     >
    //                       <Input
    //                         type="number"
    //                         placeholder="Total points scored in a game or season"
    //                       />
    //                     </Form.Item>
    //                   </div>
    //                 </div>
    //                 <hr className="border-t my-5 border-gray-300" />
    //                 <div className="">
    //                   <h1 className="text-lg font-semibold text-gradient">
    //                     Medical info
    //                   </h1>
    //                   <Form.Item
    //                     name="allergies"
    //                     label="Allergies"
    //                     className=" mt-2"
    //                   >
    //                     <Input />
    //                   </Form.Item>

    //                   <Form.List name="pastInjuries">
    //                     {(fields, { add, remove }) => (
    //                       <div>
    //                         {fields.map(({ key, name }) => (
    //                           <div key={key}>
    //                             <Form.Item
    //                               name={[name, "type"]}
    //                               label="Type"
    //                               className=""
    //                             >
    //                               <Input placeholder="The injury type" />
    //                             </Form.Item>
    //                             <Form.Item
    //                               name={[name, "date"]}
    //                               label="Date"
    //                               className=""
    //                             >
    //                               <DatePicker format="YYYY-MM-DD" />
    //                             </Form.Item>
    //                             <Form.Item
    //                               name={[name, "treatment"]}
    //                               label="Treatment"
    //                               className=""
    //                             >
    //                               <Input placeholder="How the injury was treated" />
    //                             </Form.Item>
    //                             <Form.Item
    //                               name={[name, "recoveryStatus"]}
    //                               label="Recovery Status"
    //                               className=""
    //                             >
    //                               <Select>
    //                                 <Option value="fully recovered">
    //                                   Fully Recovered
    //                                 </Option>
    //                                 <Option value="ongoing recovery">
    //                                   Ongoing Recovery
    //                                 </Option>
    //                                 <Option value="not recovered">
    //                                   Not Recovered
    //                                 </Option>
    //                               </Select>
    //                             </Form.Item>
    //                             <Form.Item
    //                               name={[name, "rehabilitation"]}
    //                               label="Rehabilitation Notes"
    //                               className=""
    //                             >
    //                               <Input.TextArea />
    //                             </Form.Item>
    //                             <Button
    //                               className="bg-red-500 bg-opacity-50 mb-1"
    //                               type="dashed"
    //                               onClick={() => remove(name)}
    //                             >
    //                               Remove Past Injury
    //                             </Button>
    //                           </div>
    //                         ))}
    //                         <Form.Item>
    //                           <Button
    //                             className="bg-green-500 bg-opacity-50"
    //                             type="dashed"
    //                             onClick={() => add()}
    //                           >
    //                             Add Past Injury
    //                           </Button>
    //                         </Form.Item>
    //                       </div>
    //                     )}
    //                   </Form.List>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <Button
    //           loading={submitting}
    //           className="block mx-auto bg-gradient text-white"
    //           htmlType="submit"
    //         >
    //           Update Profile
    //         </Button>
    //       </div>
    //     </Form>
    //   </Container>
    // </div>
    <div className="py-40 p-5 ">
      <Container extraStyle={"flex justify-center"}>
        <div className="bg-primary/5 text-center p-10 rounded-lg">
          <h1 className="text-4xl font-bold">{currentUser?.fullName}</h1>
          <h1>{currentUser?.email}</h1>
          <img
            src={newImage ? newImage : currentUser?.photoURL || avatar}
            alt=""
            className="my-10 rounded-full border border-primary w-80 h-80 object-cover"
          />
          <h3 className="text-base font-medium text-gray-500">
            Profile Completed
          </h3>
          <Progress percent={10} className="w-80" />

          <Upload
            accept=".jpg, .png, .jpeg"
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
            onChange={changeProfileHandler}
            className="flex w-full justify-center"
          >
            <Button
              size="large"
              icon={<MdCameraAlt className="text-secondary" />}
              className="text-gradient w-full"
            >
              Change Profile Picture
            </Button>
          </Upload>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
