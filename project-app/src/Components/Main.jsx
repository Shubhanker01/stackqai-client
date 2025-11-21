import { useEffect, useState } from "react"
import UserChat from "./UserChat"
import Intro from "./Intro"
import Chatbot from "./Chatbot"
import UserProfile from "./UserProfile"
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode"
import Logout from "./Logout"
import Sidebar from "./Sidebar"
import { convertToNewString } from "../Utilities/newstring"
import { v4 as uuidv4 } from 'uuid';
import { streamOutput } from "../Async Logic/fetchStreamOutput"

export default function Main() {
    const [question, setQuestion] = useState("")
    const [formatQues, setFormatQues] = useState("")
    const [answer, setAnswer] = useState("")
    const [arr, setArr] = useState([])
    const [cacheArr, getCacheArr] = useState([])
    const [state, setState] = useState(false)
    const [disabled, isDisabled] = useState(true)
    const cookies = new Cookies()
    const decoded = jwtDecode(cookies.get('token'))

    useEffect(() => {
        const cache = async () => {
            let headersList = {
                "Accept": "*/*"
            }
            let response = await fetch("http://localhost:9000/ques/getcache", {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            return data;
        }
        cache().then((res) => {
            getCacheArr(res)
        })
    }, [])
    const getAPI = async (id) => {
        let data = await streamOutput({ "prompt": formatQues }, setAnswer)
        console.log(data)
        setArr(prevQues => prevQues.map(ques => {
            if (ques.id === id) {
                return { ...ques, ans: data }
            }
            return ques
        }))
        return data
    }

    const saveQues = async (answer) => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "email": decoded.email,
            "question": formatQues,
            "answer": answer
        })
        let response = await fetch("http://localhost:9000/ques", {
            method: 'POST',
            headers: headersList,
            body: bodyContent
        })
        let data = await response.text()
        console.log(data)
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

    const handleClick = () => {
        let id = uuidv4()
        setArr([...arr, { id: id, ques: question, ans: "" }])
        getAPI(id).then(res => saveQues(res)).then(() => {
            console.log("Successfully saved")
        }).catch(err => console.log(err))
        setState(true)
        setQuestion("")
        setFormatQues("")
    }
    console.log(arr)
    return (

        <>
            <div className="w-full bg-gray-50 h-screen">
                <Sidebar />

                <div className="">
                    <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[85px] bottom-[15px] z-0 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 text-sm z-0 w-[70%] h-[40px] lg:left-[165px] lg:text-lg lg:w-[80%] lg:h-[55px] lg:p-[4px]" value={question} onChange={handleChange}></input>
                    <button className="fixed right-[9%] bottom-[18px] h-[35px] w-[35px] cursor-pointer z-10 lg:bottom-[25px]" onClick={() => handleClick()} disabled={disabled}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2az0ocQRDGf6eMOSQoGM0tHnPQk97MMSiBhHg0+gwS8S38c1ASCLnmERIX4xtIyDmuq6eoCYp61hgsaShBhpnZ3ZmumR7xgw8Gdre7Pr7u3qrqgXvcXfQBU8Ay0ACawBlwoXTP2/qZ+85boJdAEAGzwCbwH5Au6X6zAczoWKXjIbAAHOYIPo0HwDzQU5aIV8CeRwFx7gKTlgKc9WuGAuL8os57xSDws0QRovwBDPgSMaR2S0VsaQyF8ESPUamYe8DTvCJ6KlpOkrHMch3RnwIIXmL8kOeIlUA50akIZ99OAAFLCnc7/dNc8DDZODAGHBmJed+JGz7SjlEdb9hIzH67jT/raaIjFWEp5l2WkE2PEx0DIzruc+CPZyGNrHoiTypelTOXwOMkIVMG9ls78zpJyIqREEtnlpKENAyFWDnzNUlIy1iIhTPNJCGnJQjx7cxxkpCLkoTEnRkrMM75nRZyWtHS+ut7ae3UcLNvh3D8FnFCso7f5Ro5IcrFKlMUH05IVorSW7Ok8V9a0ujwvSZOCLBOBmZq4IQop7OERNoVD73U/Q08oA3mPUz0wrj5MNdOxI0rIbRJJYWtbjqOkwEELAm8Al7SJT4GELjEuEoORNo4lkC41ckGT0N/QNcKgxTEUEllcBpdVv4MTxioaJlt6WWTyWXoVUkiPlvfvU8YL7VmniM2LyJt7e97TjvmqnoDItKueEN7sd0Gf6lZ7HSRo9U3XG3wRtuY37SePrn1Uo17/qXl6aIWRY+8R3EPwsA1oBk5SAaWVBQAAAAASUVORK5CYII=" />
                    </button>
                </div>


                <div className="grid grid-cols-2 fixed w-full top-[5px]">

                    <div className="flex">
                        <h1 className="font-bold text-md text-[#222426] ml-[80px]  mt-[20px] lg:text-2xl lg:ml-[165px]">StackQ AI</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" className="mt-[20px] ml-2">
                            <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                        </svg>
                    </div>
                    <div className="flex justify-self-end mt-[18px] mr-[20px]">
                        <div className="mr-[20px]">
                            <UserProfile name={decoded.name} email={decoded.email} />
                        </div>
                        <Logout />
                    </div>

                </div>

                <div className="">
                    {
                        (state == false && cacheArr.length === 0) ?
                            <div className="transition duration-300 ease-in-out">
                                <Intro></Intro>
                            </div>
                            :
                            <div className="">
                                <ul className="absolute top-[100px] left-[80px] w-[80%] h-[70%] flex flex-col overflow-auto  scroll-auto lg:left-[180px] z-0" id="chatbox">
                                    {/* {
                                        cacheArr.map((obj) => {
                                            return <li key={obj.id}>
                                                <UserChat chat={obj.question}></UserChat>
                                                <Chatbot loader={false} answer={obj.answer}></Chatbot>
                                            </li>
                                        })
                                    } */}
                                    {
                                        arr.map((ques) => (
                                            <li key={ques.id} className="relative mb-[25px]">
                                                <UserChat chat={ques.ques}></UserChat>
                                                <Chatbot loader={true} answer={ques.ans}></Chatbot>
                                            </li>

                                        ))
                                    }
                                </ul>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}