import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
function LoginDialog() {
  const { fetchLoginUser } = useUserContext();

  // Define state variables for the dialog and credentials
  const [loginIsOpen, setLoginIsOpen] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(credentials);
    e.preventDefault();

    console.log("Email:", credentials.email);
    console.log("Password:", credentials.password);

    await fetchLoginUser(credentials);
  };

  // useEffect(() => {
  //   console.log(credentials);
  // }, [credentials]);

  return (
    <dialog open={loginIsOpen}>
      <button onClick={() => setLoginIsOpen(false)}>X</button>
      <p className="dialog-title">Logga in här</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="text"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          placeholder="lösenord"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
}

export default LoginDialog;
