import UserAvatar from "../ConversationItem/UserAvatar"
import GroupAvatar from "../ConversationItem/GroupAvatar"
import { Link } from "react-router-dom"

const ConversationHeader = ({selectedConversation}) => {
  return (
    <>
        {selectedConversation && (
            <div className="p-3 flex justify-between items-center border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <Link to='dashboard' className="inline-block sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    {selectedConversation?.is_user && (
                        <UserAvatar user={selectedConversation}/>
                    )}
                    {selectedConversation?.is_group && (
                         <GroupAvatar />
                    )}
                    <div>
                        <h3>{selectedConversation?.name}</h3>
                        {selectedConversation?.is_group && (
                            <p className="text-xs text-gray-500">
                                {selectedConversation?.users?.length} members
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default ConversationHeader