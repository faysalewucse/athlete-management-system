import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Container } from "../components/Container";
import { InstructorCard } from "../components/cards/InstructorCard";
import { SectionHeader } from "../components/shared/SectionHeader";
import { Modal, Text } from "@nextui-org/react";
import { motion } from "framer-motion";

export const Instructors = () => {
  const { data: instructors } = useLoaderData();

  const [visible, setVisible] = useState(false);
  const [classInfo, setClassInfo] = useState();

  const openModal = (instructor) => {
    setClassInfo(instructor.classInfo);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div className="dark:bg-slate-900 dark:text-white text-slate-800 p-5 md:p-20">
      <Container>
        <SectionHeader
          heading={"Our Expert Instructors"}
          title={"Learn from the Best in Martial Arts"}
          description={
            "Meet our expert martial arts instructors who are committed to helping you excel in your training."
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 md:mt-20">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor._id}
              instructor={instructor}
              openModal={openModal}
            />
          ))}
        </div>
      </Container>
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
            Classes
          </Text>
        </Modal.Header>
        <Modal.Body>
          {classInfo
            ?.filter((item) => item.status === "approved")
            .map(
              (
                { image, availableSeats, instructorName, totalSeats, price },
                index
              ) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, y: "-10vh", x: "-10vw" }}
                  animate={{ scale: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                  className={`md:flex items-center gap-5 border border-primary px-2 border-dashed rounded-2xl ${
                    !availableSeats &&
                    "bg-gradient-to-br border-0 from-red-500 to-red-300"
                  }`}
                >
                  <img
                    className="w-24 h-24 object-top object-cover"
                    src={image}
                    alt="instructor_image"
                  />
                  <div className="text-center md:text-start flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-3xl font-bold">{name}</h1>
                      <h1 className="text-lg font-bold">
                        Instructor: {instructorName}
                      </h1>
                      <h1>Seats Available: {availableSeats}</h1>
                      <h1>Total Seats: {totalSeats}</h1>
                      <h1>Price: {price}$</h1>
                    </div>
                  </div>
                </motion.div>
              )
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
