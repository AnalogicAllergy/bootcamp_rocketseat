import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    background: #f2f2f2; 
        
    
  }
  html, body, #root{
    min-height: 100%;
  }
  body {
    --webkit-font-smoothing: antialiased !important;
  }
  button {
    cursor: pointer;
  }
`;
export default globalStyle;
