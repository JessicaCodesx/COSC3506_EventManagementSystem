import { useState } from "react";
import Background from "./Background";
import LoginBox from "./LoginBox";

interface Props {
  loginClicked: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginPage() {
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

export default LoginPage;
