import styled from "styled-components";
import { useTodoItems } from "../services/useTodo"
import { ListItem } from "./ListItem"

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
`

export const List = () => {
  const { useGetItems } = useTodoItems()
  const { items, loading, error } = useGetItems()

  return (
    <ListStyled>
      {error ? (
        <p className="errorMessage">Sorry, there was an error in our app: {error.message}</p>
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {items &&
            items.map((item) => (
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
