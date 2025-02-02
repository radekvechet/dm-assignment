import { z } from "zod"

export const todoItemValidator = z.object({
  label: z.string(),
  id: z.number(),
  isDone: z.boolean(),
  createdAt: z.number(),
  finishedAt: z.number().optional(),
})

export const addTodoItemValidator = z.string()
