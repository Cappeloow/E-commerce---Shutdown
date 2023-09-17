import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import "./styles/LoginForm.css";
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
    <dialog className="LoginDialogBox" open>
      <h2 className="CloseDiv" onClick={() => setLoginIsOpen(false)}>
        X
      </h2>
      <div className="LoginWrapper">
        <p className="dialog-title">Logga in här</p>
        <form className="formDiv" onSubmit={handleSubmit}>
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
          <button className="LoginRegisterBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default LoginDialog;
