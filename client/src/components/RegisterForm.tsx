import React from "react";

type Props = {
  setRegisterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({ setRegisterIsOpen }: Props) {
  return (
    <dialog open>
      <button onClick={() => setRegisterIsOpen(false)}>X</button>
      <p className="dialog-title">Skapa ett nytt rum</p>
      <form method="dialog">
        <input placeholder="Rumsnamn" type="text" />
      </form>
    </dialog>
  );
}

export default RegisterForm;
