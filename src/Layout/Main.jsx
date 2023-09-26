import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <div className="h-screen overflow-auto font-sans bg-gradient-to-tl from-[rgba(200,202,230,255)] from-10% via-[rgba(222,235,236,1)] via-55% to-[rgba(173,207,210,1)] to-95% ">
      <Row>
        <Col className="hidden md:block" span={4}>
          <Sidebar />
        </Col>
        <Col span={20}>
          <Navbar />
          <Outlet />
        </Col>
      </Row>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
