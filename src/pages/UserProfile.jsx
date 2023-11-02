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
import { MdCameraAlt, MdSave } from "react-icons/md";
import axios from "axios";
import { baseUrl } from "../utils/Constant";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { TabPane } = Tabs;
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const updateBasicInfo = async (values) => {
    setSubmitting(true);
    const { firstName, lastName, gender, dateOfBirth, phoneNumber, address } =
      values;

    const newData = {
      firstName,
      lastName,
      fullName: firstName + " " + lastName,
      gender,
      phoneNumber,
      address: { address },
      dateOfBirth: dateOfBirth,
    };

    // console.log(newData);
    await axiosSecure
      .patch(`/updateProfile/${currentUser?.email}`, newData)
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

  const changeProfileHandler = (e) => {
    const originFileObj = e.fileList[0].originFileObj;
    const imageUrl = URL.createObjectURL(originFileObj);
    setNewImage(imageUrl);
    setPhotoUrl(originFileObj);
  };

  const updateProfilePicture = async () => {
    try {
      setImageUploading(true);
      const formdata = new FormData();
      if (photoUrl) {
        formdata.append("image", photoUrl);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=e6a3a8192dcd75c54fb73248c0ccde0f`,
          formdata
        );

        if (response?.data?.status === 200) {
          const url = response.data.data.display_url;
          const res = await axios.patch(
            `${baseUrl}/users/change-profile-pic/${currentUser.email}`,
            { url: url }
          );
          if (res.status === 200) {
            toast.success("Profile picture updated successfully");
            setPhotoUrl();
            setImageUploading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile picture");
      setImageUploading(false);
    }
  };

  return (
    <div className="py-40 p-5 ">
      <Container
        extraStyle={
          "flex justify-center flex-col md:flex-row md:items-start gap-8 "
        }
      >
        {/* profile image card */}
        <div className="bg-primary/5 flex flex-col items-center p-10 rounded-lg">
          <h1 className="lg:text-3xl md:text-2xl font-bold">
            {currentUser?.fullName}
          </h1>
          <h1>{currentUser?.email}</h1>
          <img
            src={newImage ? newImage : currentUser?.photoURL || avatar}
            alt=""
            className="my-10 rounded-full border border-primary w-60 h-60  object-cover"
          />
          <h3 className="text-base font-medium text-gray-500">
            Profile Completed
          </h3>
          <Progress percent={10} className="w-52 mx-auto" />

          <div className="flex gap-2">
            <Upload
              accept=".jpg, .png, .jpeg"
              maxCount={1}
              listType="picture"
              showUploadList={false}
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
            {newImage && photoUrl && (
              <Button
                size="large"
                loading={imageUploading}
                icon={<MdSave className="text-secondary" />}
                className="text-gradient w-full"
                onClick={updateProfilePicture}
              >
                Save
              </Button>
            )}
          </div>
        </div>
        {/* edit info */}
        <div className="flex-1 bg-primary/5 text-center p-5 md:p-10 rounded-lg">
          <h1 className="text-3xl font-bold text-start">Edit Profile</h1>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Basic Info" key="1">
              <Form onFinish={updateBasicInfo} layout="vertical">
                <div className="grid lg:grid-cols-2 gap-x-5">
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    initialValue={currentUser?.firstName}
                    className="mt-2 text-base font-medium"
                  >
                    <Input className="text-gray-500  py-2 px-3" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    initialValue={currentUser?.lastName}
                    className=" mt-2 text-base font-medium"
                  >
                    <Input className="text-gray-500  py-2 px-3" />
                  </Form.Item>
                  <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[{ validator: validateDateOfBirth }]}
                    className=" mt-2 text-base font-medium"
                    initialValue={moment(currentUser?.dateOfBirth)}
                  >
                    <DatePicker
                      className="text-gray-500 w-full  py-2"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    className="mt-2 text-base font-medium"
                    initialValue={currentUser?.gender}
                  >
                    <Select size="large" className="rounded-lg text-start">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="others">Others</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    className="mt-2 text-base font-medium"
                    initialValue={currentUser?.phoneNumber}
                    rules={[
                      {
                        min: 10,
                        message: "Phone Number must be at least 10 digits",
                      },
                    ]}
                  >
                    <Input type="number" className="text-gray-500  py-2 px-3" />
                  </Form.Item>
                  <div className="col-span-2">
                    <Form.Item
                      initialValue={currentUser?.address.address}
                      name="address"
                      label="Address"
                      className=" mt-2 text-base font-medium"
                    >
                      <Input.TextArea className="text-gray-500  px-3" />
                    </Form.Item>
                  </div>
                </div>
                <Button
                  htmlType="submit"
                  loading={submitting}
                  className="bg-gradient text-white h-10 rounded px-6 mr-auto block"
                >
                  Update
                </Button>
              </Form>
            </TabPane>
            {currentUser?.role === "athlete" && (
              <TabPane tab="Performance" key="2">
                <Form layout="vertical">
                  <div className="grid lg:grid-cols-2 gap-x-5">
                    <Form.Item
                      name="sports"
                      label="Sports"
                      className="mt-2 text-base font-medium"
                    >
                      <Input
                        readOnly
                        className="text-gray-500  py-2 px-3"
                        placeholder="The sports you are involved"
                      />
                    </Form.Item>
                    <Form.Item
                      name="position"
                      label="Position"
                      className=" mt-2 text-base font-medium"
                    >
                      <Input
                        readOnly
                        className="text-gray-500  py-2 px-3"
                        placeholder="The position you play"
                      />
                    </Form.Item>
                    <Form.Item
                      name="speed"
                      label="Speed"
                      className=" mt-2 text-base font-medium"
                    >
                      <Input
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
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
                        readOnly
                        className="text-gray-500  py-2 px-3"
                        type="number"
                        placeholder="Total points scored in a game or season"
                      />
                    </Form.Item>
                  </div>
                </Form>
              </TabPane>
            )}
            {currentUser?.role === "athlete" && (
              <TabPane tab="Medical Info" key="3">
                <Form layout="vertical">
                  <div className="grid lg:grid-cols-2 gap-x-5">
                    <Form.Item
                      name="allergies"
                      label="Allergies"
                      className=" mt-2 text-base font-medium"
                    >
                      <Input className="text-gray-500  py-2 px-3" />
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
                                  className="text-gray-500  py-2 px-3"
                                  placeholder="The injury type"
                                />
                              </Form.Item>
                              <Form.Item
                                name={[name, "date"]}
                                label="Date"
                                className=" mt-2 text-base font-medium"
                              >
                                <DatePicker
                                  className="text-gray-500 w-full  py-2 px-3"
                                  format="YYYY-MM-DD"
                                />
                              </Form.Item>
                              <Form.Item
                                name={[name, "treatment"]}
                                label="Treatment"
                                className=" mt-2 text-base font-medium"
                              >
                                <Input
                                  className="text-gray-500  py-2 px-3"
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
                                  className="text-gray-500  h-10 text-start"
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
                                <Input.TextArea className="text-gray-500  py-2 px-3" />
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
                  </div>
                </Form>
              </TabPane>
            )}
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default UserProfile;
