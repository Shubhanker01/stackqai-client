export default function Searchbar({ search, setSearch }) {
    return (
        <>
            <div className="fixed top-[20px] left-[80px] flex px-2 py-2 rounded-md border-2 border-blue-500 overflow-hidden w-[70%] font-[sans-serif] m-[10px_auto]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
                    className="fill-gray-600 mr-3 rotate-90">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input type="email" placeholder="Search Something..." className="w-full outline-none bg-transparent text-gray-600 text-sm" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
        </>
    )
}