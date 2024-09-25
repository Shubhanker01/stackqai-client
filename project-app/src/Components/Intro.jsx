export default function Intro() {
    return (
        <>
            <div className="grid grid-cols-2 gap-8 absolute top-[180px] left-[350px] z-0">
                <div className="w-[400px] h-[300px]  bg-gradient-to-r from-sky-900 to-blue-700 rounded-lg">
                    <p className="text-center text-4xl p-4 antialiased font-sans font-semibold text-orange-500">Hello!! Search something programming related by entering a prompt</p>
                </div>
                <div className="w-[400px] h-[300px]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                    <p className="text-center text-4xl p-4 antialiased font-sans font-semibold text-slate-200 m-auto">Finetuned and created by our own dataset. Hope you like it!!!</p>
                </div>
            </div>

        </>
    )
}