
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Redirect() {
  const location = useLocation()
  const data = location.state
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/main', { state: { image: data.img, email: data.email, name: data.name } })
    }, 5000)
  }, [])

  return (
    <>
      <div className="mt-[15px]">
        <img src="https://i.pinimg.com/originals/d8/16/4b/d8164b6fb6eebeabbd54e842971c050f.gif" alt="" className="w-[200px] h-[200px] m-auto" />
        <h1 className="text-3xl text-center font-bold">You have successfully signed in</h1>
        <img src={data.img} className="m-auto rounded-full"></img>
        <p className="text-center text-xl pt-[5px] font-semibold">Welcome {data.name}</p>
        <p className="text-center text-xl pt-[5px] font-semibold">Your email {data.email} is verified</p>
        <p className="text-center text-xl pt-[5px] font-semibold">You will be redirected after 5 sec</p>
      </div>

    </>
  )
}
export default Redirect