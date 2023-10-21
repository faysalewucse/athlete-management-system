import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "../components/Container";
import {
  Modal,
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
import { MdFileUpload } from "react-icons/md";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { currentUser, updateUserProfile } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [newDisplayName, setNewDisplayName] = useState(currentUser.displayName);
  const [newPhotoURL, setNewPhotoURL] = useState(currentUser.photoURL);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // const [edit, setEdit] = useState(false);

  const updateAthlete = async (values) => {
    const {
      speed,
      strength,
      accuracy,
      endurance,
      goalsScored,
      assists,
      rebounds,
      goalsSaved,
      pointsScored,
      ...rest
    } = values;

    const newData = {
      ...rest,
      performance: {
        speed,
        strength,
        accuracy,
        endurance,
        goalsScored,
        assists,
        rebounds,
        goalsSaved,
        pointsScored,
      },
    };

    console.log(newData);
    setSubmitting(true);
    await axiosSecure
      .patch(`${import.meta.env.VITE_BASE_API_URL}/user`, newData)
      .then((res) => {
        if (res.status === 200) {
          form.resetFields();
          setSubmitting(false);
          toast.success("Profile Updated Successfully");
        }
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    await updateUserProfile(newDisplayName, newPhotoURL);
    setIsModalVisible(false);
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

  return (
    <div>
      {currentUser?.role !== "athlete" ? (
        <div className="flex items-center justify-center text-center md:p-20 p-5 min-h-[90vh]">
          <Container>
            <div>
              <img
                src={currentUser?.photoURL || avatar}
                alt="profile_photo"
                className="rounded-full mx-auto w-96"
              />
              <h1 className="font-bold text-secondary2 text-4xl mt-5">
                {currentUser?.name}
              </h1>
              <h6 className="text-gray-400">{currentUser.email}</h6>
              <button
                onClick={showModal}
                className="mt-10 bg-red-100 font-semibold text-primary py-2 px-6 rounded border-none hover:bg-red-200 transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          </Container>

          <Modal
            title="Edit Profile"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form>
              <label className="font-bold" htmlFor="displayName">
                Name
              </label>
              <br />
              <Input
                id="displayName"
                type="text"
                className="mb-2"
                defaultValue={currentUser?.name}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <br />
              <Form.Item
                name="photoUrl"
                label="Photo"
                className="col-span-2"
                rules={[{ required: false }]}
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload
                  accept=".jpg, .png, .jpeg"
                  maxCount={1}
                  listType="picture"
                  beforeUpload={() => false}
                >
                  <Button
                    size="large"
                    icon={<MdFileUpload className="text-secondary" />}
                    className="text-gradient"
                  >
                    Update Photo
                  </Button>
                </Upload>
              </Form.Item>
            </form>
          </Modal>
        </div>
      ) : (
        <Form
          onFinish={updateAthlete}
          initialValues={{ name: currentUser?.name }}
          className="relative mx-10 md:mx-20 my-28"
        >
          <div className=" grid grid-cols-1 md:grid-cols-2 ">
            <div className="sticky left-0 w-full bg-white md:bg-transparent z-[1] flex flex-col justify-start items-start">
              <img
                src={currentUser?.photoURL || avatar}
                alt=""
                className="rounded-full w-80"
              />
              <div className="mt-4">
                <h3 className="text-base font-medium text-gray-500">
                  Profile Completed
                </h3>
                <Progress percent={10} className="w-80" />
                {/* <button
                  onClick={() => setEdit(!edit)}
                  className="block  bg-red-100 font-semibold text-primary py-2 px-6 rounded border-none hover:bg-red-200 transition-all duration-200"
                >
                  {edit ? "Cancel" : "Edit Profile"}
                </button> */}
              </div>
            </div>
            <div className="h-screen overflow-y-auto no-scrollbar">
              <div className="flex flex-col  mt-2">
                <h1 className="text-lg font-semibold text-gradient">
                  Basic Info
                </h1>
                <div>
                  <Form.Item name="name" label="Name" className="w-1/2 mt-2">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="dateOfBirth"
                    label="Date of Birth"
                    rules={[{ validator: validateDateOfBirth }]}
                    className="w-1/2"
                    initialValue={moment(currentUser?.dateOfBirth)}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    className="w-1/2"
                    initialValue={currentUser?.gender}
                  >
                    <Select className="rounded-lg">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="others">Others</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    className="w-1/2"
                    initialValue={currentUser?.phoneNumber}
                    rules={[
                      {
                        min: 10,
                        message: "Phone Number must be at least 10 digits",
                      },
                    ]}
                  >
                    <Input type="number" className="rounded-lg" />
                  </Form.Item>
                  <Form.Item
                    initialValue={currentUser?.address}
                    name="address"
                    label="Address"
                    className="w-1/2"
                  >
                    <Input.TextArea className="rounded-lg" />
                  </Form.Item>
                </div>
              </div>

              <hr className="border-t my-5 border-gray-300" />

              <div className=" ">
                <div className="flex flex-col justify-center">
                  <h1 className="text-lg font-semibold text-gradient">
                    Additional Info
                  </h1>
                  <div>
                    <Form.Item
                      name="sports"
                      label="Sports"
                      className="w-1/2 mt-2"
                    >
                      <Input placeholder="The sports you are involved" />
                    </Form.Item>
                    <Form.Item
                      name="position"
                      label="Position"
                      className="w-1/2"
                    >
                      <Input placeholder="The position you play" />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gradient">
                    Performance
                  </h1>
                  <Form.Item name="speed" label="Speed" className="w-1/2 mt-2">
                    <Input type="number" placeholder="Your average speed" />
                  </Form.Item>
                  <Form.Item name="strength" label="Strength" className="w-1/2">
                    <Input
                      type="number"
                      placeholder="Your Strength Measurement based on weight lifting"
                    />
                  </Form.Item>
                  <Form.Item name="accuracy" label="Accuracy" className="w-1/2">
                    <Input
                      type="number"
                      placeholder="accuracy in shooting or passing"
                    />
                  </Form.Item>
                  <Form.Item
                    name="endurance"
                    label="Endurance"
                    className="w-1/2"
                  >
                    <Input
                      type="number"
                      placeholder="Measures of endurance, like distance covered or duration"
                    />
                  </Form.Item>
                  <Form.Item
                    name="goalsScored"
                    label="Goals Scored"
                    className="w-1/2"
                  >
                    <Input
                      type="number"
                      placeholder="The number of goals scored in a sport like soccer"
                    />
                  </Form.Item>
                  <Form.Item name="assists" label="Assists" className="w-1/2">
                    <Input
                      type="number"
                      placeholder="The number of assists provided to teammates"
                    />
                  </Form.Item>
                  <Form.Item name="rebounds" label="Rebounds" className="w-1/2">
                    <Input
                      type="number"
                      placeholder="The number of rebounds in a sport like basketball"
                    />
                  </Form.Item>
                  <Form.Item
                    name="goalsSaved"
                    label="Goals Saved"
                    className="w-1/2"
                  >
                    <Input
                      type="number"
                      placeholder="For sports like hockey or soccer"
                    />
                  </Form.Item>
                  <Form.Item
                    name="pointsScored"
                    label="Points Scored"
                    className="w-1/2"
                  >
                    <Input
                      type="number"
                      placeholder="Total points scored in a game or season"
                    />
                  </Form.Item>
                </div>
              </div>
              <hr className="border-t my-5 border-gray-300" />
              <div className="">
                <h1 className="text-lg font-semibold text-gradient">
                  Medical info
                </h1>
                <Form.Item
                  name="allergies"
                  label="Allergies"
                  className="w-1/2 mt-2"
                >
                  <Input />
                </Form.Item>

                <Form.List name="pastInjuries">
                  {(fields, { add, remove }) => (
                    <div>
                      {fields.map(({ key, name }) => (
                        <div key={key}>
                          <Form.Item
                            name={[name, "type"]}
                            label="Type"
                            className="w-1/2"
                          >
                            <Input placeholder="The injury type" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "date"]}
                            label="Date"
                            className="w-1/2"
                          >
                            <DatePicker format="YYYY-MM-DD" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "treatment"]}
                            label="Treatment"
                            className="w-1/2"
                          >
                            <Input placeholder="How the injury was treated" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "recoveryStatus"]}
                            label="Recovery Status"
                            className="w-1/2"
                          >
                            <Select>
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
                            className="w-1/2"
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Button
                            className="bg-red-500 bg-opacity-50 mb-1"
                            type="dashed"
                            onClick={() => remove(name)}
                          >
                            Remove Past Injury
                          </Button>
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          className="bg-green-500 bg-opacity-50"
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
            </div>
          </div>
          <Button
            loading={submitting}
            className="block mx-auto bg-gradient text-white"
            htmlType="submit"
          >
            Update Profile
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UserProfile;
