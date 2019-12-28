import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-bottom: 10px;

  img {
    margin-left: 10px;
    height: 37px;
    width: 37px;
    border-radius: 50%;
    border: 1px solid #eee;
  }
`;
export const CommentBubble = styled.div`
  display: flex;
  background: #7159c1;
  border-radius: 4px;
  flex-direction: row;

  strong {
    font-weight: 600;
    font-size: 16px;
    margin-left: 20px;
  }
  p {
    flex: 1;
    direction: ltr;
    margin-left: 10px;
    font-size: 16px;
  }
`;
