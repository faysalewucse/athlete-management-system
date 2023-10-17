import avatar from "/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import CustomLoader from "../../components/CustomLoader";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useForm } from "antd/es/form/Form";

const Chatting = () => {
  const [form] = useForm();

  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState(
    currentUser?.role === "admin" ? "coach" : "admin"
  );
  const [selectedChat, setSelectedChat] = useState(
    currentUser?.role === "coach" && { email: currentUser?.adminEmail }
  );

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      let URL = "/users";
      if (currentUser?.role === "admin")
        URL = `/users/coach-athlete-parents/${currentUser?.email}`;
      else if (currentUser?.role === "coach")
        URL = `/users/athlete-parents/${currentUser?.adminEmail}`;
      else if (currentUser?.role === "parents")
        URL = `/users/athlete/${currentUser?.email}`;

      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}${URL}`
      );
      return data;
    },
  });

  const {
    isMessageLoading,
    data: chatHistory = [],
    refetch: refetchChats,
  } = useQuery({
    queryKey: ["chatting", currentUser?.email + selectedRole],
    queryFn: async () => {
      if (selectedChat?.email) {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_BASE_API_URL}/message?to=${
            selectedChat?.email
          }&from=${currentUser?.email}`
        );
        return data;
      } else return [];
    },
  });

  const onFinish = async (values) => {
    try {
      await axiosSecure.post(`${import.meta.env.VITE_BASE_API_URL}/message`, {
        to: selectedChat.email,
        from: currentUser?.email,
        message: values.message,
        createdAt: Date.now(),
      });

      refetchChats();
      form.resetFields(["message"]);
    } catch (error) {
      toast.error("Message sent failed");
    }
  };

  useEffect(() => {
    refetchChats();
  }, [selectedChat, refetchChats]);

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      {!isLoading ? (
        <Container>
          <div className="flex gap-3 mb-5">
            {currentUser?.role === "coach" ? (
              <UserType
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                role={"Admin"}
                setSelectedChat={setSelectedChat}
                refetchChats={refetchChats}
              />
            ) : (
              <UserType
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                role={"Coach"}
                setSelectedChat={setSelectedChat}
                refetchChats={refetchChats}
              />
            )}
            <UserType
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              role={"Athlete"}
              setSelectedChat={setSelectedChat}
              refetchChats={refetchChats}
            />
            <UserType
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              role={"Parents"}
              setSelectedChat={setSelectedChat}
              refetchChats={refetchChats}
            />
          </div>
          <div className="flex relative max-h-[70vh] bg-white rounded-lg p-2">
            <div className=" border-r-2 rounded-lg border-secondary/5 w-1/3 pr-2">
              {users
                .filter(
                  (user) =>
                    user.status === "approved" && user?.role === selectedRole
                )
                .map((user) => (
                  <div
                    onClick={() => {
                      setSelectedChat(user);
                    }}
                    key={user?._id}
                    className={`rounded-lg cursor-pointer flex p-3 items-center gap-2 ${
                      selectedChat?._id === user?._id
                        ? "bg-dark text-white"
                        : "bg-white text-dark"
                    } hover:bg-dark hover:text-white transition-300`}
                  >
                    <img
                      src={user.photoURL ? user.photoURL : avatar}
                      alt="avatar"
                      className="w-5"
                    />
                    <p className="text-sm">{user.name}</p>
                  </div>
                ))}
            </div>
            <div className="relative flex-1 bg-white overflow-y-scroll">
              {selectedChat ? (
                <div>
                  {chatHistory.map((chat) => (
                    <p
                      key={chat._id}
                      className={`mb-2 w-fit py-1 px-2 rounded-xl bg-dark text-white ${
                        chat.from === currentUser?.email
                          ? "ml-auto"
                          : "mr-auto ml-2"
                      }`}
                    >
                      {chat.message}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-full">
                  <div className="flex items-center  gap-2  p-2 rounded border border-dark">
                    <GiClick /> Select a User
                  </div>
                </div>
              )}
              {selectedChat?.email && (
                <div className="w-full sticky bottom-0 right-0 bg-white pt-2 px-2 gap-2">
                  <Form
                    form={form}
                    className="flex gap-2"
                    name="myForm"
                    onFinish={onFinish}
                    layout="horizontal"
                  >
                    <Form.Item
                      className="flex-1"
                      name="message"
                      rules={[{ required: true }]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        size="large"
                        type="btn"
                        className="bg-gradient text-white"
                        htmlType="submit"
                      >
                        Send
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading || isMessageLoading} />
        </div>
      )}
    </div>
  );
};

export default Chatting;

const UserType = ({ role, selectedRole, setSelectedRole, setSelectedChat }) => {
  const clickHandler = async () => {
    setSelectedRole(role.toLowerCase());
    setSelectedChat();
  };

  return (
    <p
      onClick={clickHandler}
      className={`${
        selectedRole === role.toLowerCase()
          ? "bg-dark text-white"
          : "border border-dark text-dark"
      } px-4  py-2 rounded-lg cursor-pointer`}
    >
      {role}
    </p>
  );
};
