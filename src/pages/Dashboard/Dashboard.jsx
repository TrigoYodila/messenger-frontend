/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react"
import { getSessionStorage } from "../../hooks/functions"
import useEcho from "../../hooks/echo"
import { axios, baseURL } from "../../config/axios"
import TextInput from "../../Components/TextInput/TextInput"
import ConversationItem from "../../Components/ConversationItem/ConversationItem"

const Dashboard = () => {

  const { getUser } = getSessionStorage()

  const [onlineUsers, setOnlineUsers] = useState({})
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [localConversations, setLocalConversations] = useState([])
  const [sortedConversations, setSortedConversations] = useState([])
  const user = useMemo(() => getUser(), [])
  const echo = useEcho(user)

  const isUserOnline = (userId) => onlineUsers[userId]
  console.log("Conversations", conversations)

  const onSearch = (ev) => {
    const search = ev.target.value.toLowerCase()

    setLocalConversations(
      conversations.filter((conversation) => {
        return conversation.name.toLowerCase().includes(search)
      })
    )
  }

  useEffect(()=>{
    // tri de conversations
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

  useEffect(()=>{
    const getConversations = async () => {
      setLoading(true)
      const res = await axios.get(`${baseURL}/api/messanger/conversations/${user.id}`)
      setConversations(res.data.conversations)
      setLoading(false)
    }
    getConversations()
  }, [user])

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

   
  }, [echo, user])

  return (
    <div className="flex-1 w-full flex overflow-hidden">
       <div className={`p-4 transition-all w-full sm:w-[250px] md:w-[370px] bg-slate-800 flex flex-col gap-2 overflow-hidden ${selectedConversation ? '-ml-[100%] sm:ml-0' : ''}`}>
          <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
            My Conversations
            <div className="tooltip tooltip-left" data-tip="Create nez Group">
              <button className="text-gray-400 hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <TextInput
              onKeyUp={onSearch}
              placeholder="Filter users and groups"
            />
          </div>
          <div className="flex-1 overflow-auto">
            {
              sortedConversations && sortedConversations.map((conversation) => (
                <ConversationItem
                  key={`${
                    conversation.is_group ? "group_" : "user_"
                  }${conversation.id}`}
                  online={!!isUserOnline(conversation.id)}
                  selectedConversation={selectedConversation}
                  conversation={conversation}
                  currentUser={user}
                />
              ))
            }
          </div>
       </div>

       <div className="flex-1 flex flex-col overflow-hidden">

       </div>
    </div>
  )
}

export default Dashboard