import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { appRouter } from "./src/appRouter"

const app = express()

// Enable CORS to allow frontend requests
app.use(cors())

// Middleware to parse JSON requests (important!)
app.use(express.json())

// Mount tRPC API at /trpc
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // You can extend this later for auth, etc.
  })
)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 tRPC server running on http://localhost:${PORT}/trpc`)
})
