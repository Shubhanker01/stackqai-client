import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function RedirectLogout() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])
    return (
        <>
            <div className="h-screen bg-gray-50">
                <img src="https://cdn-icons-png.flaticon.com/512/7090/7090891.png" className="h-[250px] w-[250px] m-auto pt-[20px]"></img>
                <p className="text-center text-2xl">Logging out...</p>
                <p className="text-center mt-[5px]">Redirecting in 5 secs</p>
            </div>
        </>
    )
}