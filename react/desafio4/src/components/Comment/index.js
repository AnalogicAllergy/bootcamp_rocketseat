import React, { Component } from "react";

import { CommentContainer, CommentBubble } from "./styles";

export default class Comment extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <>
        {posts.comments.map(comment => (
          <CommentContainer>
            <img src={comment.author.avatar} alt="" />
            <CommentBubble>
              <strong>{comment.author.name}</strong>
              <p>{comment.content}</p>
            </CommentBubble>
          </CommentContainer>
        ))}
      </>
    );
  }
}
