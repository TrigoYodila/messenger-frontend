import { useEffect, useMemo } from "react";
import Header from "../../Components/Header/Header";
import useEcho from "../../hooks/echo";

const ChatLayout = ({ children }) => {
  const user = useMemo(() => JSON.parse(sessionStorage.getItem("user")), []);
  const echo = useEcho(user);

  useEffect(() => {
    if (echo && user) {
      echo.join('online')
        .here((users) => {
          console.log("here ", users);
        })
        .joining((user) => {
          console.log("joining ", user);
        })
        .leaving((user) => {
          console.log("leaving ", user);
        })
        .error((error) => {
          console.error("error", error);
        });
    }

   
  }, [echo, user]);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ChatLayout;
