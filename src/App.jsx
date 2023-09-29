import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider> */}
        <RouterProvider router={router} />
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
