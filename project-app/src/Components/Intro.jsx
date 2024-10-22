export default function Intro() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 absolute top-[140px] left-[130px] lg:w-[80%]">
                <div className="">
                    <p className="text-center text-md p-2 antialiased font-sans font-semibold text-slate-500 lg:text-3xl lg:text-bold">Hello!! Search something by entering a prompt</p>
                </div>
                <div className="">
                    <p className="text-center text-md p-2 antialiased font-sans font-semibold text-slate-500 lg:text-2xl lg:text-bold">Finetuned and created by our own dataset. Hope you like it!!!</p>
                </div>
            </div>

        </>
    )
}