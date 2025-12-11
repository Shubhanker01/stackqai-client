import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Plus, MessageCircleMore } from "lucide-react"
import { useConversationStore } from "../store"

export default function Sidebar() {
    const [open, setOpen] = useState(true)
    const conversations = useConversationStore((state) => state.conversations)
    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#4b5563" : ""
        }
    }
    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 z-10
            ${open ? "w-60" : "w-24"}`}
        >
            {/* Toggle Button */}
            <div
                className="p-4 cursor-pointer flex items-center space-x-2"
                onClick={() => setOpen(!open)}
            >
                <div className="space-y-1">
                    <div className="h-1 w-6 bg-yellow-400"></div>
                    <div className="h-1 w-6 bg-yellow-400"></div>
                    <div className="h-1 w-6 bg-yellow-400"></div>
                </div>
                {open && <span className="font-semibold text-sm">Menu</span>}
            </div>

            {/* Buttons + Conversation List */}
            <div className="mt-6 px-2">
                {/* New Chat Button */}
                <NavLink
                    to="/main"
                    className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-3 mb-4 transition-all"
                    style={navLinkStyles}
                >
                    <Plus color="#e5e0e0" />
                    {open && <span className="text-sm">New Chat</span>}
                </NavLink>

                {/* Conversations */}
                <div className="mt-4 space-y-2">
                    {
                        conversations.map((conversation) => (
                            <NavLink to={`/conversation/${conversation._id}`} key={conversation._id} className="flex items-center gap-3 hover:bg-gray-700 rounded-lg px-3 py-2 transition-all" style={navLinkStyles}>
                                <MessageCircleMore color="#e5e0e0" />
                                {open && <span>{`${conversation.conversation_name.substring(0, 15)}..`}</span>}
                            </NavLink>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
