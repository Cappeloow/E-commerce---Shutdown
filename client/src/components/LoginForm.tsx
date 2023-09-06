import React from "react";

type Props = {
  setLoginIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({ setLoginIsOpen }: Props) {
  return (
    <dialog open>
      <button onClick={() => setLoginIsOpen(false)}>X</button>
      <p className="dialog-title">Logga in här</p>
      <form method="dialog">
        <input placeholder="Rumsnamn" type="text" />
      </form>
    </dialog>
  );
}

export default LoginForm;
