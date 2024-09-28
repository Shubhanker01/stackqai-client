
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from 'jwt-decode'


export default function Signup() {
    const navigate = useNavigate()
    const resposeMessage = async (response) => {
        const token = response.credential
        const decoded = jwtDecode(token)
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "name": `${decoded.given_name} ${decoded.family_name}`,
            "email": decoded.email,
            "is_verified": decoded.email_verified
        });

        await fetch("http://localhost:9000/user", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        }).then(res => {
            navigate('/redirect', { state: { name: `${decoded.given_name} ${decoded.family_name}`, email: decoded.email, img: decoded.picture } })
        }).catch(err => {
            console.log(err)
        })

    }
    const errMessage = (err) => {
        console.log(err)
    }

    return (
        <>
            <div className="bg-[#f1f2f3] h-full absolute w-full">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48" className="m-auto mt-2">
                        <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                    </svg>
                </Link>

                <div className="w-full max-w-xs m-auto mt-[50px]">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="" />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" />

                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="conf-password">
                                Confirm Password
                            </label>
                            <input className="shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="conf-password" type="password" placeholder="" />

                        </div>
                        <div className="w-[256px]">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto w-full" type="button">
                                Sign Up
                            </button>

                        </div>
                        <p className="text-center p-4">Or sign up using</p>
                        <div className="ml-[20px] w-[256px]">
                            <GoogleLogin onSuccess={resposeMessage} onError={errMessage}></GoogleLogin>
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