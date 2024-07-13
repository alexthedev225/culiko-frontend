"use client"
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
const Layout = ({ children }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <main>
          {children}
        </main>
      </QueryClientProvider>
    </div>
  );
};

export default Layout;
