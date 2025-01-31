import { httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../server/src/appRouter"
import { createTRPCReact } from "@trpc/react-query"

const VITE_BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL
export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${VITE_BACKEND_SERVER_URL}/trpc`, //`${VITE_BACKEND_SERVER_URL}/trpc`,
    }),
  ],
})
