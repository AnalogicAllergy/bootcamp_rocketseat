import styled from "styled-components";

export const PostContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;

  * {
    background: #fff;
  }
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid #eee;
  }
`;

export const InfoUser = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-self: flex-start;
  * {
    background: #fff;
  }
  strong {
    font-size: 18px;
    font-weight: 600;
  }
  small {
    font-size: 12px;
    color: #333;
  }
`;
export const Question = styled.p`
  margin-top: 15px;
  flex: 1;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
  margin-bottom: 20px;
`;
export const PostStructure = styled.div`
  * {
    background: #fff;
  }
  width: 700px;
  height: 250px;
`;
export const Divisor = styled.div`
  border-bottom: 1px solid #eee;
`;
