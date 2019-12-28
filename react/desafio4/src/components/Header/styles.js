import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  height: 64px;
  width: 100%;
  background: #4a90e2;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fff;
  }
  svg {
    margin: 20px;
  }
`;
