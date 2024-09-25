import { useState } from "react"

export default function Deletechat(props) {
    const [popup, showPopup] = useState(false)

    const deleteChat = async () => {
        let header = {
            'Accept': '*/*'
        }
        let response = await fetch(`http://localhost:9000/quesans/delete/${props.id}`, {
            method: 'DELETE',
            headers: header
        })
        let data = await response.text()
        console.log(data)
        alert("Successfully deleted")
    }

    return (
        <>
            {
                popup == false ?
                    <div className="float-right mr-[10px] mt-[10px]">
                        <button onClick={() => { showPopup(true) }}>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO3VwQnCMBjF8Qe6hnYRO4FSPNcJ9FxBF9AJdAKdQCcwE9gJdAOPFaFKoFfBvPdJEPuH3JLvR3IJ0PZ5YwAZInQHUH1reNYMfwauin0NR2DvlosFn5ib/1c3g2f2M4IrDeAzAx8N4AMDbw3gDQMvDeAFA08M4JyBUwN4wMB9A7jHwB0ADwH1Z7sguwrwBUIu1uewF+CdAq8FeKXAMwGeKvBIgIcKnACoCbRuzkrNA/9mv7dQ0bbf7wXRGEWDOGx/GAAAAABJRU5ErkJggg==" />
                        </button>
                    </div> :
                    <div>
                        <div className="float-right mr-[10px] mt-[10px]">
                            <button onClick={() => { showPopup(true) }}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO3VwQnCMBjF8Qe6hnYRO4FSPNcJ9FxBF9AJdAKdQCcwE9gJdAOPFaFKoFfBvPdJEPuH3JLvR3IJ0PZ5YwAZInQHUH1reNYMfwauin0NR2DvlosFn5ib/1c3g2f2M4IrDeAzAx8N4AMDbw3gDQMvDeAFA08M4JyBUwN4wMB9A7jHwB0ADwH1Z7sguwrwBUIu1uewF+CdAq8FeKXAMwGeKvBIgIcKnACoCbRuzkrNA/9mv7dQ0bbf7wXRGEWDOGx/GAAAAABJRU5ErkJggg==" />
                            </button>
                        </div>
                        <div className="fixed w-full h-full z-10 left-0 top-[0px] bg-[rgba(0,0,0,0.4)]">
                            <div className="m-auto mt-[225px] h-[150px] w-[400px] bg-slate-200 rounded-lg">
                                <h1 className="text-3xl text-bold ml-[15px] mt-[15px]">Delete Chat</h1>
                                <p className="text-xl ml-[15px] mt-[15px]">Are you sure you want to delete this chat?</p>
                                <button className="bg-sky-700 mt-[15px] p-2 font-bold text-lg ml-[15px] rounded-lg text-slate-100" onClick={()=>{deleteChat()}}>Yes</button>
                                <button className="bg-red-700 rounded-lg text-lg p-2 font-bold ml-[15px] text-slate-100" onClick={()=>{showPopup(false)}}>No</button>
                            </div>
                        </div>

                    </div>

            }

        </>
    )
}