import React from 'react'
import UserProfile from './UserProfile'
import Logout from './Logout'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'

function Header() {
    const cookies = new Cookies()
    const decoded = jwtDecode(cookies.get('token'))
    return (
        <>
            <div className="grid grid-cols-2 fixed left-[200px] w-[80%] top-[5px]">

                <div className="flex">
                    <h1 className="font-bold text-md text-[#222426] ml-[80px]  mt-[20px] lg:text-2xl lg:ml-[165px]">StackQ AI</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" className="mt-[20px] ml-2">
                        <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                    </svg>
                </div>
                <div className="flex justify-self-end mt-[18px] mr-[20px]">
                    <div className="mr-[20px]">
                        <UserProfile name={decoded.name} email={decoded.email} />
                    </div>
                    <Logout />
                </div>

            </div>
        </>
    )
}

export default Header