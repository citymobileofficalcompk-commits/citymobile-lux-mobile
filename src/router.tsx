import React from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    InnerWrap: ({ children }: { children: React.ReactNode }) => (
      <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
    ),
  });

  return router;
};
