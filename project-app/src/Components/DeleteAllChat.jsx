import { useState } from "react"

export default function DeleteAllChat(props) {
    const [popup, showPopup] = useState(false)
    const deleteAllChat = async () => {
        let headers = {
            "Accept": "*/*"
        }
        let res = await fetch(`http://localhost:9000/quesans/delete/all/${props.userId}`, {
            headers: headers,
            method: 'DELETE'
        })
        let data = await res.text()
        console.log(data)
    }

    return (
        <>
            {
                popup == false ?
                    <div className="ml-[15px] mt-[10px]">
                        <button className="bg-red-100 rounded-lg p-4 flex" onClick={() => { showPopup(true) }}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVR4nOXQMQ4BURSF4T+htYRZBCV7mCinFDWNhD1QsoexD8NCaEmmJDEJzSuU99wbBfMnr3nJO1/yoC0tgBp4pVOnO7nqY8R7qm8DB/6+XeB7thZgFQCWFqAIAIUFGAWAoQXIAkBmATrA0zHeAF2MXRzAGaGTAzgqwN4BlAqwcQBrBZg7gJkCjB1ArgADB9BXgB7wEMbv6Y3UFLgZxq/ARB3/nd5G6fCJTgW3rQAAAABJRU5ErkJggg==" />
                            <h1 className="ml-[5px]">Delete all the data</h1>
                        </button>

                    </div> :
                    <div>
                        <div className="ml-[15px] mt-[10px]">
                            <button className="bg-red-100 rounded-lg p-4 flex">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVR4nOXQMQ4BURSF4T+htYRZBCV7mCinFDWNhD1QsoexD8NCaEmmJDEJzSuU99wbBfMnr3nJO1/yoC0tgBp4pVOnO7nqY8R7qm8DB/6+XeB7thZgFQCWFqAIAIUFGAWAoQXIAkBmATrA0zHeAF2MXRzAGaGTAzgqwN4BlAqwcQBrBZg7gJkCjB1ArgADB9BXgB7wEMbv6Y3UFLgZxq/ARB3/nd5G6fCJTgW3rQAAAABJRU5ErkJggg==" />
                                <h1 className="ml-[5px]">Delete all the data</h1>
                            </button>
                        </div>
                        <div>
                            <div className="fixed w-full h-full z-10 left-0 top-0 bg-[rgba(0,0,0,0.4)]">
                                <div className="m-auto mt-[20px] h-[200px] w-[400px] bg-zinc-200 rounded-lg">
                                    <h1 className="text-3xl text-bold ml-[10px] mt-[10px]">Delete All Chat</h1>
                                    <p className="text-xl ml-[10px] mt-[10px]">Are you sure you want to delete all the chat?</p>
                                    <button className="bg-green-100 mt-[10px] p-2 text-bold text-xl ml-[10px] rounded-lg" onClick={() => { deleteAllChat() }}>Yes</button>
                                    <button className="bg-red-100 rounded-lg text-xl p-2 text-bold ml-[10px]" onClick={() => { showPopup(false) }}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>

            }

        </>
    )
}