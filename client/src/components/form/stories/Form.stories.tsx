import { Meta, StoryObj } from "@storybook/react";

import { FormValues } from "../Form"

const meta = {
    title: "Form/Form",
    component: Form,
    argTypes: {
        onCancel: { action: "cancelled" },
        onSubmit: { action: "submitted" },
    },
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
    args: {
        initialValue: "",
    },
};
