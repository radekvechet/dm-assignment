import { useQueryClient } from "@tanstack/react-query";
import { TodoItem } from "../types/todoTypes";
import { trpc } from "../utils/trpc"; // Adjust the path based on your project structure

export const useTodoItems = () => {
    const queryClient = useQueryClient();

    const useGetItems = () => {
        const { data, error, isLoading, isRefetching } = trpc.getItems.useQuery();

        return {
          items: data as TodoItem[],
          error,
          loading: isLoading,
          isRefetching: isRefetching,
        }
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

    const deleteItemMutation = trpc.deleteItem.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["getItems"]] })
      },
      onError: (error) => {
        console.error("Error deleting todo item:", error.message)
      },
    })

    const addItem = async (itemName: string) => {
      await addItemMutation.mutateAsync(itemName)
    }

    const editItem = async (item: TodoItem) => {
      await editItemMutation.mutateAsync(item)
    }

    const deleteItem = async (id: number) => {
      await deleteItemMutation.mutateAsync(id)
    }

    return {
      todoItemsError: addItemMutation.error || editItemMutation.error || deleteItemMutation.error,
      todoItemsLoading: addItemMutation.isLoading || editItemMutation.isLoading || deleteItemMutation.isLoading,
      useGetItems,
      addItem,
      editItem,
      deleteItem,
    }
};
