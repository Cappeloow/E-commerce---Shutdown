import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import "./styles/ModuleDialog.css";
type Props = {
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserProfileModule = ({ setUserProfile }: Props) => {
  const { loginUser, logoutUser } = useUserContext();
  useEffect(() => {
    if (loginUser) {
      console.log(loginUser.user);
    }
  });

  const handleClick = () => {
    console.log("clicker");
    logoutUser();
  };

  return loginUser ? (
    <>
      <dialog className="UserProfileDialogBox" open>
        <p onClick={() => setUserProfile(false)}>x</p>
        <h1>{loginUser.user.name}</h1>
        <p>{loginUser.user.email}</p>
        <button onClick={handleClick}>Logout</button>
      </dialog>
    </>
  ) : null;
};

export default UserProfileModule;
