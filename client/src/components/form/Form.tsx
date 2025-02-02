import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react"
import { Input } from "./Input"
import { type FormValues } from "../../types/todoTypes"
import styled from "styled-components"
import { Button } from "../Button"

const FormStyled = styled.form`
  display: flex;
  margin: 1rem 0;
  gap: 0.5rem;
  button {
    all: unset;
    background-color: ${(props) => props.theme.colors.grass9};
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.olive9};
    border-radius: 50%;
    color: #fff;
    width: 25px;
    height: 25px;
  }
`
type FormProps = {
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
  onCancel: () => void
  isEdit?: boolean
}

export const Form = (props: FormProps) => {
  const { initialValues, onSubmit, onCancel, isEdit = false } = props

  const [inputValue, setInputValue] = useState(initialValues.label)

  return (
    <FormStyled
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ label: inputValue })
      }}
      onReset={() => {
        onCancel()
      }}
    >
      <Input
        label={isEdit ? undefined : "New item name:"}
        value={inputValue}
        onValueChange={(value) => setInputValue(value)}
      />
      <Button
        icon={<CheckIcon />}
        type={"submit"}
        title={isEdit ? "Save changes" : "Add item"}
        aria-label={isEdit ? "Save changes" : "Add item"}
      />
      <Button icon={<Cross1Icon />} type={"reset"} title="Cancel" aria-label="Cancel" />
    </FormStyled>
  )
}
