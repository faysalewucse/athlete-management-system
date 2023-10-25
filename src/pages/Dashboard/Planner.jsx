import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Pagination } from "antd";
import CreatePlannerModal from "../../components/modals/CreatePlannerModal";
import { useQuery } from "@tanstack/react-query";
import { Container } from "../../components/Container";
import CustomLoader from "../../components/CustomLoader";
import Button from "../../components/shared/Button";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { RxClock } from "react-icons/rx";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";
import UpdatePlannerModal from "../../components/modals/UpdatePlannerModal";

const Planner = () => {
  const { currentUser } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [plan, setPlan] = useState({});

  const {
    isLoading,
    data: plans = [],
    refetch,
  } = useQuery({
    queryKey: ["plan", currentUser?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_BASE_API_URL}/plans/${currentUser?.email}`
      );
      return data;
    },
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;
  const visiblePlans = plans.slice(startIdx, endIdx);

  const handleDeletePlans = async (id) => {
    await axiosSecure
      .delete(`${import.meta.env.VITE_BASE_API_URL}/plans/${id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("Plan deleted successfully");
        }
      });
  };

  const handleUpdatePlan = (plan) => {
    setOpenUpdateModal(true);
    setPlan(plan);
  };

  return (
    <div className="min-h-[90vh] bg-transparent p-10 text-dark">
      {!isLoading ? (
        <Container>
          {currentUser?.role === "coach" && (
            <Button
              style={"rounded-lg mb-5"}
              onClickHandler={() => setIsModalOpen(true)}
              text={"Create Plan +"}
            />
          )}
          <SectionHeader title={"Plans"} quantity={plans.length} />
          <div className="mt-5">
            {plans.length === 0 ? (
              <div className="bg-white p-2 rounded-lg">No Plans Created</div>
            ) : (
              <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-2 gap-5">
                {visiblePlans.map((plan) => (
                  <div
                    className="flex flex-col justify-between bg-white shadow-lg p-4 rounded-lg"
                    key={plan._id}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold">
                          {plan.planName}
                        </h3>
                        {currentUser?.role === "coach" && (
                          <div className="text-lg flex gap-1">
                            <BiEdit
                              onClick={() => handleUpdatePlan(plan)}
                              className="cursor-pointer"
                            />
                            <AiFillDelete
                              onClick={() => handleDeletePlans(plan?._id)}
                              className="cursor-pointer text-danger/90 hover:text-danger2/90"
                            />
                          </div>
                        )}
                      </div>

                      <p className="text-sm">
                        {plan.duration ? plan.duration : "No Duration"}
                      </p>
                    </div>
                    <div>
                      <div className="mt-10 flex items-center gap-2">
                        <RxClock />
                        <p>{format(parseISO(plan.time), "hh:mm a")}</p>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <p>{format(parseISO(plan.date), "dd/MM/yyyy")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Pagination
            className="mt-10 flex justify-end"
            current={currentPage}
            pageSize={itemsPerPage}
            total={plans.length}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

          <CreatePlannerModal
            modalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            refetch={refetch}
          />
          <UpdatePlannerModal
            openUpdateModal={openUpdateModal}
            setOpenUpdateModal={setOpenUpdateModal}
            plan={plan}
            refetch={refetch}
          />
        </Container>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <CustomLoader isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Planner;
