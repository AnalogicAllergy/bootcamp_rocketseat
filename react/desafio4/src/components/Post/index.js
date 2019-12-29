import React, { Component } from "react";
import Comment from "../Comment";

import {
  PostContainer,
  PostStructure,
  InfoUser,
  Question,
  Divisor
} from "./styles";

export default class Post extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar:
            "https://i0.wp.com/www.fatosdesconhecidos.com.br/wp-content/uploads/2014/11/random_person_by_Vurtov.jpg?resize=600,450"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars3.githubusercontent.com/u/2254731?s=96&v=4"
            },
            content: "Estamos sempre de olho nos melhores alunos do bootcamp!"
          },
          {
            id: 2,
            author: {
              name: "Robson Marques",
              avatar: "https://avatars2.githubusercontent.com/u/861751?s=96&v=4"
            },
            content:
              "Exatamente! Estamos sempre de acompanhando a participação dos alunos no Discord."
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Karla Machado",
          avatar:
            "https://scontent.fbsb14-1.fna.fbcdn.net/v/t1.0-9/s960x960/42153359_637156220065646_1939797785687621632_o.jpg?_nc_cat=101&_nc_ohc=WKuncC8VZOwAQm_uryEFyM4N3dpxTDiUy_GztPR7-D3ZqO1VVjQPVtpnQ&_nc_ht=scontent.fbsb14-1.fna&oh=1f79f7fa9773a389466754c25e56f084&oe=5EAC0CC8"
        },
        date: "11 Dez 2019",
        content: "Pessoal, quando começa a nova Semana Omnistack?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars3.githubusercontent.com/u/2254731?s=96&v=4"
            },
            content:
              "As aulas da Semana Omnistack começam no dia 13/01! #boraCodar"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Marcos Sousa",
          avatar:
            "https://www.thelocal.se/userdata/images/article/6d67730d16af04f3f956389d4cc244af808b8381c23b1e3d218ecd792de14fa8.jpg"
        },
        date: "12 Dez 2019",
        content: "Há alguma previsão de quando será o próximo Bootcamp?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars3.githubusercontent.com/u/2254731?s=96&v=4"
            },
            content:
              "O próximo bootcamp será no início de Fev/2020! Vem muita novidade aí!"
          }
        ]
      },
      {
        id: 4,
        author: {
          name: "Filipe Deschamps",
          avatar: "https://avatars3.githubusercontent.com/u/4248081?s=460&v=4"
        },
        date: "12 Dez 2019",
        content:
          "Será que a gente consegue fazer um colab nesse próximo bootcamp Diego?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars3.githubusercontent.com/u/2254731?s=96&v=4"
            },
            content: "Mas é claro que sim! Vamos conversar!"
          }
        ]
      }
    ]
  };
  render() {
    const { posts } = this.state;
    return (
      <>
        {posts.map(post => (
          <PostStructure>
            <PostContainer key={post.id}>
              <img src={post.author.avatar} alt="User" />
              <InfoUser>
                <strong> {post.author.name} </strong>
                <small>{post.date}</small>
                <Question>{post.content}</Question>
              </InfoUser>
            </PostContainer>

            <Divisor />
            <Comment posts={post}></Comment>
          </PostStructure>
        ))}
      </>
    );
  }
}
