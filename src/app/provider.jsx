"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      Provider{children}
    </QueryClientProvider>
  );
};

export default Providers;
