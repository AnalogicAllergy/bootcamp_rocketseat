import React from "react";
import Comment from "../Comment";
import {
  PostContainer,
  PostStructure,
  InfoUser,
  Question,
  Divisor
} from "./styles";

export default function Post() {
  return (
    <PostStructure>
      <PostContainer>
        <img
          src="https://vignette.wikia.nocookie.net/naruto/images/e/e7/Sasuke_epi_319.png/revision/latest?cb=20130629210647&path-prefix=pt-br"
          alt="Sasuke"
        />
        <InfoUser>
          <strong>Julio Alcantara</strong>
          <small>04 de Junho 2019</small>
          <Question>
            Pessoal, alguém sabe se a Rocketseat está contratando?
          </Question>
        </InfoUser>
      </PostContainer>
      <Divisor />
      <Comment></Comment>
    </PostStructure>
  );
}
