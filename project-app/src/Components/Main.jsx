import { useEffect, useRef, useState } from "react"
import UserChat from "./UserChat"
import Intro from "./Intro"
import Chatbot from "./Chatbot"
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode"
import Sidebar from "./Sidebar"
import { v4 as uuidv4 } from 'uuid';
import { streamOutput } from "../Async Logic/fetchStreamOutput"
import { saveChat } from "../Async Logic/saveChat"
import { getHistory } from "../Async Logic/showHistory"
import { fetchConversations } from "../Async Logic/conversationLogic"
import { useConversationStore } from "../store"
import { createConversation } from "../Async Logic/conversationLogic"
import Header from "./Header"
import Input from "./Input"

export default function Main() {
    const [arr, setArr] = useState([])
    const [cacheArr, getCacheArr] = useState([])
    const [state, setState] = useState(false)
    const [disabled, isDisabled] = useState(true)
    const cookies = new Cookies()
    const decoded = jwtDecode(cookies.get('token'))
    const bottomRef = useRef(null)

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getHistory(cookies.get('token'))
            console.log(data)
            getCacheArr(data)
        }
        const getConvos = async () => {
            const convos = await fetchConversations(cookies.get('token'))
            console.log(convos)
            useConversationStore.getState().setConversations(convos)
        }
        getConvos()
        fetchHistory()
    }, [])

    useEffect(() => {
        // scroll to bottom on new message
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [arr])

    const getAPI = async (id, question) => {
        let data = await streamOutput({ "prompt": question }, (text) => {
            setArr(prevQues => prevQues.map(ques => {
                if (ques.id === id) {
                    return { ...ques, ans: text }
                }
                return ques
            }))
        })
        return data
    }

    const handleSend = async (question) => {
        try {
            let id = uuidv4()
            // mount chat ui first
            if (!state) {
                setState(true)
                await new Promise(r => setTimeout(r, 0))
            }
            // add user question to chat array
            setArr(prevArr => [...prevArr, { id: id, ques: question, ans: "" }])
            // start streaming answer from api
            let answer = await getAPI(id, question)
            // save chat to database
            await saveChat(question, answer, cookies.get('token'))
            setFormatQues("")
            // create a new conversation
            let conversation = await createConversation({ conversation_name: question.slice(0, 30), question: question, answer: answer }, cookies.get('token'))
            console.log(conversation)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                <Sidebar />
                <div className="">
                    <Input onSend={handleSend} disabled={disabled} isDisabled={isDisabled} />
                </div>
                <Header />
                <div className="">
                    {
                        (state == false && cacheArr.length === 0) ?
                            <div className="transition duration-300 ease-in-out">
                                <Intro></Intro>

                            </div>
                            :
                            <div className="">
                                <ul className="absolute top-[100px] left-[70px] w-[70%] h-[70%] flex flex-col overflow-auto  scroll-auto lg:left-[300px] z-0" id="chatbox">
                                    {
                                        cacheArr.map((obj) => (
                                            <li key={obj._id} className="pb-[25px]">
                                                <UserChat chat={obj.question}></UserChat>
                                                <Chatbot loader={false} answer={obj.answer}></Chatbot>
                                            </li>
                                        ))
                                    }
                                    {
                                        arr.map((ques) => (
                                            <li key={ques.id} className="relative pb-[25px]">
                                                <UserChat chat={ques.ques}></UserChat>
                                                <Chatbot loader={true} answer={ques.ans}></Chatbot>
                                            </li>

                                        ))
                                    }
                                    <div ref={bottomRef}></div>
                                </ul>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}