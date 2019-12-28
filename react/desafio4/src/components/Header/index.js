import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { Header } from "./styles";

export default function HeaderComponent() {
  return (
    <div>
      <Header>
        <FaFacebookF color="#FFF" size={32} />
        <h1>Meu Perfil</h1>
        <MdPersonOutline color="#fff" size={24} />
      </Header>
    </div>
  );
}
