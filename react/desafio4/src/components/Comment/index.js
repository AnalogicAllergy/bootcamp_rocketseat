import React from "react";

import { CommentContainer, CommentBubble } from "./styles";

export default function Comment() {
  return (
    <CommentContainer>
      <img
        src="https://img.quizur.com/f/img5d7e82aae2ede9.52928847.jpg?lastEdited=1568572087"
        alt=""
      />
      <CommentBubble>
        <strong>Naruto</strong>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id
          purus euismod, placerat enim id, posuere justo. Ut scelerisque maximus
          tellus, finibus iaculis orci laoreet a. Nullam volutpat facilisis
          magna, ac tincidunt turpis. Sed euismod mi suscipit massa consequat
          pretium. Donec eu libero lobortis sapien iaculis aliquam eget vitae
          libero
        </p>
      </CommentBubble>
    </CommentContainer>
  );
}
