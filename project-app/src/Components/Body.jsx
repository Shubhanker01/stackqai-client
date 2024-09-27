import { Link } from "react-router-dom"
export default function Body() {

    return (
        <>

            <h1 className="text-center text-2xl font-serif font-bold mt-[50px] text-color-[#1d1e20] pt-[30px] lg:text-5xl lg:pt-[50px]">Welcome to StackQ AI</h1>
            <div className="lg:flex">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif" alt="..." className="h-[50%] lg:h-auto lg:w-[50%]"></img>
                <div className="w-full grid grid-cols-1 lg:grid-cols-1">
                    <h1 className="text-md w-full overflow-hidden animate-typing border-r-white h-[50px] mt-[50px] lg:text-2xl lg:h-[100px] lg:w-full" id="typewriter">Get started by typing your queries</h1>
                    <Link to="/signup" className="bg-indigo-800 text-md m-[0px_auto] p-2 rounded-md text-slate-200 shadow-lg w-[30%] lg:text-lg lg:h-[50px] text-center">Get Started</Link>
                </div>
            </div>
        </>
    )
}