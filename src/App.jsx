import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#1877BD",
          borderRadius: 5,

          // Alias Token
          colorBgContainer: "#1877BD",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
