import type { Parameters, Preview, Decorator } from "@storybook/react";
import { ThemeProvider } from "../src/components/providers/ThemeProvider";
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc, trpcClient } from "../src/utils/trpc"

const queryClient = new QueryClient()

// Decorator to wrap stories with the ThemeProvider.
const withTheme = (Story: React.FC) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
)

// Decorator to wrap stories with React Query's QueryClientProvider.
const withReactQuery = (Story: React.FC) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
)

// Decorator to wrap stories with tRPC's Provider.
const withTRPC = (Story: React.FC) => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <Story />
  </trpc.Provider>
)

// Combine all decorators. The order matters; they are applied from top (outermost) to bottom (innermost).
export const decorators: Decorator[] = [withTheme, withReactQuery, withTRPC]

const preview: Preview = {
  decorators,
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
