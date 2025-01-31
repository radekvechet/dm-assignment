import { useQueryClient } from "@tanstack/react-query";
import { TodoItem } from "../types/todoTypes";
import { trpc } from "../utils/trpc"; // Adjust the path based on your project structure

export const useTodoItems = () => {
    const queryClient = useQueryClient();

    const useGetItems = () => {
        const { data, error, isLoading, isRefetching } = trpc.getItems.useQuery();

        return {
            items: data,
            error,
            loading: isLoading,
            isRefetching: isRefetching,
        };
    };

    const addItemMutation = trpc.addItem.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [["getItems"]] });
        },
        onError: (error) => {
            console.error("Error adding todo item:", error.message);
        },
    });

    const editItemMutation = trpc.editItem.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["getItems"]] })
      },
      onError: (error) => {
        console.error("Error editing todo item:", error.message)
      },
    })

    const addItem = async (itemName: string) => {
      await addItemMutation.mutateAsync(itemName)
    }

    const editItem = async (item: TodoItem) => {
      await editItemMutation.mutateAsync(item)
    }

    return {
      todoItemsError: addItemMutation.error || editItemMutation.error,
      todoItemsLoading: addItemMutation.isLoading || editItemMutation.isLoading,
      useGetItems,
      addItem,
      editItem,
    }
};
