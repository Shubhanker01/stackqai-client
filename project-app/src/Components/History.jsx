import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import UserChat from "./UserChat"
import Chatbot from "./Chatbot"
import Deletechat from "./Deletechat"
import DeleteAllChat from "./DeleteAllChat"

export default function History() {
    const [history, showHistory] = useState([])
    const [userId, getUserId] = useState("")
    const location = useLocation()
    const email = location.state.email

    const getHistory = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "email": email
        })
        let response = await fetch('http://localhost:9000/quesans/history', {
            method: 'POST',
            headers: headersList,
            body: bodyContent
        })
        let data = await response.json()
        showHistory(data)
        if (data.length == 0) {
            getUserId("")
        }
        else {
            getUserId(data[0].user_id)
        }
    }

    useEffect(() => {
        getHistory()
    }, [history])

    return (
        <>
            <div className="h-screen bg-gray-50">
                <h1 className="text-3xl pl-[15px] pt-[10px]">History</h1>

                {
                    history.length == 0 ?
                        <div className="m-auto mt-[10px]">
                            <img src="data:image/png;base64,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" className="m-auto mt-[50px]"></img>
                            <h1 className="text-2xl text-center">Nothing to show in your history</h1>
                        </div> :
                        <div className="">
                            <DeleteAllChat userId={userId} />
                            <ul className="absolute top-[100px] left-[300px] w-[850px] h-[70%] flex flex-col overflow-auto  scroll-auto" id="chatbox">
                                {
                                    history.map((chats) => (
                                        <li key={chats._id} className="relative mb-[25px] bg-gray-200 p-2 rounded-lg">
                                            <h1 className="text-2xl">{chats.date}</h1>
                                            <UserChat chat={chats.question}></UserChat>
                                            <Chatbot loader={false} answer={chats.answer}></Chatbot>
                                            <Deletechat id={chats._id} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                }

            </div>
        </>
    )
}