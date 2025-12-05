import React, { useState } from 'react'
import { SendHorizontal } from 'lucide-react'

function Input({ onSend, disabled, isDisabled }) {
    const [question, setQuestion] = useState("")
    const handleChange = (e) => {
        setQuestion(e.target.value)
        if (question.trim().length !== 0) {
            isDisabled(false)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!question.trim()) return;
        onSend(question)
        setQuestion("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="search" placeholder="Enter your question here..." className="fixed left-[85px] bottom-[15px] z-0 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 text-sm z-0 w-[70%] h-[40px] lg:left-[300px] lg:text-lg lg:w-[70%] lg:h-[55px] lg:p-[4px]" value={question} onChange={handleChange}></input>
                <button className="fixed right-[9%] bottom-[18px] h-[35px] w-[35px] cursor-pointer z-10 lg:bottom-[25px]" disabled={disabled}>
                    <SendHorizontal />
                </button>
            </form>

        </div>
    )
}

export default Input