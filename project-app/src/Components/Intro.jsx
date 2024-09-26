export default function Intro() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 absolute top-[140px] left-[130px] z-0">
                <div className="h-[100px]">
                    <p className="text-center text-md p-2 antialiased font-sans font-semibold text-orange-500">Hello!! Search something by entering a prompt</p>
                </div>
                <div className="h-[100px]">
                    <p className="text-center text-xl p-2 antialiased font-sans font-semibold text-slate-200">Finetuned and created by our own dataset. Hope you like it!!!</p>
                </div>
            </div>

        </>
    )
}