import styled from "styled-components";
import { useTodoItems } from "../services/useTodo"
import { CheckboxIcon, BoxIcon } from "@radix-ui/react-icons"

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  .todoItem {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 0.5rem 1rem;
    transition: background-color 0.4s;
    h3 {
      margin-bottom: 0.5rem;
    }
    .icon {
      color: gray;

      &.done {
        color: green;
      }
    }
    .time {
      font-size: 0.8rem;
      color: gray;
    }
    &:hover,
    &:focus,
    &:active {
      background-color: #eee;
    }
  }
`

export const List = () => {
  const { useGetItems } = useTodoItems()
  const { items, loading, error } = useGetItems()

  return (
    <ListStyled>
      {error && <p className="errorMessage">Sorry, there was an error in our app: {error.message}</p>}
      {loading && <p>Loading...</p>}
      {items &&
        items.map((item) => (
          <div className="todoItem" key={item.id}>
            {item.isDone ? <CheckboxIcon className="icon done" /> : <BoxIcon className="icon" />}
            <div>
              <h3>{item.label}</h3>
              <p className="time">{`${new Date(item.createdAt).toLocaleDateString()} ${new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}</p>
            </div>
          </div>
        ))}
    </ListStyled>
  )
}
