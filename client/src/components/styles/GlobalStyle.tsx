import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    ${reset}
    
    :root {
      font-family: Inter, sans-serif;
      font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
      line-height: 1.7rem;
    }

    @supports (font-variation-settings: normal) {
      :root { font-family: InterVariable, sans-serif; }
    }

    .errorMessage {
      background-color: #ffcccc;
      border-radius: 0.5rem;
      margin: 0.5rem 0;
      padding: 0.5rem 1rem;
    }
`
