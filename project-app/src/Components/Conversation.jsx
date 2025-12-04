import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Coversation() {
    const { convoId } = useParams()
    console.log(convoId)
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                <Sidebar />
                <Header />
                <h1>Hello World</h1>
            </div>
        </>
    )
}

export default Coversation