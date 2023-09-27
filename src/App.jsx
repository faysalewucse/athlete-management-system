import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          fontFamily: "Poppins",
          colorPrimary: "#0b818e",
          borderRadius: 5,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
