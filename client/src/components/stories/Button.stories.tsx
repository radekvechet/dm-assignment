import { Meta, StoryObj } from "@storybook/react"
import { Button } from "../Button"
import { Cross1Icon } from "@radix-ui/react-icons"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    title: { control: "text" },
    icon: { table: { disable: true } },
    $xoffset: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    title: "My Button",
    icon: <Cross1Icon />,
    $xoffset: "-2px",
  },
}
