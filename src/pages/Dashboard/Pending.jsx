import pending from "../../assets/pending.png";

const Pending = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div>
        <img className="w-1/2 mx-auto" src={pending} alt="pending" />
        <p className="w-3/4 mx-auto mt-5 text-center font-semibold text-xl text-gradient">
          Your Request for coach is pending. Wait for Accept your request by the
          Admin
        </p>
      </div>
    </div>
  );
};

export default Pending;
