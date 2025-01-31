import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import { FormValues } from "../types/todoTypes";
import { useTodoItems } from "../services/useTodo";

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
  button {
    all: unset;
    display: none;
    background-color: ${(props) => props.theme.colors.grass9};
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.olive9};
    border-radius: 50%;
    color: #fff;
    width: 25px;
    height: 25px;
    &:hover {
      background-color: ${(props) => props.theme.colors.green10};
    }
  }
`

const Label = styled.label`
    padding-bottom: 1.25rem;
`;

export type ListItemProp = {
  itemId: number
  label: string
  isDone: boolean
  createdAt: number
  //onItemLabelEdit: (label: string) => void
  //onItemDoneToggle: (isDone: boolean) => void
  //onItemDelete: () => void
}

export const ListItem = (props: ListItemProp) => {
  const { label, isDone, createdAt, itemId /*, onItemLabelEdit, onItemDoneToggle, onItemDelete*/ } = props
    const [showForm, setShowForm] = useState(false)
    const { editItem } = useTodoItems()

    const handleEditFormSubmit = async (values: FormValues) => {
                await editItem({ id: itemId, label: values.label, isDone, createdAt: new Date().getTime() })
                setShowForm(false)
            }

          const handleItemDoneToggle = async () => {
            await editItem({ id: itemId, label, isDone: !isDone, createdAt: new Date().getTime() })
          }

        const handleItemLabelEdit = () => {
            setShowForm(true)
        }

        const handleItemDelete = (itemId: number) => {
          // TODO: Implement delete item
          console.log("Delete item with id:", itemId)
        }


  return (
    <StyledDiv>
      <Checkbox checked={isDone} onCheckedChange={handleItemDoneToggle} />
      <ContentWrapper>
        {showForm ? (
          <Form isEdit={true} initialValues={{ label }} onSubmit={handleEditFormSubmit} onCancel={() => setShowForm(false)} />
        ) : (
          <>
            <Label>{label}</Label>
            <p className="time">{`${new Date(createdAt).toLocaleDateString()} ${new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}</p>
          </>
        )}
      </ContentWrapper>
      {!showForm && (
        <ButtonWrapper>
          <button onClick={() => handleItemDelete(itemId)}>
            <TrashIcon />
          </button>
          <button onClick={() => handleItemLabelEdit()}>
            <Pencil1Icon />
          </button>
        </ButtonWrapper>
      )}
    </StyledDiv>
  )
}

/*
{item.isDone ? <CheckboxIcon className="icon done" /> : <BoxIcon className="icon" />}
                <div className="content">
                  <h3>{item.label}</h3>
                  <p className="time">{`${new Date(item.createdAt).toLocaleDateString()} ${new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}</p>
                </div>
                <button onClick={handleEditItem(item.id)}>
                  <Pencil1Icon />
                </button>
              </ListItem>
              */