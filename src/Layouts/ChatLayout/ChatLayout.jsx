import { useEffect, useMemo, useState } from "react";
import Header from "../../Components/Header/Header";
import useEcho from "../../hooks/echo";
import { getSessionStorage } from "../../hooks/functions";

const ChatLayout = ({ children }) => {

  const { getUser,logout } = getSessionStorage()

  const [onlineUsers, setOnlineUsers] = useState({})
  const [conversations, setConversations] = useState([])
  const [localConversations, setLocalConversations] = useState([])
  const [sortedConversations, setSortedConversations] = useState([])
  const user = useMemo(() => getUser(), [])
  const echo = useEcho(user)

  const isOnline = (userId) => onlineUsers[userId]

  useEffect(()=>{
    setSortedConversations(
      localConversations.sort((a,b) => {
        if(a.blocked_at && b.blocked_at){
          return a.blocked_at > b.blocked_at ? 1 : -1
        }else if(a.blocked_at){
          return 1
        }else if(b.blocked_at){
          return -1
        }
        if(a.last_message_date && b.last_message_date){
          return b.last_message_date.localeCompare(
            a.last_message_date
          ) // trie par ordre decroissant des dates
        }else if(a.last_message_date){
          return -1  // a vient avant b
        }else if(b.last_message_date){
          return 1  // b est placé avant a
        }else{
          return 0
        }
      })
    )
  }, [localConversations])

  useEffect(() => {
    setLocalConversations(conversations)
  },[conversations])

  useEffect(() => {
    if (echo && user) {
      echo.join('online')
        .here((users) => {
          const onlineUserObj = Object.fromEntries(
            users.map((user) => [user.id, user])
          )

          setOnlineUsers((prevOnlineUsers) => {
            return {...prevOnlineUsers, ...onlineUserObj}
          })
        })
        .joining((user) => {
          setOnlineUsers((prevOnlineUsers) => {
            const updatedUsers = {...prevOnlineUsers}
            updatedUsers[user.id] = user
            return updatedUsers
          })
        })
        .leaving((user) => {
          setOnlineUsers((prevOnlineUsers) => {
            const updatedUsers = {...prevOnlineUsers}
            delete updatedUsers[user.id]
            return updatedUsers
          })
        })
        .error((error) => {
          console.error("error", error);
      })

      return () => {
        echo.leave('online')
      }
    }

   
  }, [echo, user]);

  return (
    <div>
      <Header user={user} logout={logout}/>
      {children}
    </div>
  );
};

export default ChatLayout;
