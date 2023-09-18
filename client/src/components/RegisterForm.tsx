import React from "react";
import { useState } from "react";
interface registerUser {
  username: string;
  password: string;
  name: string;
}

const defaultCreateCustomerValues = {
  username: "",
  password: "",
  name: "",
};

type Props = {
  setRegisterIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RegisterForm({ setRegisterIsOpen }: Props) {
  const [customer, setCustomer] = useState<registerUser>(
    defaultCreateCustomerValues
  );
  // const [error, setError] = useState("");

  //Works for now, need to validate with joi or something in the future, because at the moment we dont see any messages if wrong format.
  const registerCustomer = async () => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      console.log(response);
      if (response.status === 201) {
        console.log("You've created an account");
      } else {
        const data = await response.json();
        console.log(data);
        // setError(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog className="LoginDialogBox" open>
      <h2 className="CloseDiv" onClick={() => setRegisterIsOpen(false)}>
        X
      </h2>
      <div className="LoginWrapper">
        <p className="dialog-title">Registrera dig här</p>
        <form className="formDiv" method="dialog">
          <input
            placeholder="användarnamn"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, username: e.target.value })
            }
          />
          <input
            placeholder="lösenord"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, password: e.target.value })
            }
          />
          <input
            placeholder="namn"
            type="text"
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <button className="LoginRegisterBtn" onClick={registerCustomer}>
            Skapa
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default RegisterForm;
