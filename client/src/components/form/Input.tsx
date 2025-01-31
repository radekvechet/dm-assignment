import styled from "styled-components";

const InputStyled = styled.input``

const InputWrappedStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`

type InputProps = {
  value: string
  onValueChange: (value: string) => void
  label?: string
}

export const Input = (props: InputProps) => {
  const { value, onValueChange } = props

  return (
    <InputWrappedStyled>
      <label>{props.label}</label>
      <InputStyled
        aria-label={props.label}
        value={value}
        onChange={(e) => {
          const value = e.currentTarget.value
          onValueChange(value)
        }}
      />
    </InputWrappedStyled>
  )
}
