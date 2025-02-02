import React from "react";
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc, trpcClient } from "./utils/trpc"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </trpc.Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
