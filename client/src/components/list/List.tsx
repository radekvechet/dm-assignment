import styled from "styled-components"
import { ListItem } from "./ListItem"
import type { TodoItem } from "../../types/todoTypes"

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`

interface ListProps {
  items: TodoItem[]
  loading: boolean
  error?: string
}

export const List = (props: ListProps) => {
  const { items, loading, error } = props

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
        <p className="errorMessage">{error}</p>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {items && items.length === 0 && <p>Add some new items</p>}
          {items &&
            items.length > 0 &&
            items
              .sort(sortItems)
              .map((item) => (
                <ListItem
                  id={item.id}
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
