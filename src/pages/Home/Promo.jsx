import { Container } from "../../components/Container";

const Promo = () => {
  return (
    <div className="bg-white py-20">
      <Container extraStyle={"flex flex-col justify-center items-center "}>
        <h1 className="text-center text-2xl md:text-4xl font-semibold ">
          Why You Choose Overtime?
        </h1>
        <p className=" text-center text-lg text-gray-500 mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.  At delectus
          exercitationem<br /> quasi error  perferendis debitis eveniet nam illo
          consequuntur nisi?<br />
        </p>
        <div>
            <div className="p-5">
                <img src="" alt="" />
                <h3></h3>
                <p></p>
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Promo;
