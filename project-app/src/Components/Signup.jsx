
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "universal-cookie"

export default function Signup() {
    const navigate = useNavigate()
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confPassword, setconfPassword] = useState("")
    const cookies = new Cookies(null, { path: '/main' })

    const signupApi = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "name": name,
            "email": email,
            "password": password
        });

        let response = await fetch("http://localhost:9000/user/signup", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        return data
    }

    const signup = async () => {
        if (name != "" && email != "" && password != "" && confPassword != "") {
            if (password == confPassword) {
                signupApi().then((res) => {
                    if (res.message == "Success") {
                        toast.success("You have successfully signed in", { position: 'top-center' })
                        cookies.set('token', res.token)
                        navigate('/main')
                    }
                    else {
                        toast.error("This email already exists", { position: 'top-center' })
                    }
                }).catch(err => console.log(err))
            }
            else {
                toast.error("Please enter correct password", { position: 'top-center' })
            }
        }
        else {
            toast.error("Please enter all the fields", { position: 'top-center' })
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="bg-[#f1f2f3] h-full absolute w-full">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className="m-auto mt-2">
                        <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                    </svg>
                </Link>

                <div className="w-full max-w-xs m-auto mt-[50px]">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />

                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="conf-password">
                                Confirm Password
                            </label>
                            <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="conf-password" type="password" placeholder="" value={confPassword} onChange={e => setconfPassword(e.target.value)} />

                        </div>
                        <div className="w-[256px]">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto w-full" type="button" onClick={signup}>
                                Sign Up
                            </button>

                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2024 StackQ AI. All rights reserved.
                    </p>
                </div>
            </div>

        </>
    )
}