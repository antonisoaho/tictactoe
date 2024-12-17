"use client";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useState } from "react";

export default function Auth() {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="flex mt-24 justify-center w-full">
      <button onClick={() => setLogin(!login)}>
        {login ? "Not a member? Register" : "Already a member? Login"}
      </button>
      {login ? <Login /> : <Register />}
    </div>
  );
}
