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
import { io } from "socket.io-client";
import { BiChat } from "react-icons/bi";

const Chatting = () => {
  const socket = io.connect("http://localhost:5000");

  useEffect(() => {
    socket.on("chatMessage", (data) => {
      console.log(data);
      refetchChats();
    });

    // Remove event listener on component unmount
    return () => socket.off("chatMessage");
  }, [socket]);

  const [form] = useForm();

  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState(
    currentUser?.role === "admin" ? "coach" : "admin"
  );
  const [selectedChat, setSelectedChat] = useState(
    (currentUser?.role === "coach" || currentUser?.role === "sub_coach") && {
      email: currentUser?.adminEmail,
    }
  );
  // const [chatOpen, setChatOpen] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      let URL = `/users/chat/${currentUser.email}`;

      if (currentUser?.role !== "admin") {
        URL = `/users/chat/${currentUser?.adminEmail}`;
      }

      const { data } = await axiosSecure.get(`${URL}`);
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
          `/message?to=${selectedChat?.email}&from=${currentUser?.email}`
        );
        return data;
      } else return [];
    },
  });

  const onFinish = async (values) => {
    try {
      const messageData = {
        to: selectedChat.email,
        from: currentUser?.email,
        message: values.message,
        createdAt: Date.now(),
      };

      await axiosSecure.post(`/message`, messageData);

      if (socket) {
        socket.emit("chatMessage", values.message);
        refetchChats();
      }

      form.resetFields(["message"]);
    } catch (error) {
      toast.error("Message sent failed");
    }
  };

  useEffect(() => {
    console.log("YEs");
    refetchChats();
  }, [selectedChat, refetchChats]);

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-[90vh] bg-transparent p-2 md:p-10 mt-10 text-dark">
      {!isLoading ? (
        <Container>
          <div className="flex gap-3 mb-5">
            <UserType
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              role={"Admin"}
              setSelectedChat={setSelectedChat}
              refetchChats={refetchChats}
            />

            <UserType
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              role={"Coach"}
              setSelectedChat={setSelectedChat}
              refetchChats={refetchChats}
            />

            <UserType
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              role={"Assistant Coach"}
              setSelectedChat={setSelectedChat}
              refetchChats={refetchChats}
            />

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
          <div className="flex relative h-[70vh] bg-white rounded-lg p-2">
            <BiChat
              onClick={() => setChatOpen(true)}
              className="md:hidden block absolute left-2 top-2 z-50 bg-gradient text-white p-3 text-5xl rounded-full"
            />
            <div
              className={`md:block md:relative absolute left-0 top-0 z-50 h-full w-3/4 ${
                !chatOpen && "hidden"
              } bg-secondary md:bg-primary/10 p-2 border-r-2 rounded-lg border-secondary/5 md:w-1/3`}
            >
              {users
                .filter(
                  (user) =>
                    user.status === "approved" &&
                    user?.role ===
                      (selectedRole === "assistant coach"
                        ? "sub_coach"
                        : selectedRole) &&
                    user.email !== currentUser.email
                )
                .map((user) => (
                  <div
                    onClick={() => {
                      setChatOpen(false);
                      setSelectedChat(user);
                    }}
                    key={user?._id}
                    className={`rounded-lg cursor-pointer flex p-3 items-center gap-2 ${
                      selectedChat?._id === user?._id
                        ? "bg-dark text-white"
                        : "bg-white text-dark"
                    } hover:bg-dark hover:text-white transition-300 mb-2`}
                  >
                    <img
                      src={user.photoURL ? user.photoURL : avatar}
                      alt="avatar"
                      className="w-7 rounded-full h-7"
                    />
                    <p className="text-sm">{user.fullName}</p>
                  </div>
                ))}
            </div>
            <div
              onClick={() => setChatOpen(false)}
              className={`relative flex-1 bg-white overflow-y-scroll ${
                chatOpen && "blur"
              }`}
            >
              {selectedChat?.email && (
                <div className="w-full absolute bottom-0 right-0 px-2 gap-2">
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
              <div>
                {!isMessageLoading ? (
                  <div>
                    {selectedChat ? (
                      <div>
                        {chatHistory.length > 0 ? (
                          <div>
                            {" "}
                            {chatHistory.map((chat) => (
                              <p
                                key={chat._id}
                                className={`mb-2 w-fit py-1 px-2 rounded-xl bg-dark text-white ${
                                  chat.from === currentUser?.email
                                    ? "ml-auto mr-2"
                                    : "mr-auto ml-2"
                                }`}
                              >
                                {chat.message}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center min-h-full">
                            <div className="flex items-center  gap-2  p-2 rounded border-b border-dark">
                              No Message Yet
                            </div>
                          </div>
                        )}
                        {/* <div
                className="absolute top-0"
                onClick={() => setChatOpen(!chatOpen)}
              >
                {chatOpen ? <AiOutlineClose /> : <FaBarsStaggered />}
              </div> */}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center min-h-full">
                        <div className="flex items-center  gap-2  p-2 rounded border border-dark">
                          <GiClick /> Select a User
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <CustomLoader />
                )}
              </div>
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
      } px-4  py-1 rounded-lg cursor-pointer`}
    >
      {role}
    </p>
  );
};
