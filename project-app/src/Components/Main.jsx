import { useState } from "react"
import Settings from "./Settings"
import UserChat from "./UserChat"
import Intro from "./Intro"
import Chatbot from "./Chatbot"
import UserProfile from "./UserProfile"
import { Link, useLocation } from "react-router-dom"

let id = 0

export default function Main() {
    const location = useLocation()
    const data = location.state
    const [toggle, setToggle] = useState("off")
    const [press, setPress] = useState("")
    const [question, setQuestion] = useState("")
    const [arr, setArr] = useState([])
    const [state, setState] = useState(false)
    // const [ans, setAns] = useState("")
    const email = data.email


    const getAPI = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "ques": question
        });

        let response = await fetch("http://127.0.0.1:5000/question", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.text();
        let bodyContent1 = JSON.stringify({
            "email": email,
            "question": question,
            "answer": data,
            "date": Date
        })
        let data2 = await fetch('http://localhost:9000/quesans', {
            method: 'POST',
            body: bodyContent1,
            headers: headersList
        })
        let res = await data2.text()
        console.log(res)
        setArr([...arr, { id: id++, ques: question, ans: data }])
    }


    const handleChange = (e) => {
        setQuestion(e.target.value)
        setPress(e.target.value)
    }

    const handleClick = () => {
        setArr([...arr, { id: id++, ques: question, ans: "" }])
        getAPI()
        setState(true)
        setQuestion("")
        // var ele = document.getElementById('chatbox')
        // ele.scrollTop = ele.scrollHeight
    }

    const changeToggle = () => {
        if (toggle == "off") {
            setToggle("on")
        }
        else {
            setToggle("off")
        }
    }

    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                {
                    toggle == "on" ?
                        <div className="fixed top-[0px] left-[0px] w-[200px] bg-gray-800 h-screen transition-[width] duration-700 z-30">
                            <div className="relative left-[15px] top-[15px] cursor-pointer" onClick={() => changeToggle()}>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-slate-100"></div>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-slate-100"></div>
                                <div className=" w-[25px] h-[5px] bg-slate-100"></div>

                            </div>
                            <div className="relative top-[115px] left-[10px] h-[80px]">
                                <Link to='/history' state={{ email: data.email }}>
                                    <div className="flex">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVR4nO1ayY4cRRBNMItB2Aaxn0A2PvED7KuxOGEQi4yAyxi42HDhYI4cDHwDi0AGBqTBY0CsHsC2ABmEudgy9pg5jDQHJDRNd2ZV5RLFIdDLzhoX9PSe3V0WPKk0rcmqyHodkZERL1uI/wKUdu8rQ/vF2Q6laQFXL/fW6/UNMrVbEuNeVCZ/U2n6Wpn8F6nplNR0Ep8b2s0pk7+Be2Rq72PmDZUgwswXKO0ekNq9lRiaL+7v9ZKaTkvt9ja0e2hxkdeOnchvzBeqjKakdj+UXupXpd17Uue78G1LyxvhJWY+D5f3mLWb/JjOd0qdv6O0O7HyvKEfE0vPLC0tXTQWIvXE3Kk0fVMi8GlqaDtetF/7fzBfkmj3sMxoX8lThxGiIyPivaDppdI3+HkjtXcx8zlR5jLmZpnRbGG/oenVaN5Z+ZaUulyZfLYIocTS08y8RkQGM58rDT0utTu24m3mq4Y2XHK3DyWp3cE0pRvFiCEtb4THw5yHG9ZeP5TBf2QYQ5+lKV89qI1+n2Pmi5HRgme+z7Ls2n5ttLxE9yv/IDYRACnZb8ohzAZO0b0SaWg3EiJArVZbLzV9Eey8LCaFYYkAfv/R7jjspPave8TZSgSQhp4Ii/9QTyGGDe/3JLlSVIzIzAyvQQHrQzmjHd0XV+aOKpMfz7LsGlEhIkBi8lu9VzJ3BBu0aAdp6DE/saEPRSTEJAIUu3+i3TbRDlK7d7veNGkihh4Na+XtTmkOvcOp5WVeV1Uiy8u8zpdJhubxzi03SGvv996w+V4REbGJAGgXvFdWq5KVcS80J3XPi4oTkTrf5b90k+9unbDZni7IzG6tPJHMbg3r5PXWCQ3N+UFrN1WeiLU3hNJornXQ0E/eXUlyRawJ/1TmloIIPseyK5kv83Yz93ProO+5aQGCQrQJtTtYKi6/jWWXvejRbPJWmZROBiLnx5gMZQ5Seam3/06Mg4hCaYK4Y740Bgml3YEw2TxI1I25Q4wjtBQEtQiLvUwCf2MWoAWUc5vbLnYogH7Q2nvFgECiKJogTBJFOOicfl9rGfRSpx/Md4qKeqKA1PlzoQre3ZblICXKuDxRQGk33TZ6ICg39Vt3AgqgqKAnSsVt+6IRKOSXRLtHRI9QGT01LhLlngnCuWgHqOLN2KN9og8oQ0+OgwRQKJ4deya0j2gjg1Z1k6gYEpPf3iRBR7oKEInOnw3t7n5osaIiYOjChcid0VTXB6CAQ9r3GpKh7aIiUGEton7rWXFE5xUeOgZBWUwYCju5yQuB7u6+Hsb5RHEOErOH7xe1Wm290vRlKD739G0AIQbhOKTW6ZGe8bXB4iKvha4cMuknA78DdmicTxRaV4zKuD9PuKDEu0MJ83DpHYcsBRmUIbFb4Q6t7FcFibox10Ux3PRMM8ygikNQHkVqnoG+i+wUFjbCaWhPrH7oQq+stK6GPoIWG8t+YvLbpKGPS63xnpGuS5xPwN1nCOWzkDEHyWy+AETtFMoOVZxT9ptih8omGe04U8786wcDaAmc24zkAA0AFz7jfxhrCmxuuhA8CoVdZTQ1iezoa7OGdg9CUB7kJxx4xv/8Q7ttHY8JxgkfJqndgq4NCqDvUTJ3FOqMV2i8uOEOYAz3oCma5Eb7P8SI8TdKD0IBNSfnegAAAABJRU5ErkJggg==" className="h-[35px] w-[35px]" />
                                        <p className="text-slate-50 pl-[15px] pt-[5px]">History</p>
                                    </div>
                                </Link>
                            </div>

                            <Settings toggle={toggle}></Settings>
                        </div> :
                        <div className="fixed top-[0px] left-[0px] w-[65px]  bg-gray-800 h-screen transition-[width] duration-700 z-30">
                            <div className="relative left-[15px] top-[15px] cursor-pointer" onClick={() => changeToggle()}>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-slate-100"></div>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-slate-100"></div>
                                <div className=" w-[25px] h-[5px] bg-slate-100"></div>
                            </div>
                            <div className="relative top-[115px] left-[10px] h-[80px]">
                                <Link to='/history' state={{ email: data.email }}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVR4nO1ayY4cRRBNMItB2Aaxn0A2PvED7KuxOGEQi4yAyxi42HDhYI4cDHwDi0AGBqTBY0CsHsC2ABmEudgy9pg5jDQHJDRNd2ZV5RLFIdDLzhoX9PSe3V0WPKk0rcmqyHodkZERL1uI/wKUdu8rQ/vF2Q6laQFXL/fW6/UNMrVbEuNeVCZ/U2n6Wpn8F6nplNR0Ep8b2s0pk7+Be2Rq72PmDZUgwswXKO0ekNq9lRiaL+7v9ZKaTkvt9ja0e2hxkdeOnchvzBeqjKakdj+UXupXpd17Uue78G1LyxvhJWY+D5f3mLWb/JjOd0qdv6O0O7HyvKEfE0vPLC0tXTQWIvXE3Kk0fVMi8GlqaDtetF/7fzBfkmj3sMxoX8lThxGiIyPivaDppdI3+HkjtXcx8zlR5jLmZpnRbGG/oenVaN5Z+ZaUulyZfLYIocTS08y8RkQGM58rDT0utTu24m3mq4Y2XHK3DyWp3cE0pRvFiCEtb4THw5yHG9ZeP5TBf2QYQ5+lKV89qI1+n2Pmi5HRgme+z7Ls2n5ttLxE9yv/IDYRACnZb8ohzAZO0b0SaWg3EiJArVZbLzV9Eey8LCaFYYkAfv/R7jjspPave8TZSgSQhp4Ii/9QTyGGDe/3JLlSVIzIzAyvQQHrQzmjHd0XV+aOKpMfz7LsGlEhIkBi8lu9VzJ3BBu0aAdp6DE/saEPRSTEJAIUu3+i3TbRDlK7d7veNGkihh4Na+XtTmkOvcOp5WVeV1Uiy8u8zpdJhubxzi03SGvv996w+V4REbGJAGgXvFdWq5KVcS80J3XPi4oTkTrf5b90k+9unbDZni7IzG6tPJHMbg3r5PXWCQ3N+UFrN1WeiLU3hNJornXQ0E/eXUlyRawJ/1TmloIIPseyK5kv83Yz93ProO+5aQGCQrQJtTtYKi6/jWWXvejRbPJWmZROBiLnx5gMZQ5Seam3/06Mg4hCaYK4Y740Bgml3YEw2TxI1I25Q4wjtBQEtQiLvUwCf2MWoAWUc5vbLnYogH7Q2nvFgECiKJogTBJFOOicfl9rGfRSpx/Md4qKeqKA1PlzoQre3ZblICXKuDxRQGk33TZ6ICg39Vt3AgqgqKAnSsVt+6IRKOSXRLtHRI9QGT01LhLlngnCuWgHqOLN2KN9og8oQ0+OgwRQKJ4deya0j2gjg1Z1k6gYEpPf3iRBR7oKEInOnw3t7n5osaIiYOjChcid0VTXB6CAQ9r3GpKh7aIiUGEton7rWXFE5xUeOgZBWUwYCju5yQuB7u6+Hsb5RHEOErOH7xe1Wm290vRlKD739G0AIQbhOKTW6ZGe8bXB4iKvha4cMuknA78DdmicTxRaV4zKuD9PuKDEu0MJ83DpHYcsBRmUIbFb4Q6t7FcFibox10Ux3PRMM8ygikNQHkVqnoG+i+wUFjbCaWhPrH7oQq+stK6GPoIWG8t+YvLbpKGPS63xnpGuS5xPwN1nCOWzkDEHyWy+AETtFMoOVZxT9ptih8omGe04U8786wcDaAmc24zkAA0AFz7jfxhrCmxuuhA8CoVdZTQ1iezoa7OGdg9CUB7kJxx4xv/8Q7ttHY8JxgkfJqndgq4NCqDvUTJ3FOqMV2i8uOEOYAz3oCma5Eb7P8SI8TdKD0IBNSfnegAAAABJRU5ErkJggg==" className="h-[35px] w-[35px]" />
                                </Link>
                            </div>
                            <Settings toggle={toggle}></Settings>
                        </div>
                }


                {
                    press == "" ?
                        <div className="">
                            <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[205px] bottom-[15px] z-10 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 w-4/5 h-[50px]" value={question} onChange={handleChange}></input>
                        </div> :
                        <div className="">
                            <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[205px] bottom-[15px] z-10 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 z-10 w-4/5 h-[50px]" value={question} onChange={handleChange}></input>
                            <button className="fixed right-[80px] bottom-[25px] h-[35px] w-[35px] cursor-pointer z-10" onClick={() => handleClick()}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2az0ocQRDGf6eMOSQoGM0tHnPQk97MMSiBhHg0+gwS8S38c1ASCLnmERIX4xtIyDmuq6eoCYp61hgsaShBhpnZ3ZmumR7xgw8Gdre7Pr7u3qrqgXvcXfQBU8Ay0ACawBlwoXTP2/qZ+85boJdAEAGzwCbwH5Au6X6zAczoWKXjIbAAHOYIPo0HwDzQU5aIV8CeRwFx7gKTlgKc9WuGAuL8os57xSDws0QRovwBDPgSMaR2S0VsaQyF8ESPUamYe8DTvCJ6KlpOkrHMch3RnwIIXmL8kOeIlUA50akIZ99OAAFLCnc7/dNc8DDZODAGHBmJed+JGz7SjlEdb9hIzH67jT/raaIjFWEp5l2WkE2PEx0DIzruc+CPZyGNrHoiTypelTOXwOMkIVMG9ls78zpJyIqREEtnlpKENAyFWDnzNUlIy1iIhTPNJCGnJQjx7cxxkpCLkoTEnRkrMM75nRZyWtHS+ut7ae3UcLNvh3D8FnFCso7f5Ro5IcrFKlMUH05IVorSW7Ok8V9a0ujwvSZOCLBOBmZq4IQop7OERNoVD73U/Q08oA3mPUz0wrj5MNdOxI0rIbRJJYWtbjqOkwEELAm8Al7SJT4GELjEuEoORNo4lkC41ckGT0N/QNcKgxTEUEllcBpdVv4MTxioaJlt6WWTyWXoVUkiPlvfvU8YL7VmniM2LyJt7e97TjvmqnoDItKueEN7sd0Gf6lZ7HSRo9U3XG3wRtuY37SePrn1Uo17/qXl6aIWRY+8R3EPwsA1oBk5SAaWVBQAAAAASUVORK5CYII=" />
                            </button>
                        </div>
                }

                <div className="grid grid-cols-2 fixed w-full top-[5px] z-20">

                    <div className="flex">
                        <h1 className="font-bold text-3xl text-[#222426] ml-[220px]  mt-[20px]">StackQ AI</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" className="mt-[20px] ml-2">
                            <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                        </svg>
                    </div>
                    <div className="justify-self-end mt-[20px] mr-[20px]">
                        <UserProfile image={data.image} name={data.name} email={data.email} />
                    </div>
                </div>

                <div className="">
                    {
                        state == false ?
                            <div className="transition duration-300 ease-in-out">
                                <Intro></Intro>
                            </div>
                            :
                            <div className="">
                                <ul className="absolute top-[100px] left-[300px] w-[850px] h-[70%] flex flex-col overflow-auto  scroll-auto" id="chatbox">
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