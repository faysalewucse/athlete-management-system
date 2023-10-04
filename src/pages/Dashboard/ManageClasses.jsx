import { useQuery } from "@tanstack/react-query";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { AiOutlineFileDone } from "react-icons/ai";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdOutlineFeedback } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, Button, Text } from "@nextui-org/react";

export const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [visible, setVisible] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [classId, setClassId] = useState("");
  const handler = (id) => {
    setClassId(id);
    setVisible(true);
  };
  const closeHandler = () => {
    setFeedbackMsg("");
    setClassId("");
    setVisible(false);
  };

  const {
    isLoading,
    data: allClasses = [],
    refetch,
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/allClasses`
      );
      return data;
    },
  });

  // handle class status
  const handleClassStatus = (classInfo, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${
        status === "approved" ? "Approve" : "Deny"
      } this class.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${status === "approved" ? "Approve" : "Deny"}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/changeClassStatus/${classInfo._id}?status=${status}`)
          .then((response) => {
            if (response.status === 200) {
              refetch().then(() => {
                Swal.fire(
                  `${status === "approved" ? "Approved!" : "Denied!"}`,
                  "Class status has been Changed",
                  "success"
                );
              });
            }
          });
      }
    });
  };

  const handleClassFeedback = () => {
    axiosSecure
      .patch(`/feedback/${classId}?message=${feedbackMsg}`)
      .then((response) => {
        if (response.status === 200) {
          closeHandler();
          Swal.fire(`Done!`, "Feedback sent successfully!", "success");
        }
      });
  };
  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"My Classes"} />
          {allClasses?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-transparent border-collapse my-10 text-center">
                <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-2">Image</th>
                    <th>Class Name</th>
                    <th>Instructor</th>
                    <th>Available Seats</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allClasses.map((classInfo) => {
                    const {
                      name,
                      status,
                      instructorName,
                      instructorEmail,
                      availableSeats,
                      price,
                      image,
                    } = classInfo;
                    return (
                      <tr
                        key={classInfo._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="py-4">
                          <img
                            src={image}
                            alt="Class"
                            className="w-12 h-12 mx-auto rounded-full"
                          />
                        </td>
                        <td>{name}</td>
                        <td className="flex flex-col py-4">
                          <span className="text-xl font-bold">
                            {instructorName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {instructorEmail}
                          </span>
                        </td>
                        <td>{availableSeats}</td>
                        <td>{price}</td>
                        <td>
                          <span
                            className={`${
                              status === "pending"
                                ? "bg-orange-100 text-orange-600"
                                : status === "approved"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            } font-semibold py-1 px-3 text-xs rounded-full`}
                          >
                            {status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="flex space-x-4 justify-center">
                            <button
                              disabled={
                                status === "approved" || status === "denied"
                              }
                              onClick={() =>
                                handleClassStatus(classInfo, "approved")
                              }
                              className={`dark:text-green-300 text-green-600 hover:text-green-700 dark:hover:text-green-400 hover:scale-105 transition-all duration-150 ${
                                (status === "approved" ||
                                  status === "denied") &&
                                "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <AiOutlineFileDone className="inline-block w-5 h-5" />
                              <span className="ml-1">Approve</span>
                            </button>
                            <button
                              disabled={
                                status === "approved" || status === "denied"
                              }
                              onClick={() =>
                                handleClassStatus(classInfo, "denied")
                              }
                              className={`dark:text-red-300 text-red-600 hover:text-red-700 dark:hover:text-red-400 hover:scale-105 transition-all duration-150 ${
                                (status === "approved" ||
                                  status === "denied") &&
                                "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <GiCancel className="inline-block w-5 h-5" />
                              <span className="ml-1">Deny</span>
                            </button>
                            <button
                              onClick={() => handler(classInfo._id)}
                              className={`dark:text-sky-300 text-sky-600 hover:text-sky-700 dark:hover:text-sky-400 hover:scale-105 transition-all duration-150`}
                            >
                              <MdOutlineFeedback className="inline-block w-5 h-5" />
                              <span className="ml-1">Feedback</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="border p-5 mt-20 border-primary text-xl text-center">
              No class Added Yet
            </h1>
          )}
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
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Status Feedback
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="feedbackMsg">Write Your Feedback Message</label>
          <textarea
            name="feedbackMsg"
            id="feedbackMsg"
            placeholder="Write here..."
            onChange={(e) => setFeedbackMsg(e.target.value)}
            className="bg-gray-100 rounded-xl focus:outline-none p-2"
            cols="30"
            rows="5"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-red-100 hover:bg-red-200"
            auto
            color={"error"}
            flat
            onPress={closeHandler}
          >
            Close
          </Button>
          <Button
            className="bg-sky-100 hover:bg-sky-200"
            auto
            color={"primary"}
            flat
            onPress={handleClassFeedback}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
