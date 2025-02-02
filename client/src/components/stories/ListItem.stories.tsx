import { Meta, StoryObj } from "@storybook/react"
import { ListItem, type ListItemProp } from "../list/ListItem"

const meta: Meta<typeof ListItem> = {
  title: "Components/ListItem",
  component: ListItem,
  parameters: {
    docs: {
      description: {
        component:
          "The ListItem displays a todo item. Hover over the item to reveal the action buttons (edit and delete).",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ListItem>

const defaultItem: ListItemProp = {
  id: 1,
  label: "Sample ToDo Item",
  isDone: false,
  createdAt: Date.now(),
}

export const Default: Story = {
  args: {
    ...defaultItem,
  },
}
