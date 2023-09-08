import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import "./styles/ModuleDialog.css";
type Props = {
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserProfileModule = ({ setUserProfile }: Props) => {
  const { loginUser } = useUserContext();
  useEffect(() => {
    if (loginUser) {
      console.log(loginUser);
    }
  });
  return (
    <dialog className="UserProfileDialogBox" open>
      {loginUser ? (
        <>
          <p onClick={() => setUserProfile(false)}>x</p>
          <h1>{loginUser.firstName}</h1>
          <p>{loginUser.email}</p>
          <button>Logout</button>
        </>
      ) : null}
    </dialog>
  );
};

export default UserProfileModule;
