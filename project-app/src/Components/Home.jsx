import { Link } from "react-router-dom"
import Body from "./Body"
export default function Home() {
  return (
    <>

      <div className="fixed top-[0px] w-full h-16 grid grid-cols-2 bg-stone-700">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" className="mt-2 ml-2">
            <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
          </svg>

          <Link to="/"><h1 className="text-xl font-sans font-sm text-[#F48024] m-2 pl-3">StackQ AI</h1></Link>
        </div>

        <div className="justify-self-end">
          <Link to="/login" className="bg-green-600 text-md m-2 p-2 relative top-3 rounded-md">Log In</Link>
          <Link to="/signup" className="bg-orange-200 text-md m-2 p-2 relative top-3 rounded-md">Sign Up</Link>
        </div>

      </div>
      <Body></Body>
    </>
  )
}
