import React from "react";
import HeaderComponent from "./components/Header";
import Post from "./components/Post";
import GlobalStyle from "./styles/global";
function App() {
  return (
    <>
      <GlobalStyle />
      <HeaderComponent />
      <Post />
    </>
  );
}

export default App;
