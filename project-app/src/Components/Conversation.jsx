import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import UserChat from './UserChat'
import Chatbot from './Chatbot'
import { fetchConversationById } from '../Async Logic/conversationLogic'

function Coversation() {
    const { convoId } = useParams()
    const [messages, setMessages] = useState([])
    const bottomRef = useRef(null)
    useEffect(() => {
        const getConversation = async () => {
            const messages = await fetchConversationById(convoId)
            setMessages(messages)
        }
        getConversation()
    }, [convoId])
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                <Sidebar />
                <Header />
                <ul className="absolute top-[100px] left-[70px] w-[70%] h-[70%] flex flex-col overflow-auto  scroll-auto lg:left-[300px] z-0" id="chatbox">

                    {
                        messages.map((chat) => (
                            <li key={chat._id} className="relative pb-[25px]">
                                <UserChat chat={chat.question}></UserChat>
                                <Chatbot loader={false} answer={chat.answer}></Chatbot>
                            </li>

                        ))
                    }
                    <div ref={bottomRef}></div>
                </ul>
            </div>
        </>
    )
}

export default Coversation