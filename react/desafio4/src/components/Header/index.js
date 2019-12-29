import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { Header } from "./styles";

export default function HeaderComponent() {
  return (
    <div>
      <Header>
        <FaFacebookF color="#FFF" size={32} />
        <h1>Meu Perfil</h1>
      </Header>
    </div>
  );
}
