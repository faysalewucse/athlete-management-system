import { Container } from "../../components/Container";
import athlete from "../../assets/athlete.png";
import Button from "../../components/shared/Button";
import { motion } from "framer-motion";

export const Banner = () => {
  // const { isDark } = useTheme();
  //TODO3: set autoplat delay 2500
  return (
    <div className="relative md:min-h-[90vh] p-5 flex items-center bg-white text-slate-700">
      <Container>
        <div className="md:w-1/2 text-center md:text-start relative z-10">
          <motion.h1
            animate={{ fontSize: "2.25rem" }}
            className="text-xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-primary from-secondary"
          >
            Maximize Athletic Performance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="text-5xl md:text-7xl font-bold my-5"
          >
            Unlock the Full Potential of Your Athletes
          </motion.p>
          <motion.p
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
            className="text-justify mb-5"
          >
            Our athlete management system empowers coaches and organizations to
            maximize athlete performance. With advanced tools for profiles,
            scheduling, tracking, and communication, we&apos;re your key to
            sports excellence
          </motion.p>
          <Button
            text={"Admit Today"}
            style={"bg-primary text-black dark:text-white"}
          />
        </div>
        <motion.img
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, duration: 0.1 }}
          className="z-0 absolute bottom-0 right-0 sm:opacity-100 opacity-40"
          src={athlete}
          alt=""
        />
      </Container>
    </div>
  );
};
