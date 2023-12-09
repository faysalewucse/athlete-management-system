import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Form, Select } from "antd";
import CustomLoader from "../../components/CustomLoader";

const MedicalInformation = ({ userId }) => {
  const [userDetails, setUserDetails] = useState();
  const [userMedicalInfo, setUserMedicalInfo] = useState();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();

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

  const updateMedicalInfo = async (values) => {
    setSubmitting(true);

    await axiosSecure
      .put(`/medicalInfo`, { userEmail: userDetails?.email, ...values })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Medical Information Updated Successfully");
          form.resetFields();
          setSubmitting(false);
        }
      })
      .catch(() => {
        toast.error("Error updating");
        setSubmitting(false);
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
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-[30vh]">
      <CustomLoader />
    </div>
  ) : (
    <Form onFinish={updateMedicalInfo} layout="vertical">
      <div className="grid lg:grid-cols-2 gap-x-5">
        <Form>
          <Form.Item
            name={[name, "injuryType"]}
            label="Recovery Status"
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
        </Form>
      </div>
      {currentUser?.role === "coach" && (
        <Button
          htmlType="submit"
          loading={submitting}
          className="bg-gradient text-white h-10 rounded px-6 mr-auto block"
        >
          Update
        </Button>
      )}
    </Form>
  );
};

export default MedicalInformation;
