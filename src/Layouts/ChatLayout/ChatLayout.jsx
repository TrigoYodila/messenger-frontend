import { useMemo } from "react";
import Header from "../../Components/Header/Header";
import { getSessionStorage } from "../../hooks/functions";

// eslint-disable-next-line react/prop-types
const ChatLayout = ({ children }) => {

  const { getUser,logout } = getSessionStorage()
  const user = useMemo(() => getUser(), [])

  return (
    <>
      <Header user={user} logout={logout}/>
      {children}
    </>
  );
};

export default ChatLayout;
