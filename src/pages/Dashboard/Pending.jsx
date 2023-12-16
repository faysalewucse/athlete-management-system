import pending from "../../assets/pending.png";

const Pending = ({ role }) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div>
        <img className="w-96 mx-auto" src={pending} alt="pending" />
        <p className="w-2/3 mx-auto mt-5 text-center font-semibold text-lg text-gradient">
          Your request to access this organization is pending. Acceptance will
          be assigned by the
          <span className="font-bold">
            {role === "admin"
              ? " Super Admin"
              : role === "coach" || role === "sub_coach"
              ? " Admin"
              : " Coach"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Pending;
