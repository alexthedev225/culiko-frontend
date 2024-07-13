"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface LayoutProps {
  children: ReactNode; // Typage des enfants
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
