import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          defaultBg: "#3b82f6",
        },
      }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ThemeProvider> */}
          <RouterProvider router={router} />
          {/* </ThemeProvider> */}
        </QueryClientProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ConfigProvider>
  );
}

export default App;
