import React from "react";

type Props = {
  setRegisterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({ setRegisterIsOpen }: Props) {
  return (
    <dialog open>
      <button onClick={() => setRegisterIsOpen(false)}>X</button>
      <p className="dialog-title">Registrera dig här</p>
      <form method="dialog">
        <input placeholder="användarnamn" type="text" />
      </form>
    </dialog>
  );
}

export default RegisterForm;
