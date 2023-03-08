import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html {
    background-color: ${({ theme }) => theme.background};
    min-width: 100vw;
    min-height: 100vh;
  }
  
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    
  }
  
  button {
    background-color: ${({ theme }) => theme.item};
    color: ${({ theme }) => theme.altText};
    border-style: none;
    padding: 5px 10px;
    border-radius: 8px;
    margin: 10px;
    margin-left: 0;
    filter: drop-shadow(1px 1px 4px ${({ theme }) => theme.text});
}
  
  input {
    padding: 5px 10px;
    margin: 5px;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background-color: lightsteelblue;
    font-weight: bold;
    min-width: 250px;
  }
  `;
