import styled from "styled-components"

const FooterStyled = styled.footer`
  display: flex;

  margin-top: 15px;
  padding-top: 15px;

  border-top: 1px solid;
  border-color: ${(props) => props.theme.colors.olive6};

  .counter {
    margin-right: 1rem;
  }
`

type FooterProps = {
  todoItems?: number
  doneItems?: number
}

export const Footer = (props: FooterProps) => {
  const { todoItems, doneItems } = props

  return (
    <FooterStyled>
      <span className="counter">Todo: {todoItems ?? 0}</span>
      <span className="counter">Done: {doneItems ?? 0}</span>
    </FooterStyled>
  )
}
