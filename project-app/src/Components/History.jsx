import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { getHistory } from "../Async Logic/showHistory";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export default function History() {
    const [items, getItems] = useState([]);
    const cookies = new Cookies();

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getHistory(cookies.get('token'));
            getItems(data);
        };
        fetchHistory();
    }, []);

    return (
        <>
            <Sidebar />

            <div className="fixed left-[100px] right-[200px] lg:left-[250px] top-[40px] w-[80%] h-[90%] shadow rounded-xl overflow-hidden">

                {/* Header */}
                <div className="w-full bg-gray-100 py-3 px-5 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Chat History
                    </h2>
                </div>

                {/* Chat History Scroll Area */}
                <div className="h-full overflow-y-auto px-5 py-4 space-y-6 bg-gray-50">
                    {items.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-gray-500 text-md">
                            Nothing to Show in History
                        </div>
                    ) : (
                        items.map((chat) => (
                            <div key={chat._id} className="space-y-3 m-2">

                                {/* User message */}
                                <div className="flex justify-end">
                                    <div className="max-w-[70%] bg-blue-600 text-white px-4 py-2 rounded-xl rounded-br-none shadow-sm">
                                        {chat.question}
                                    </div>
                                </div>

                                {/* AI message */}
                                <div className="flex justify-start">
                                    <div className="max-w-[70%] bg-white text-gray-800 px-4 py-2 rounded-xl rounded-bl-none shadow border">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{chat.answer}</ReactMarkdown>
                                    </div>
                                </div>

                                <hr className="border-gray-300/40 mt-4" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
