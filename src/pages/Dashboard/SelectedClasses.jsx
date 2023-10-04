import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Container } from "../../components/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { useAuth } from "../../contexts/AuthContext";
import { Modal, Text } from "@nextui-org/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BsCreditCard, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { CheckOutForm } from "./CheckOutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPES_PK}`);

export const SelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { currentUser } = useAuth();
  const [visible, setVisible] = useState(false);
  const [payFor, setPayFor] = useState();

  const paymentHandler = (bookedClass) => {
    setPayFor(bookedClass);
    setVisible(true);
  };

  const closeModal = () => {
    setPayFor();
    setVisible(false);
  };

  const {
    isLoading,
    refetch,
    data: bookedClasses,
  } = useQuery({
    queryKey: ["bookedClasses", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/bookedClasses/${
          currentUser.email
        }`
      );
      return data;
    },
  });

  const deleteClassHandler = (bookedClassId) => {
    axiosSecure
      .delete(
        `${import.meta.env.VITE_BASE_API_URL}/bookedClasses/${bookedClassId}`
      )
      .then((response) => {
        if (response.status === 200) {
          refetch();
          Swal.fire("Great", "Class has been deleted!", "success");
        }
      });
  };

  return (
    <div className="dark:bg-slate-900 min-h-[90vh] dark:text-white p-10 text-slate-800">
      {!isLoading ? (
        <Container>
          <SectionHeader title={"Selected Classes"} />
          {bookedClasses.length > 0 ? (
            <table className="w-full bg-transparent border-collapse my-10 text-center">
              <thead className="text-center dark:bg-gray-200 bg-slate-800 dark:text-slate-800 text-white">
                <tr className="border-b dark:border-gray-700">
                  <th className="py-2">Image</th>
                  <th>Class Name</th>
                  <th>Instructor Name</th>
                  <th>Available Seats</th>
                  <th>Total Seats</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookedClasses.map((bookedClass) => {
                  const {
                    name,
                    instructorName,
                    totalSeats,
                    availableSeats,
                    price,
                    image,
                  } = bookedClass.classInfo[0];
                  return (
                    <tr
                      key={bookedClass._id}
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
                      <td>{instructorName}</td>
                      <td>{availableSeats}</td>
                      <td>{totalSeats}</td>
                      <td>{price}</td>
                      <td>
                        <div className="flex space-x-4 justify-center">
                          <button
                            onClick={() => paymentHandler(bookedClass)}
                            className="dark:text-green-300 text-green-600 hover:text-green-700 dark:hover:text-green-400 hover:scale-105 transition-all duration-150"
                          >
                            <BsCreditCard className="inline-block w-5 h-5" />
                            <span className="ml-1">Pay Now</span>
                          </button>
                          <button
                            onClick={() => deleteClassHandler(bookedClass._id)}
                            className="text-red-400 hover:text-red-500 hover:scale-105 transition-all duration-150"
                          >
                            <BsTrash className="inline-block w-5 h-5" />
                            <span className="ml-1">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1 className="border p-5 mt-20 border-primary text-xl text-center">
              No class selected yet.
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
        width="600px"
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Payment for
            <Text b size={18}>
              {" " + payFor?.classInfo[0].name}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckOutForm
              closeModal={closeModal}
              payFor={payFor}
              refetch={refetch}
            />
          </Elements>
        </Modal.Body>
      </Modal>
    </div>
  );
};
