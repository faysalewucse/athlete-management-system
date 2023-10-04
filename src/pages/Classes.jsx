import { useLoaderData } from "react-router-dom";
import { Container } from "../components/Container";
import { SectionHeader } from "../components/shared/SectionHeader";
import { ClassCard } from "../components/cards/ClassCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { Modal, Text } from "@nextui-org/react";
import ReactPlayer from "react-player";

export const Classes = () => {
  const { data: classes } = useLoaderData();
  const { currentUser } = useAuth();
  const [visible, setVisible] = useState(false);
  const [classInfo, setClassInfo] = useState();

  const openModal = (classData) => {
    setClassInfo(classData);
    setVisible(true);
  };

  const closeModal = () => {
    setClassInfo();
    setVisible(false);
  };

  const {
    isLoading,
    refetch,
    data: bookedClasses,
  } = useQuery({
    queryKey: ["bookedClasses"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/bookedClasses/${
          currentUser.email
        }`
      );

      return data;
    },
  });

  return (
    <div className="dark:bg-slate-900 dark:text-white text-slate-800 p-5 md:p-20">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Our Classes"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 md:mt-20">
            {classes.map((classInfo) => (
              <ClassCard
                key={classInfo._id}
                classInfo={classInfo}
                bookedClasses={bookedClasses}
                refetch={refetch}
                openModal={openModal}
              />
            ))}
          </div>
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <HashLoader
            color={"#FF3607"}
            loading={isLoading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <Modal
        width="600px"
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModal}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            Intro Video
          </Text>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer
            width="100%"
            style={{ marginBottom: "30px" }}
            controls
            url="https://youtu.be/H71OH6wGVVs"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
