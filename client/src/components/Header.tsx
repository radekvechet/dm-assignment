import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { useAtom } from "jotai"
import React from "react"
import styled from "styled-components"
import { formAtom } from "../App"
import { Button } from "./Button"

const StyledDiv = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-weight: 700;
  }
`

type HeaderProps = {
  children: React.ReactNode
  onItemAdd: (label: string) => void
}

export const Header = (props: HeaderProps) => {
  const { children } = props
  const [form, setForm] = useAtom(formAtom)

  return (
    <StyledDiv>
      <h1>{children}</h1>
      <Button
        icon={form.isOpened ? <MinusIcon /> : <PlusIcon />}
        title={form.isOpened ? "Close form" : "Add new item"}
        $xoffset="-2px"
        onClick={() => {
          setForm({ ...form, isOpened: !form.isOpened })
        }}
      />
    </StyledDiv>
  )
}
