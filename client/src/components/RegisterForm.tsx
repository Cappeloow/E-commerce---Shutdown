import React from "react";
import { useState } from "react";
interface registerUser {
  username: string;
  password: string;
  firstName: string;
}

const defaultCreateCustomerValues = {
  username: "",
  password: "",
  firstName: "",
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
        setCustomer(defaultCreateCustomerValues);
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
    <dialog open>
      <button onClick={() => setRegisterIsOpen(false)}>X</button>
      <p className="dialog-title">Registrera dig här</p>
      <form method="dialog">
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
          onChange={(e) =>
            setCustomer({ ...customer, firstName: e.target.value })
          }
        />
        <button onClick={registerCustomer}>Skapa</button>
      </form>
    </dialog>
  );
}

export default RegisterForm;
