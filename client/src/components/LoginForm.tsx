import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
type Props = {
  setLoginIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginDialog({ setLoginIsOpen }: Props) {
  const { fetchLoginUser, loginUser } = useUserContext();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchLoginUser(credentials);

    if (loginUser) {
      setCredentials({ ...credentials, username: "" });
      setCredentials({ ...credentials, password: "" });
    }
  };

  useEffect(() => {
    if (loginUser) {
      setLoginIsOpen(false);
    }
  }, [loginUser]);

  return (
    <dialog open>
      <button onClick={() => setLoginIsOpen(false)}>X</button>
      <p className="dialog-title">Logga in här</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="text"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
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
