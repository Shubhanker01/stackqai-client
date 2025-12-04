import { useEffect, useRef, useState } from "react"
import UserChat from "./UserChat"
import Intro from "./Intro"
import Chatbot from "./Chatbot"
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode"
import Sidebar from "./Sidebar"
import { convertToNewString } from "../Utilities/newstring"
import { v4 as uuidv4 } from 'uuid';
import { streamOutput } from "../Async Logic/fetchStreamOutput"
import { saveChat } from "../Async Logic/saveChat"
import { getHistory } from "../Async Logic/showHistory"
import { fetchConversations } from "../Async Logic/conversationLogic"
import { useConversationStore } from "../store"
import { createConversation } from "../Async Logic/conversationLogic"
import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Main() {
    const [question, setQuestion] = useState("")
    const [formatQues, setFormatQues] = useState("")
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

    const getAPI = async (id) => {
        let data = await streamOutput({ "prompt": formatQues }, (text) => {
            setArr(prevQues => prevQues.map(ques => {
                if (ques.id === id) {
                    return { ...ques, ans: text }
                }
                return ques
            }))
        })
        return data
    }

    const handleChange = (e) => {
        setQuestion(e.target.value)
        let str = convertToNewString(e.target.value)
        if (str.length !== 0) {
            isDisabled(false)
            setFormatQues(str)
        }
        else {
            isDisabled(true)
        }
    }

    const handleClick = async () => {
        try {
            let id = uuidv4()
            // mount chat ui first
            if (!state) {
                setState(true)
                setQuestion("")
                await new Promise(r => setTimeout(r, 0))
            }
            // add user question to chat array
            setArr(prevArr => [...prevArr, { id: id, ques: question, ans: "" }])
            // start streaming answer from api
            let answer = await getAPI(id)
            // save chat to database
            await saveChat(formatQues, answer, cookies.get('token'))
            setFormatQues("")
            // create a new conversation
            let conversation = await createConversation({ conversation_name: formatQues.slice(0, 30), question: formatQues, answer: answer }, cookies.get('token'))
            console.log(conversation)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                <Sidebar />
                <Outlet />
                <div className="">
                    <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[85px] bottom-[15px] z-0 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 text-sm z-0 w-[70%] h-[40px] lg:left-[165px] lg:text-lg lg:w-[80%] lg:h-[55px] lg:p-[4px]" value={question} onChange={handleChange}></input>
                    <button className="fixed right-[9%] bottom-[18px] h-[35px] w-[35px] cursor-pointer z-10 lg:bottom-[25px]" onClick={() => handleClick()} disabled={disabled}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2az0ocQRDGf6eMOSQoGM0tHnPQk97MMSiBhHg0+gwS8S38c1ASCLnmERIX4xtIyDmuq6eoCYp61hgsaShBhpnZ3ZmumR7xgw8Gdre7Pr7u3qrqgXvcXfQBU8Ay0ACawBlwoXTP2/qZ+85boJdAEAGzwCbwH5Au6X6zAczoWKXjIbAAHOYIPo0HwDzQU5aIV8CeRwFx7gKTlgKc9WuGAuL8os57xSDws0QRovwBDPgSMaR2S0VsaQyF8ESPUamYe8DTvCJ6KlpOkrHMch3RnwIIXmL8kOeIlUA50akIZ99OAAFLCnc7/dNc8DDZODAGHBmJed+JGz7SjlEdb9hIzH67jT/raaIjFWEp5l2WkE2PEx0DIzruc+CPZyGNrHoiTypelTOXwOMkIVMG9ls78zpJyIqREEtnlpKENAyFWDnzNUlIy1iIhTPNJCGnJQjx7cxxkpCLkoTEnRkrMM75nRZyWtHS+ut7ae3UcLNvh3D8FnFCso7f5Ro5IcrFKlMUH05IVorSW7Ok8V9a0ujwvSZOCLBOBmZq4IQop7OERNoVD73U/Q08oA3mPUz0wrj5MNdOxI0rIbRJJYWtbjqOkwEELAm8Al7SJT4GELjEuEoORNo4lkC41ckGT0N/QNcKgxTEUEllcBpdVv4MTxioaJlt6WWTyWXoVUkiPlvfvU8YL7VmniM2LyJt7e97TjvmqnoDItKueEN7sd0Gf6lZ7HSRo9U3XG3wRtuY37SePrn1Uo17/qXl6aIWRY+8R3EPwsA1oBk5SAaWVBQAAAAASUVORK5CYII=" />
                    </button>
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
                                <ul className="absolute top-[100px] left-[80px] w-[80%] h-[70%] flex flex-col overflow-auto  scroll-auto lg:left-[180px] z-0" id="chatbox">
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