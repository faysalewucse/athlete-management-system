import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ConfigProvider>
  );
}

export default App;
