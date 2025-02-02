import { Meta, StoryObj } from "@storybook/react"
import { List } from "../list/List"
import type { TodoItem } from "../../types/todoTypes"

const meta: Meta<typeof List> = {
  title: "List",
  component: List,
}

export default meta

type Story = StoryObj<typeof List>

const sampleItems: TodoItem[] = [
  {
    id: 1,
    label: "Lorem ipsum dolor",
    createdAt: 1738535820807,
    isDone: false,
  },
  {
    id: 2,
    label: "Nullam Adipiscing Ridiculus Fusce",
    createdAt: 1738535820888,
    isDone: false,
  },
  {
    id: 3,
    label: "Mattis Tristique Parturient",
    createdAt: 1738535820850,
    isDone: true,
  },
]

export const WithItems: Story = {
  args: {
    loading: false,
    error: undefined,
    items: sampleItems,
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    error: undefined,
    items: [],
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    error: undefined,
    items: [],
  },
}

export const ErrorState: Story = {
  args: {
    loading: false,
    error: "An error occurred while fetching data.",
    items: [],
  },
}
