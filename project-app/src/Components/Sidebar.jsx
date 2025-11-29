import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, MessageCircleMore } from "lucide-react"

export default function Sidebar() {
    const [open, setOpen] = useState(true)

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
                <Link
                    to="/main"
                    className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-3 mb-4 transition-all"
                >
                    <Plus color="#e5e0e0" />
                    {open && <span className="text-sm">New Chat</span>}
                </Link>

                {/* Conversations */}
                <div className="mt-4 space-y-2">
                    {/* Example conversation */}
                    <Link
                        to="/main/conversation/12345"
                        className="flex items-center gap-3 hover:bg-gray-700 rounded-lg px-3 py-2 transition-all"
                    >
                        <MessageCircleMore color="#e5e0e0" />
                        {open && <span>Convo 1</span>}
                    </Link>
                </div>
            </div>
        </div>
    )
}
