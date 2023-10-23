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
  Tabs,
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
  const { TabPane } = Tabs;
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

  const onTabChange = (key) => {
    console.log(key);
  };

  // const items = [
  //   {
  //     key: "1",
  //     label: "Basic Info",
  //     children: "Content of Tab Pane 1",
  //   },
  //   {
  //     key: "2",
  //     label: "Performance",
  //     children: "Content of Tab Pane 2",
  //   },
  //   {
  //     key: "3",
  //     label: "Medical Info",
  //     children: "Content of Tab Pane 3",
  //   },
  // ];

  return (
    <div className="py-40 p-5 ">
      <Container extraStyle={"flex flex-col md:flex-row md:items-start gap-8 "}>
        {/* profile image card */}
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
        {/* edit info */}
        <div className="bg-primary/5 text-center p-5 md:p-10 rounded-lg">
          <h1 className="text-4xl font-bold text-start">Edit Profile</h1>

          <Form layout="vertical">
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
              <TabPane
                className="grid md:grid-cols-2 md:gap-10"
                tab="Basic Info"
                key="1"
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                  initialValue={currentUser?.firstName}
                  className=" mt-2 text-base font-medium"
                >
                  <Input className="text-gray-500 md:w-[350px] py-2 px-3" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  initialValue={currentUser?.lastName}
                  className=" mt-2 text-base font-medium"
                >
                  <Input className="text-gray-500 md:w-[350px] py-2 px-3" />
                </Form.Item>
                <Form.Item
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[{ validator: validateDateOfBirth }]}
                  className=" mt-2 text-base font-medium"
                  initialValue={moment(currentUser?.dateOfBirth)}
                >
                  <DatePicker
                    className="text-gray-500 w-full md:w-[350px] py-2"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  className=" mt-2 text-base font-medium"
                  initialValue={currentUser?.gender}
                >
                  <Select className="rounded-lg md:w-[350px] h-10">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  className=" mt-2 text-base font-medium"
                  initialValue={currentUser?.phoneNumber}
                  rules={[
                    {
                      min: 10,
                      message: "Phone Number must be at least 10 digits",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="text-gray-500 md:w-[350px] py-2 px-3"
                  />
                </Form.Item>
                <Form.Item
                  initialValue={currentUser?.address.address}
                  name="address"
                  label="Address"
                  className=" mt-2 text-base font-medium"
                >
                  <Input.TextArea className="text-gray-500 md:w-[350px] px-3" />
                </Form.Item>
              </TabPane>
              {currentUser?.role !== "athlete" && (
                <TabPane
                  className="grid md:grid-cols-2 md:gap-x-10"
                  tab="Performance"
                  key="2"
                >
                  <Form.Item
                    name="sports"
                    label="Sports"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      placeholder="The sports you are involved"
                    />
                  </Form.Item>
                  <Form.Item
                    name="position"
                    label="Position"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      placeholder="The position you play"
                    />
                  </Form.Item>
                  <Form.Item
                    name="speed"
                    label="Speed"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="Your average speed"
                    />
                  </Form.Item>
                  <Form.Item
                    name="strength"
                    label="Strength"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="Your Strength Measurement based on weight lifting"
                    />
                  </Form.Item>
                  <Form.Item
                    name="accuracy"
                    label="Accuracy"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="accuracy in shooting or passing"
                    />
                  </Form.Item>
                  <Form.Item
                    name="endurance"
                    label="Endurance"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="Measures of endurance, like distance covered or duration"
                    />
                  </Form.Item>
                  <Form.Item
                    name="goalsScored"
                    label="Goals Scored"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="The number of goals scored in a sport like soccer"
                    />
                  </Form.Item>
                  <Form.Item
                    name="assists"
                    label="Assists"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="The number of assists provided to teammates"
                    />
                  </Form.Item>
                  <Form.Item
                    name="rebounds"
                    label="Rebounds"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="The number of rebounds in a sport like basketball"
                    />
                  </Form.Item>
                  <Form.Item
                    name="goalsSaved"
                    label="Goals Saved"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="For sports like hockey or soccer"
                    />
                  </Form.Item>
                  <Form.Item
                    name="pointsScored"
                    label="Points Scored"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500 md:w-[350px] py-2 px-3"
                      type="number"
                      placeholder="Total points scored in a game or season"
                    />
                  </Form.Item>
                </TabPane>
              )}
              {currentUser?.role !== "athlete" && (
                <TabPane
                  className="grid md:grid-cols-2 md:gap-10 "
                  tab="Medical Info"
                  key="3"
                >
                  <Form.Item
                    name="allergies"
                    label="Allergies"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input className="text-gray-500 md:w-[350px] py-2 px-3" />
                  </Form.Item>

                  <Form.List name="pastInjuries">
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name }) => (
                          <div key={key}>
                            <Form.Item
                              name={[name, "type"]}
                              label="Type"
                              className=" mt-2 text-base font-medium"
                            >
                              <Input
                                className="text-gray-500 md:w-[350px] py-2 px-3"
                                placeholder="The injury type"
                              />
                            </Form.Item>
                            <Form.Item
                              name={[name, "date"]}
                              label="Date"
                              className=" mt-2 text-base font-medium"
                            >
                              <DatePicker
                                className="text-gray-500 w-full md:w-[350px] py-2 px-3"
                                format="YYYY-MM-DD"
                              />
                            </Form.Item>
                            <Form.Item
                              name={[name, "treatment"]}
                              label="Treatment"
                              className=" mt-2 text-base font-medium"
                            >
                              <Input
                                className="text-gray-500 md:w-[350px] py-2 px-3"
                                placeholder="How the injury was treated"
                              />
                            </Form.Item>
                            <Form.Item
                              name={[name, "recoveryStatus"]}
                              label="Recovery Status"
                              className=" mt-2 text-base font-medium"
                            >
                              <Select
                                placeholder="Recovery Status"
                                className="text-gray-500 md:w-[350px] h-10"
                              >
                                <Option value="fully recovered">
                                  Fully Recovered
                                </Option>
                                <Option value="ongoing recovery">
                                  Ongoing Recovery
                                </Option>
                                <Option value="not recovered">
                                  Not Recovered
                                </Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={[name, "rehabilitation"]}
                              label="Rehabilitation Notes"
                              className=" mt-2 text-base font-medium"
                            >
                              <Input.TextArea className="text-gray-500 md:w-[350px] py-2 px-3" />
                            </Form.Item>
                            <Button
                              className="bg-red-500 bg-opacity-50 h-10 w-full"
                              type="dashed"
                              onClick={() => remove(name)}
                            >
                              Remove Past Injury
                            </Button>
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            className="bg-green-500 bg-opacity-50 h-10 mt-10 w-full"
                            type="dashed"
                            onClick={() => add()}
                          >
                            Add Past Injury
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </TabPane>
              )}
            </Tabs>
            <Button
              loading={submitting}
              className="bg-gradient text-white h-10 rounded px-6 mr-auto block"
            >
              Update
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
