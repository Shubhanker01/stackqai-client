import { Link } from "react-router-dom"
export default function Body() {

    return (
        <>

            <h1 className="fixed top-[120px] left-[390px] text-center text-5xl font-serif font-bold mt-[10px] text-color-[#1d1e20]">Welcome to StackQ AI</h1>
            <div className="absolute grid grid-cols-2 h-[350px] w-[1200px] top-[250px] left-[150px]">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/200e8d139737079.6234b0487404d.gif" alt="..." className=""></img>
                <div className="w-full">
                    <h1 className="text-4xl overflow-hidden animate-typing border-r-white h-[45px] mt-[50px]" id="typewriter">Get started by typing your queries</h1>
                    <Link to="/signup" className="bg-indigo-800 text-xl mt-[10px] p-4 rounded-md text-slate-200 relative top-[40px] left-[150px]  shadow-lg">Get Started</Link>
                </div>
            </div>
        </>
    )
}