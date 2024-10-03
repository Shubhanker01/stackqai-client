export default function Intro() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 absolute top-[140px] left-[130px] lg:w-[80%]">
                <div className="">
                    <p className="text-center text-md p-2 antialiased font-sans font-semibold text-orange-500 lg:text-2xl">Hello!! Search something by entering a prompt</p>
                </div>
                <div className="">
                    <p className="text-center text-md p-2 antialiased font-sans font-semibold text-orange-500 lg:text-2xl">Finetuned and created by our own dataset. Hope you like it!!!</p>
                </div>
            </div>

        </>
    )
}