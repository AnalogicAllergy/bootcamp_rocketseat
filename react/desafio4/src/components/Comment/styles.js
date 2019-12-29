import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;
  img {
    margin-left: 10px;
    margin-right: 5px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    align-self: center;
    border: 1px solid #eee;
  }
`;
export const CommentBubble = styled.div`
  display: flex;
  background: #333;
  border-radius: 4px;
  flex-direction: row;

  strong {
    font-weight: 600;
    font-size: 13px;
    margin-left: 1px;
    font-family: Helvetica, sans-serif;
  }
  p {
    direction: ltr;
    margin-left: 3px;
    font-size: 13px;
    font-family: Helvetica, sans-serif;
  }
`;
