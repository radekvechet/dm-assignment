import { styled } from "styled-components"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
  icon: React.ReactNode
  hidden?: boolean
  xOffset?: string
}

const StyledButton = styled.button<{ hidden?: boolean; xOffset?: string }>`
  display: ${(props) => (props.hidden ? "none" : "block")};
  background-color: ${(props) => props.theme.colors.grass9};
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.olive9};
  border-radius: 50%;
  color: #fff;
  width: 25px;
  height: 25px;
  transition: all 0.3s;

  &:hover,
  &:active {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.olive12};
  }
  &:focus {
    cursor: pointer;
    border-color: ${(props) => props.theme.colors.blackA10};
  }
  & > svg {
    display: block;
    margin: auto ${(props) => props.xOffset ?? "auto"};
  }
`

export const Button = (props: ButtonProps) => {
  const { title, icon, xOffset, ...rest } = props

  return (
    <StyledButton xOffset={xOffset} title={title} {...rest}>
      {icon}
    </StyledButton>
  )
}
