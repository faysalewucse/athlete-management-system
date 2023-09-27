import LinkBtn from "../../components/LinkBtn";

export const Home = () => {
  return (
    <div className="lg:p-10 p-3 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="lg:text-4xl text-2xl font-bold">Players</h1>
        <LinkBtn to="/add-athlete">Add Athlete</LinkBtn>
      </div>  
     </div>  
  );
};
