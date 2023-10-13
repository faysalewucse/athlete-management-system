import { Modal, Form, Input, Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AlertNotificationModal = ({ modalOpen, setIsModalOpen, refetch }) => {
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [axiosSecure] = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);

  const onCancel = () => {
    setIsModalOpen(false);
    setSubmitting(false);
  };

  const onCreate = async (values) => {
    const notificationData = {
      ...values,
      createdAt: new Date(Date.now()).toISOString(),
      adminEmail: currentUser?.email,
    };

    setSubmitting(true);
    await axiosSecure
      .post(
        `${import.meta.env.VITE_BASE_API_URL}/notification`,
        notificationData
      )
      .then((res) => {
        if (res.status === 200) {
          setSubmitting(false);
          form.resetFields();
          setIsModalOpen(false);
          toast.success("Notification created");
          refetch();
        }
      });
  };

  return (
    <Modal
      title="Alert"
      open={modalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="btn"
          loading={submitting}
          className="bg-gradient text-white"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          {submitting ? "Please Wait..." : "Create"}
        </Button>,
      ]} // No default OK/Cancel buttons
    >
      <Form layout="vertical" form={form} name="notificationCreation">
        <Form.Item
          name="message"
          label="Notification"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input.TextArea placeholder="Enter message here" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AlertNotificationModal;
