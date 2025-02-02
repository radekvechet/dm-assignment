import { initTRPC, TRPCError } from "@trpc/server"
import { TodoItem } from "../../client/src/types/todoTypes"
import { addTodoItemValidator, todoItemValidator } from "./validators"
import path from "path"
import fs from "fs-extra"
import { isError } from "@tanstack/react-query"
import { z } from "zod"

const t = initTRPC.create()
const DB_PATH = path.resolve("./db.json")

const readDB = async (): Promise<{ items: TodoItem[] }> => {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8")
    return JSON.parse(data)
  } catch (e) {
    if (isError(e)) throw new Error(`Failed to read ${DB_PATH} DB: ${e.message}`)
    return { items: [] }
  }
}

const writeDB = async (data: { items: TodoItem[] }) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
  } catch (e) {
    if (isError(e)) throw new Error(`Failed to write ${DB_PATH} DB: ${e.message}`)
  }
}

export const appRouter = t.router({
  getItems: t.procedure.query(async () => {
    try {
      const db = await readDB()
      return db.items as TodoItem[]
    } catch (e) {
      if (isError(e)) {
        throw new TRPCError({
          message: `Failed to get items: ${e.message}`,
          code: "INTERNAL_SERVER_ERROR",
          cause: "DB error",
        })
      }
    }
  }),

  addItem: t.procedure.input(addTodoItemValidator).mutation(async ({ input }) => {
    console.log("Adding new item:", input)
    try {
      const db = await readDB()
      const newItem: TodoItem = {
        id: db.items.length + 1, // auto-increment
        label: input,
        isDone: false,
        createdAt: Date.now(),
      }

      db.items.push(newItem)
      await writeDB(db)

      return { success: true, item: newItem }
    } catch (e) {
      if (isError(e)) {
        throw new TRPCError({
          message: `Failed to add item ${input}: ${e.message}`,
          code: "INTERNAL_SERVER_ERROR",
          cause: "DB error",
        })
      }
    }
  }),

  editItem: t.procedure.input(todoItemValidator).mutation(async ({ input }) => {
    console.log("edit item:", input)
    try {
      const db = await readDB()
      let itemFound = false
      db.items = db.items.map((item) => {
        if (item.id === input.id) {
          itemFound = true
          return {
            ...input,
          }
        }
        return item
      })
      if (!itemFound) {
        throw new Error(`Item with id ${input.id} not found`)
      }
      await writeDB(db)

      return { success: true, item: input }
    } catch (e) {
      if (isError(e)) {
        throw new TRPCError({
          message: `Failed to update item ${input}: ${e.message}`,
          code: "INTERNAL_SERVER_ERROR",
          cause: "DB error",
        })
      }
    }
  }),

  deleteItem: t.procedure.input(z.number()).mutation(async ({ input }) => {
    console.log("delete item:", input)
    try {
      const db = await readDB()
      const itemIndex = db.items.findIndex((item) => item.id === input)

      if (itemIndex !== -1) {
        db.items.splice(itemIndex, 1)
      } else {
        throw new Error(`Item with id ${input} not found`)
      }

      await writeDB(db)
      return { success: true, item: input }
    } catch (e) {
      if (isError(e)) {
        throw new TRPCError({
          message: `Failed to delete item ${input}: ${e.message}`,
          code: "INTERNAL_SERVER_ERROR",
          cause: "DB error",
        })
      }
    }
  }),

  toggleItemDone: t.procedure.input(z.number()).mutation(async ({ input }) => {
    console.log("toggle item done:", input)
    try {
      const db = await readDB()
      let itemFound = false
      db.items = db.items.map((item) => {
        if (item.id === input) {
          itemFound = true
          return {
            ...item,
            isDone: !item.isDone,
            finishedAt: !item.isDone ? Date.now() : undefined,
          }
        }
        return item
      })
      if (!itemFound) {
        throw new Error(`Item with id ${input} not found`)
      }
      await writeDB(db)

      return { success: true, item: input }
    } catch (e) {
      if (isError(e)) {
        throw new TRPCError({
          message: `Failed to toggle item done ${input}: ${e.message}`,
          code: "INTERNAL_SERVER_ERROR",
          cause: "DB error",
        })
      }
    }
  }),
})

export type AppRouter = typeof appRouter
