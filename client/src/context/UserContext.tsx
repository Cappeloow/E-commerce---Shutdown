import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserContext {
  loginUser: User | null;
  fetchLoginUser: (user: Credentials) => Promise<string | void>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContext>({
  loginUser: null,
  fetchLoginUser: async () => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
});

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren<object>) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

  async function fetchLoginUser(user: Credentials): Promise<void> {
    console.log(user);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoginUser(data);
      }
      if (response.status === 401) {
        if (data.error === "User doesn't exist") {
          console.log("User doesn't exist");
        }
        if (data.error === "Wrong Password") {
          console.log("Wrong Password");
        }
        console.log("Authentication failed: Invalid username or password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    console.log("he4j");
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      console.log(response);
      if (response.status === 200) {
        setLoginUser(null);
        console.log(loginUser);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function authorizeUser() {
      try {
        if (loginUser) {
          console.log("is logged in");
          console.log(loginUser);
        } else {
          const response = await fetch("/api/user/authorize");
          if (response.status === 200) {
            const data = await response.json();
            setLoginUser(data);
          } else if (response.status === 401) {
            setLoginUser(null);
          } else {
            console.log("Unexpected response from server");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    authorizeUser();
  }, [loginUser]);

  return (
    <>
      <UserContext.Provider
        value={{
          logoutUser,
          loginUser,
          fetchLoginUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
