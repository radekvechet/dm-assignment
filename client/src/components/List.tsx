import styled from "styled-components";
import { useTodoItems } from "../services/useTodo"
import { ListItem } from "./ListItem"
import { TodoItem } from "../types/todoTypes"

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
`

export const List = () => {
  const { useGetItems } = useTodoItems()
  const { items, loading, error } = useGetItems()

  const sortItems = (a: TodoItem, b: TodoItem): number => {
    // First, sort by isDone: items with isDone === true should come first.
    if (a.isDone !== b.isDone) {
      // If a is done and b is not, a should come first.
      return (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0)
    }
    // If both items isDone param is identical, sort by createdAt (descending).
    return b.createdAt - a.createdAt
  }

  return (
    <ListStyled>
      {error ? (
        <p className="errorMessage">Sorry, there was an error in our app: {error.message}</p>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {items &&
            items
              .sort(sortItems)
              .map((item) => (
                <ListItem
                  itemId={item.id}
                  key={item.id}
                  label={item.label}
                  createdAt={item.createdAt}
                  isDone={item.isDone}
                />
              ))}
        </>
      )}
    </ListStyled>
  )
}
