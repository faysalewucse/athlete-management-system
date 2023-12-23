import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import CustomLoader from "../../components/CustomLoader";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";

const MedicalInformation = ({ userId }) => {
  const [userDetails, setUserDetails] = useState();
  const [userMedicalInfo, setUserMedicalInfo] = useState();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checkedAllergies, setCheckedAllergies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const allergies = [
    "Peanuts",
    "Pollen",
    "Dairy",
    "Shellfish",
    "Gluten",
    "Soy",
    "Eggs",
    "Tree Nuts",
    "Fish",
    "Wheat",
    "Latex",
    "Insect Stings",
    "Dust Mites",
    "Mold",
    "Sesame Seeds",
  ];

  const injuryTypes = [
    "Sprained Ankle",
    "Concussion",
    "Fractured Bone",
    "Muscle Strain",
    "Dislocated Joint",
    "Torn Ligament",
    "Bruising",
    "Cuts and Lacerations",
    "Whiplash",
    "Burns",
    "Tendonitis",
    "Rotator Cuff Injury",
    "Herniated Disc",
    "Stress Fracture",
    "Tennis Elbow (Lateral Epicondylitis)",
    "Golfer's Elbow (Medial Epicondylitis)",
    "Bursitis",
    "Meniscus Tear",
    "Shin Splints",
    "Plantar Fasciitis",
    "IT Band Syndrome",
    "Carpal Tunnel Syndrome",
  ];

  const addPastInjuries = async (values) => {
    setSubmitting(true);

    let pastInjuries = [];
    if (userMedicalInfo?.pastInjuries?.length > 0) {
      pastInjuries = [...userMedicalInfo?.pastInjuries, { ...values }];
    } else {
      pastInjuries = [{ ...values }];
    }

    await axiosSecure
      .put(`/medicalInfo/pastInjuries/${currentUser.email}`, pastInjuries)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Past Injuries Added Successfully");
          setSubmitting(false);
          setModalOpen(false);
        }
      })
      .catch(() => {
        toast.error("Error Adding");
        setSubmitting(false);
      });
  };

  const onChange = (checkedValues) => {
    setCheckedAllergies(checkedValues);
  };

  const updateAllergies = async () => {
    setSaving(true);

    await axiosSecure
      .put(`/medicalInfo/allergies/${userDetails.email}`, checkedAllergies)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Allergies updated successfully");
          setSaving(false);
        }
      })
      .catch(() => {
        toast.error("Error updating");
        setSaving(false);
      });
  };

  const getUserDetails = async () => {
    setLoading(true);
    const { data: user } = await axiosSecure.get(`/user/byId/${userId}`);

    const { data: medicalInfo } = await axiosSecure.get(
      `/medicalInfo/${user.email}`
    );

    setUserDetails(user);
    setUserMedicalInfo(medicalInfo);
    setLoading(false);
  };

  useEffect(() => {
    getUserDetails();
  }, [submitting]);

  console.log(userMedicalInfo);

  const items = [
    {
      key: "1",
      label: "Allergies",
      children: (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentUser.role === "coach" ? (
              <div className="flex gap-2">
                {userMedicalInfo?.allergies?.map((allergy, index) => (
                  <p>
                    {index + 1}. {allergy}
                  </p>
                ))}
              </div>
            ) : (
              <div>
                <Checkbox.Group
                  className="grid grid-cols-2"
                  options={allergies}
                  defaultValue={userMedicalInfo?.allergies}
                  onChange={onChange}
                />
                <Button
                  size="middle"
                  onClick={updateAllergies}
                  loading={saving}
                  className="mt-5 bg-gradient text-white rounded px-6"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Past Injuries",
      children: (
        <div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 grid-cols-2">
            {userMedicalInfo?.pastInjuries?.map((injury, index) => (
              <div
                className="hover:bg-indigo-500 transition-300 cursor-pointer hover:text-white p-2 rounded-md border-2 text-start border-indigo-500"
                key={index}
              >
                <p>Type: {injury.type}</p>
                <p>
                  Date: {format(parseISO(injury.date), "MM-dd-yyyy hh:MM a")}
                </p>
                <p>Treatment: {injury.treatment}</p>
                <p>Recovery Status: {injury.recoveryStatus}</p>
                <p>Rehabilitation: {injury.rehabilitation}</p>
              </div>
            ))}
          </div>
          {currentUser.role === "athlete" && (
            <div>
              <Button
                className="bg-gradient text-white mt-10"
                onClick={() => setModalOpen(true)}
              >
                Add Past Injury
              </Button>
              <Modal
                onCancel={() => setModalOpen(false)}
                footer={null}
                open={modalOpen}
              >
                <Form onFinish={addPastInjuries} layout="vertical">
                  <Form.Item
                    name="type"
                    label="Injury Type"
                    className="mt-2 text-base font-medium"
                  >
                    <Select
                      placeholder="Select Injury Type"
                      className="text-gray-500 h-10 text-start"
                    >
                      {injuryTypes.map((injury, index) => (
                        <Select.Option key={index} value={injury}>
                          {injury}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="date"
                    label="Date"
                    className=" mt-2 text-base font-medium"
                  >
                    <DatePicker
                      className="text-gray-500 w-full  py-2 px-3"
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                  <Form.Item
                    name="treatment"
                    label="Treatment"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input
                      className="text-gray-500  py-2 px-3"
                      placeholder="How the injury was treated"
                    />
                  </Form.Item>
                  <Form.Item
                    name="recoveryStatus"
                    label="Recovery Status"
                    className=" mt-2 text-base font-medium"
                  >
                    <Select
                      placeholder="Recovery Status"
                      className="text-gray-500  h-10 text-start"
                    >
                      <Option value="fully recovered">Fully Recovered</Option>
                      <Option value="ongoing recovery">Ongoing Recovery</Option>
                      <Option value="not recovered">Not Recovered</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="rehabilitation"
                    label="Rehabilitation Notes"
                    className=" mt-2 text-base font-medium"
                  >
                    <Input.TextArea className="text-gray-500  py-2 px-3" />
                  </Form.Item>
                  {currentUser?.role === "athlete" && (
                    <Button
                      htmlType="submit"
                      loading={submitting}
                      className="bg-gradient text-white h-10 rounded px-6 mr-auto block"
                    >
                      Add
                    </Button>
                  )}
                </Form>
              </Modal>
            </div>
          )}
        </div>
      ),
    },
  ];

  return loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <CustomLoader />
    </div>
  ) : (
    <div className="text-start">
      <Collapse defaultActiveKey={2} accordion items={items} />
    </div>
  );
};

export default MedicalInformation;
