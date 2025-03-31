import { useState } from "react";
import Background from "./components/Background";
import LoginBox from "./components/LoginBox";
import Logo from "./components/Logo";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Background>
          <LoginBox></LoginBox>
        </Background>
      </div>
    </>
  );
}

export default App;
