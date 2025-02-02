import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import styled from "styled-components"

import { Checkbox } from "./Checkbox"
import { Form } from "../form"
import { FormValues, TodoItem } from "../../types/todoTypes"
import { useTodoItems } from "../../services/useTodo"
import { Button } from "../Button"

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.4s;
  &:hover,
  &:focus,
  &:active {
    background-color: #eee;
    button {
      display: block;
    }
  }
`
const ContentWrapper = styled.div`
  flex-grow: 1;
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
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Label = styled.label`
  padding-bottom: 1.25rem;
`

export type ListItemProp = TodoItem

export const ListItem = (props: ListItemProp) => {
  const { label, isDone, createdAt, id } = props
  const [showForm, setShowForm] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { editItem, deleteItem, todoItemsLoading, todoItemsError } = useTodoItems()

  const handleEditFormSubmit = async (values: FormValues) => {
    await editItem({ id, label: values.label, isDone, createdAt: new Date().getTime() })
    setShowForm(false)
  }

  const handleItemDoneToggle = async () => {
    await editItem({ id, label, isDone: !isDone, createdAt: new Date().getTime() })
  }

  const handleItemLabelEdit = () => {
    setShowForm(true)
  }

  const handleItemDelete = async (itemId: number) => {
    await deleteItem(itemId)
  }

  return (
    <StyledDiv
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Checkbox checked={isDone} onCheckedChange={handleItemDoneToggle} />
      <ContentWrapper>
        {showForm ? (
          <Form
            isEdit={true}
            initialValues={{ label }}
            onSubmit={handleEditFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <Label>{label}</Label>
            <p className="time">{`${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}</p>
          </>
        )}
        {todoItemsError && (
          <p className="errorMessage">Error while updating or deleting the todo item, please try again later.</p>
        )}
      </ContentWrapper>
      {!showForm && (
        <ButtonWrapper>
          <Button
            icon={<TrashIcon />}
            title="Delete item"
            disabled={todoItemsLoading}
            onClick={() => handleItemDelete(id)}
            hidden={!isHovered}
            xOffset="-2px"
          />
          <Button
            icon={<Pencil1Icon />}
            title="Edit item"
            disabled={todoItemsLoading}
            onClick={() => handleItemLabelEdit()}
            hidden={!isHovered}
            xOffset="-2px"
          />
        </ButtonWrapper>
      )}
    </StyledDiv>
  )
}
