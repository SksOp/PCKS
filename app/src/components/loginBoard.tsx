import React from "react";
import { useAuthContext } from "src/hooks/auth";

function LoginBoard() {
  const { loginWithGoogle } = useAuthContext();

  return (
    <div>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}

export default LoginBoard;
