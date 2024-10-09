import { useState } from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
    const [toggle, setToggle] = useState("off")
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
            {
                toggle == "on" ?
                    <div className="fixed top-[0px] left-[0px] w-[150px] cursor-pointer bg-gray-600 h-screen transition-[width] duration-700 z-10 lg:w-[160px]">
                        <div className="relative left-[10px] top-[10px]" onClick={() => changeToggle()}>
                            <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                            <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                            <div className=" w-[25px] h-[5px] bg-yellow-400"></div>

                        </div>
                        {/* <Addchat toggle={toggle}></Addchat>
                            <Settings toggle={toggle}></Settings> */}
                        <div className="mt-[100px] ml-[5px]">
                            <Link to="/history" className="flex">
                                <img width="32" height="32" src="https://img.icons8.com/ios/32/FFFFFF/time-machine--v1.png" alt="time-machine--v1" />
                                <p className="text-slate-100 pt-[3px] pl-[5px]">History</p>
                            </Link>
                        </div>

                    </div> :
                    <div className="fixed top-[0px] left-[0px] w-[60px] cursor-pointer bg-gray-600 h-screen transition-[width] duration-700 z-10 lg:w-[70px]">
                        <div className="relative left-[10px] top-[10px]" onClick={() => changeToggle()}>
                            <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                            <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                            <div className=" w-[25px] h-[5px] bg-yellow-400"></div>
                        </div>
                        {/* <Addchat toggle={toggle}></Addchat>
                            <Settings toggle={toggle}></Settings> */}
                        <div className="mt-[100px] ml-[5px]">
                            <Link to="/history">
                                <img width="32" height="32" src="https://img.icons8.com/ios/32/FFFFFF/time-machine--v1.png" alt="time-machine--v1" />
                            </Link>
                        </div>
                    </div>
            }
        </>
    )
}