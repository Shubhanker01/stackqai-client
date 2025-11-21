import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' })

  const loginApi = async () => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "email": email,
      "password": password
    });

    let response = await fetch("http://localhost:9000/api/v1/user/login", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    return data
  }

  const login = () => {
    if (email != "" && password != "") {
      loginApi().then((res) => {
        if (res.message == "Invalid email") {
          toast.error("Email does not exists", { position: 'top-center' })
        }
        else if (res.message == "Error") {
          toast.error("Password does not match", { position: 'top-center' })
        }
        else {
          toast.success("You have successfully logged in", { position: 'top-center' })
          cookies.set('token', res.token)
          navigate('/main')
          // refresh the page to set the token
          navigate(0)
        }
      })
    }
    else {
      toast.error("Please enter all the fields", { position: 'top-center' })
    }

  }
  return (
    <>
      <ToastContainer />
      <div className="bg-[#E8F1F8] h-full absolute w-full">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className="m-auto mt-2">
            <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
          </svg>
        </Link>

        <div className="w-full max-w-xs m-auto mt-[140px]">
          <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[256px]" type="button" onClick={login}>
              Log In
            </button>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a> */}
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 StackQ AI. All rights reserved.
          </p>
        </div>
      </div>

    </>
  )
}