import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UserProfile(props) {
    const [profile, setProfile] = useState(false)
    const navigate = useNavigate()

    const showProfile = () => {
        setProfile(true)
    }
    const logout = () => {
        navigate('/redirectlogout')
    }

    return (
        <>
            {
                profile == true ?
                    <div className="fixed w-[250px] h-[250px] top-[20px] right-[30px] bg-slate-200 z-20 rounded-lg">
                        <h1 className="text-center text-2xl">User Profile</h1>
                        <img src={props.image} className="w-[100px] h-[100px] rounded-full m-auto mt-[10px]" />
                        <h1 className="text-center">{props.name}</h1>
                        <p className="text-center">{props.email}</p>
                        <button className="font-bold p-2 bg-red-700 text-slate-100 ml-[85px] rounded-lg mt-[10px] h-[40px]" onClick={() => { logout() }}>Log out</button>
                        <button onClick={() => { setProfile(false) }} className="fixed top-[20px] right-[35px]">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACiElEQVR4nO2VW1PaQBzF8xlwjJJWBKJBYaBSFSgimoGBDZJwUQuDTj+EvrUfs3jhUqUMKioX422zT9uJFmcabgngUzkzv5fsOWf/ueyEIMYaq4ekb7vC0/62mxhQclba/8oPFH7OJA/hXhI/7yWQlInHtOalTJx7ziTga0fyh6bwQzp2+JSO4RaPaQE9pXjVQzym4txjKgb/6UgJ6oYQk1H+YYfHSu53eEnc5qN989t8VPZ26lCTJ8QE8IhxDt0nIliJmIhIYpzrWiKvyZ6O2TiHRCGi7nu640OgKYThnRDGSpp8CDWEsDCKTE/VIwHQ3ArC5lYQK2lEAqixFRQG8WobIrQB6oCFdcBiJbXwJroNs4IaDzGMbgK+aC2wLtWCftyGfL3HmpwlRqHrDR+4YdfgDevDarje9KFb1jvcnSt1veEB1XUPrPq/4D6gqt892s1buvStgivvKrxac+EuoKr3nTaXdelxggvXZ3jhXsZdQBX3yvsMUF51gsryJ1hZWcJ9QJUV52iHKDsdoLxkh2WnHasE/XbaRzNEyWGLlhw2qeSw4Q5IfdaGO4bniwx3Zl2A59YF3MaiBZ1ZLcK5lQE9PYuM5l/5i4oMwxUt8/CXZR63wcyhMwv99ogLDA16eQsMrW2IotnMFebMsDhnxm3QJlSgjW3vt0DToHdG5RD52VlP3mhAedMsVpIzGqS8ydD1vcprr572rNyZMxr7/47zMxSfM3zESk5nPkh5A9X3o5I9srdTh5r8i44p6uCEovAbej06oSjVx+p0ehoc6/VQ0fGd0KIsSR4cTU3hI5JEWZLUfKazk5MgS5Lwb4e2zVv6OTHBZ3U6FzGgjnQ6t9wxaH6s/0N/AEQ8v6FiRQROAAAAAElFTkSuQmCC" />
                        </button>
                    </div> :
                    <button onClick={showProfile}>
                        <img src={props.image} className="w-[30px] h-[30px] rounded-full" />
                    </button>
            }

        </>
    )
}