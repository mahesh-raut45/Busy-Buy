import { createContext, useContext, useState } from "react";

const UserContext = createContext();

//  Custom hook
function useUser() {
  const user = useContext(UserContext);
  return user;
}

// for logged in user
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };

// export const UseUser = () => useContext(UserContext);
